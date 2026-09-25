const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9222;
const USER_DATA = path.join(__dirname, '..', '.edge_profile');

function fetchJson(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${PORT}${urlPath}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(1000, () => req.destroy(new Error('timeout')));
  });
}

async function getWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const data = await fetchJson('/json/version');
      if (data && data.webSocketDebuggerUrl) {
        return data.webSocketDebuggerUrl;
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 250));
    }
  }
  throw new Error("Could not connect to Edge DevTools");
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async close() {
    this.ws.close();
  }
}

async function capture() {
  if (fs.existsSync(USER_DATA)) {
    try { fs.rmSync(USER_DATA, { recursive: true, force: true }); } catch(e) {}
  }

  const browserProc = spawn(EDGE_PATH, [
    `--remote-debugging-port=${PORT}`,
    `--remote-debugging-address=127.0.0.1`,
    `--user-data-dir=${USER_DATA}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  browserProc.stderr.on('data', d => console.error("Edge err:", d.toString()));

  try {
    const browserWs = await getWsUrl();
    const browserClient = new CDPClient(browserWs);
    await browserClient.connect();

    // Create target page
    const { targetId } = await browserClient.send('Target.createTarget', { url: 'http://localhost:3000' });
    const targets = await fetchJson('/json/list');
    const pageTarget = targets.find(t => t.id === targetId);
    
    const pageClient = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await pageClient.connect();

    await pageClient.send('Page.enable');
    await pageClient.send('DOM.enable');
    await pageClient.send('Runtime.enable');

    // Emulate iPhone 14 Pro mobile viewport (393x852)
    await pageClient.send('Emulation.setDeviceMetricsOverride', {
      width: 393,
      height: 852,
      deviceScaleFactor: 2,
      mobile: true,
      screenWidth: 393,
      screenHeight: 852
    });
    await pageClient.send('Emulation.setTouchEmulationEnabled', {
      enabled: true,
      maxTouchPoints: 5
    });

    console.log("Waiting for page load...");
    await new Promise(r => setTimeout(r, 2000));

    // Capture home screen
    const homeShot = await pageClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, '..', 'shot_mobile_home.png'), Buffer.from(homeShot.data, 'base64'));
    console.log("Captured shot_mobile_home.png");

    // Scroll to horizontal portfolio
    await pageClient.send('Runtime.evaluate', {
      expression: `document.getElementById('horizontal-portfolio').scrollIntoView();`
    });
    await new Promise(r => setTimeout(r, 1000));
    const hzShot = await pageClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, '..', 'shot_mobile_horizontal_section.png'), Buffer.from(hzShot.data, 'base64'));
    console.log("Captured shot_mobile_horizontal_section.png");

    // Click on the first horizontal video card to open modal
    await pageClient.send('Runtime.evaluate', {
      expression: `document.querySelector('#horizontal-track > div:first-child').click();`
    });
    await new Promise(r => setTimeout(r, 1200));
    const modalHzShot = await pageClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, '..', 'shot_mobile_horizontal_modal.png'), Buffer.from(modalHzShot.data, 'base64'));
    console.log("Captured shot_mobile_horizontal_modal.png");

    // Close modal
    await pageClient.send('Runtime.evaluate', {
      expression: `document.getElementById('modal-close').click();`
    });
    await new Promise(r => setTimeout(r, 600));

    // Click on vertical reel to see vertical modal
    await pageClient.send('Runtime.evaluate', {
      expression: `document.querySelector('#marquee-track > div:first-child').click();`
    });
    await new Promise(r => setTimeout(r, 1200));
    const modalVertShot = await pageClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, '..', 'shot_mobile_vertical_modal.png'), Buffer.from(modalVertShot.data, 'base64'));
    console.log("Captured shot_mobile_vertical_modal.png");

    await pageClient.close();
    await browserClient.close();
  } catch (err) {
    console.error("Capture error:", err);
  } finally {
    browserProc.kill();
  }
}

capture();
