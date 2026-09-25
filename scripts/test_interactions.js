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

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Scroll to horizontal section and open first horizontal video
  await page.evaluate(() => {
    document.querySelector('#horizontal-track > div:first-child').click();
  });
  await new Promise(r => setTimeout(r, 1200));

  // 2. Pause video by clicking on the video container
  await page.evaluate(() => {
    const playPauseBtn = document.getElementById('modal-hz-play-pause-btn');
    if (playPauseBtn) playPauseBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_hz_paused.png') });
  console.log("Saved shot_hz_paused.png");

  // 3. Click Like button
  await page.evaluate(() => {
    const likeBtn = document.getElementById('modal-hz-like-btn');
    if (likeBtn) likeBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_hz_liked.png') });
  console.log("Saved shot_hz_liked.png");

  // 4. Click Quality Toggle (SD -> HD)
  await page.evaluate(() => {
    const qBtn = document.getElementById('modal-hz-quality-btn');
    if (qBtn) qBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_hz_quality_hd.png') });
  console.log("Saved shot_hz_quality_hd.png");

  // 5. Open Reviews Drawer from Horizontal Modal
  await page.evaluate(() => {
    const commentBtn = document.getElementById('modal-hz-comment-btn');
    if (commentBtn) commentBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_hz_reviews_drawer.png') });
  console.log("Saved shot_hz_reviews_drawer.png");

  await browser.close();
  console.log("Interactive tests complete!");
}

run().catch(err => {
  console.error("Test error:", err);
  process.exit(1);
});
