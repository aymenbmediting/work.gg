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
  await page.setViewport({
    width: 393,
    height: 852,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Home / Hero
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_1_mobile_hero.png') });
  console.log("Saved shot_1_mobile_hero.png");

  // 2. Carousel section
  await page.evaluate(() => document.getElementById('social-carousel').scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_2_mobile_carousel.png') });
  console.log("Saved shot_2_mobile_carousel.png");

  // 3. Horizontal portfolio section
  await page.evaluate(() => document.getElementById('horizontal-portfolio').scrollIntoView());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_3_mobile_horizontal_section.png') });
  console.log("Saved shot_3_mobile_horizontal_section.png");

  // 4. Click horizontal card to open modal
  await page.evaluate(() => {
    const card = document.querySelector('#horizontal-track > div');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_4_mobile_hz_modal.png') });
  console.log("Saved shot_4_mobile_hz_modal.png");

  // 5. Close modal
  await page.evaluate(() => {
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // 6. Click vertical card to open vertical modal
  await page.evaluate(() => {
    const card = document.querySelector('#marquee-track > div');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_5_mobile_vertical_modal.png') });
  console.log("Saved shot_5_mobile_vertical_modal.png");

  // 7. Open comments drawer
  await page.evaluate(() => {
    const commentBtn = document.getElementById('modal-comment-btn');
    if (commentBtn) commentBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_6_mobile_comments_drawer.png') });
  console.log("Saved shot_6_mobile_comments_drawer.png");

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch(err => {
  console.error("Puppeteer error:", err);
  process.exit(1);
});
