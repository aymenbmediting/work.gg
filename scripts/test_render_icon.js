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

  const result = await page.evaluate(() => {
    function renderIcon(container, iconName, classes = "") {
      if (!container) return;
      container.innerHTML = `<i data-lucide="${iconName}" class="${classes}"></i>`;
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    }

    const testBtn = document.getElementById('modal-hz-play-pause-btn');
    const iconContainer = document.createElement('span');
    iconContainer.id = 'test-icon-container';
    testBtn.prepend(iconContainer);

    renderIcon(iconContainer, 'pause', 'w-4 h-4 fill-current');
    const pauseSvg = iconContainer.querySelector('.lucide-pause');

    renderIcon(iconContainer, 'play', 'w-4 h-4 fill-current');
    const playSvg = iconContainer.querySelector('.lucide-play');

    return {
      hasPauseSvg: !!pauseSvg,
      hasPlaySvg: !!playSvg,
      finalHtml: iconContainer.innerHTML
    };
  });

  console.log('Icon switching test:', JSON.stringify(result, null, 2));
  await browser.close();
})();
