const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = "C:\\PROGRA~2\\MICROS~1\\Edge\\APPLIC~1\\msedge.exe";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Desktop Home
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_desktop_home.png') });
  console.log("Saved shot_desktop_home.png");

  // 2. Open horizontal modal on desktop
  await page.evaluate(() => {
    document.querySelector('#horizontal-track > div:first-child').click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_desktop_hz_modal.png') });
  console.log("Saved shot_desktop_hz_modal.png");

  // 3. Close modal
  await page.evaluate(() => {
    document.getElementById('modal-hz-close-btn').click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 4. Open vertical modal on desktop
  await page.evaluate(() => {
    document.querySelector('#marquee-track > div:first-child').click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_desktop_vertical_modal.png') });
  console.log("Saved shot_desktop_vertical_modal.png");

  await browser.close();
  console.log("Desktop tests complete!");
}

run().catch(err => {
  console.error("Desktop test error:", err);
  process.exit(1);
});
