const puppeteer = require('puppeteer-core');
const EDGE_PATH = "C:\\PROGRA~2\\MICROS~1\\Edge\\APPLIC~1\\msedge.exe";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  const result = await page.evaluate(() => {
    const btn = document.getElementById('modal-hz-mute-btn');
    btn.innerHTML = '<i data-lucide="volume-x" class="w-4 h-4"></i>';
    if (window.lucide) window.lucide.createIcons();
    const isSvg = btn.querySelector('svg') !== null;
    const hasVolumeXClass = btn.querySelector('.lucide-volume-x') !== null;
    return { isSvg, hasVolumeXClass, outerHTML: btn.innerHTML };
  });

  console.log('Result:', JSON.stringify(result, null, 2));
  await browser.close();
})();
