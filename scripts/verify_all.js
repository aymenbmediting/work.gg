const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = "C:\\PROGRA~2\\MICROS~1\\Edge\\APPLIC~1\\msedge.exe";

async function verifyAll() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  // 1. Mobile Standard Viewport (iPhone 14/15/16: 393 x 852, DPR 2)
  await page.setViewport({
    width: 393,
    height: 852,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  // Screenshot 1: Hero
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_1_mobile_hero.png') });
  console.log("Saved shot_1_mobile_hero.png");

  // Screenshot 2: Carousel
  await page.evaluate(() => document.getElementById('social-carousel').scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_2_mobile_carousel.png') });
  console.log("Saved shot_2_mobile_carousel.png");

  // Screenshot 3: Horizontal section
  await page.evaluate(() => document.getElementById('horizontal-portfolio').scrollIntoView());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_3_mobile_horizontal_section.png') });
  console.log("Saved shot_3_mobile_horizontal_section.png");

  // Open first horizontal video
  await page.evaluate(() => {
    document.querySelector('#horizontal-track > div:first-child').click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Check playing state
  const playingAudit = await page.evaluate(() => {
    const v = document.getElementById('modal-horizontal-video');
    const playBtn = document.getElementById('modal-hz-play-pause-btn');
    const text = document.getElementById('modal-hz-transport-text');
    const iconBox = document.getElementById('modal-hz-transport-icon-box');
    const centerPlay = document.getElementById('modal-hz-center-play');
    return {
      paused: v.paused,
      currentTime: v.currentTime,
      duration: v.duration,
      transportText: text ? text.textContent : null,
      hasPauseSvg: iconBox ? !!iconBox.querySelector('.lucide-pause') : false,
      hasPlaySvg: iconBox ? !!iconBox.querySelector('.lucide-play') : false,
      centerPlayOpacity0: centerPlay ? centerPlay.classList.contains('opacity-0') : false
    };
  });
  console.log("Playing state audit:", playingAudit);

  // Screenshot 4: Horizontal Modal Playing
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_4_mobile_hz_modal.png') });
  console.log("Saved shot_4_mobile_hz_modal.png");

  // Click Pause
  await page.evaluate(() => {
    document.getElementById('modal-hz-play-pause-btn').click();
  });
  await new Promise(r => setTimeout(r, 500));

  const pausedAudit = await page.evaluate(() => {
    const v = document.getElementById('modal-horizontal-video');
    const text = document.getElementById('modal-hz-transport-text');
    const iconBox = document.getElementById('modal-hz-transport-icon-box');
    const centerPlay = document.getElementById('modal-hz-center-play');
    return {
      paused: v.paused,
      transportText: text ? text.textContent : null,
      hasPauseSvg: iconBox ? !!iconBox.querySelector('.lucide-pause') : false,
      hasPlaySvg: iconBox ? !!iconBox.querySelector('.lucide-play') : false,
      centerPlayVisible: centerPlay ? !centerPlay.classList.contains('opacity-0') : false
    };
  });
  console.log("Paused state audit:", pausedAudit);

  // Screenshot 5: Horizontal Modal Paused
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_hz_paused.png') });
  console.log("Saved shot_hz_paused.png");

  // Click Like
  await page.evaluate(() => {
    document.getElementById('modal-hz-like-btn').click();
  });
  await new Promise(r => setTimeout(r, 400));

  const likeAudit = await page.evaluate(() => {
    const iconBox = document.getElementById('modal-hz-like-icon-box');
    const count = document.getElementById('modal-hz-like-count');
    const text = document.getElementById('modal-hz-like-text');
    return {
      text: text ? text.textContent : null,
      count: count ? count.textContent : null,
      hasRedFill: iconBox ? !!iconBox.querySelector('.fill-red-500') : false
    };
  });
  console.log("Like audit:", likeAudit);

  // Screenshot 6: Horizontal Modal Liked
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_hz_liked.png') });
  console.log("Saved shot_hz_liked.png");

  // Click Quality Toggle (SD -> HD)
  await page.evaluate(() => {
    document.getElementById('modal-hz-quality-btn').click();
  });
  await new Promise(r => setTimeout(r, 400));

  const qualityAudit = await page.evaluate(() => {
    const badge = document.getElementById('modal-hz-quality-badge');
    const dot = document.getElementById('modal-hz-quality-dot');
    return {
      badgeText: badge ? badge.textContent : null,
      hasCyanDot: dot ? dot.classList.contains('bg-cyan-400') : false
    };
  });
  console.log("Quality audit:", qualityAudit);

  // Screenshot 7: Horizontal Modal HD
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_hz_quality_hd.png') });
  console.log("Saved shot_hz_quality_hd.png");

  // Click Mute Toggle
  await page.evaluate(() => {
    document.getElementById('modal-hz-mute-btn').click();
  });
  await new Promise(r => setTimeout(r, 400));

  const muteAudit = await page.evaluate(() => {
    const v = document.getElementById('modal-horizontal-video');
    const iconBox = document.getElementById('modal-hz-mute-icon-box');
    return {
      muted: v.muted,
      hasVolumeXSvg: iconBox ? !!iconBox.querySelector('.lucide-volume-x') : false,
      hasVolume2Svg: iconBox ? !!iconBox.querySelector('.lucide-volume-2') : false
    };
  });
  console.log("Mute audit:", muteAudit);

  // Open Reviews Drawer
  await page.evaluate(() => {
    document.getElementById('modal-hz-comment-btn').click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Screenshot 8: Reviews Drawer
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_hz_reviews_drawer.png') });
  console.log("Saved shot_hz_reviews_drawer.png");

  // Close Reviews Drawer
  await page.evaluate(() => {
    document.getElementById('close-comments').click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Close Horizontal Modal
  await page.evaluate(() => {
    document.getElementById('modal-hz-close-btn').click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Open Vertical Modal (Reel)
  await page.evaluate(() => {
    document.querySelector('#marquee-track > div:first-child').click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot 9: Vertical Modal
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_5_mobile_vertical_modal.png') });
  console.log("Saved shot_5_mobile_vertical_modal.png");

  // Open comments in vertical modal
  await page.evaluate(() => {
    document.getElementById('modal-comment-btn').click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Screenshot 10: Vertical Modal Comments
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_6_mobile_comments_drawer.png') });
  console.log("Saved shot_6_mobile_comments_drawer.png");

  // Close modal
  await page.evaluate(() => {
    document.getElementById('modal-close').click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Scroll to Footer
  await page.evaluate(() => document.getElementById('contact').scrollIntoView());
  await new Promise(r => setTimeout(r, 500));

  // Screenshot 11: Footer
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_footer.png') });
  console.log("Saved shot_footer.png");

  // 2. Test iPhone SE (375 x 667)
  await page.setViewport({
    width: 375,
    height: 667,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2
  });
  await page.evaluate(() => {
    document.querySelector('#horizontal-track > div:first-child').click();
  });
  await new Promise(r => setTimeout(r, 800));

  const seAudit = await page.evaluate(() => {
    const modalView = document.getElementById('modal-horizontal-view');
    const orderBtn = document.getElementById('modal-hz-order-btn');
    const likeBtn = document.getElementById('modal-hz-like-btn');
    const commentBtn = document.getElementById('modal-hz-comment-btn');
    const playPauseBtn = document.getElementById('modal-hz-play-pause-btn');
    const playerBox = document.getElementById('modal-hz-player-box');

    const toObj = r => ({ x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) });

    return {
      windowHeight: window.innerHeight,
      playerBox: toObj(playerBox.getBoundingClientRect()),
      playPauseBtn: toObj(playPauseBtn.getBoundingClientRect()),
      likeBtn: toObj(likeBtn.getBoundingClientRect()),
      orderBtn: toObj(orderBtn.getBoundingClientRect()),
      isOverflowing: modalView.scrollHeight > window.innerHeight
    };
  });
  console.log("iPhone SE (375x667) Audit:", seAudit);

  await page.screenshot({ path: path.join(__dirname, '..', 'shot_se_hz_modal.png') });
  console.log("Saved shot_se_hz_modal.png");

  await page.evaluate(() => document.getElementById('modal-hz-close-btn').click());
  await new Promise(r => setTimeout(r, 500));

  // 3. Desktop Viewport (1920 x 1080)
  await page.setViewport({
    width: 1920,
    height: 1080,
    isMobile: false,
    hasTouch: false,
    deviceScaleFactor: 1
  });
  await page.evaluate(() => {
    document.querySelector('#horizontal-track > div:first-child').click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, '..', 'shot_desktop_hz_modal.png') });
  console.log("Saved shot_desktop_hz_modal.png");

  await browser.close();
  console.log("All verifications and screenshots successfully completed!");
}

verifyAll().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
