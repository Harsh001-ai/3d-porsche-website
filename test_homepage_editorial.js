import puppeteer from 'puppeteer-core';

async function testCompleteHomepage() {
  console.log('=== STARTING AUTOMOTIVE EDITORIAL HOMEPAGE TEST ===');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => consoleErrors.push(err.toString()));

  console.log('Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Verify protected hero is working
  const heroIntact = await page.evaluate(() => {
    const hero = document.querySelector('#hero');
    const canvas = hero?.querySelector('canvas');
    return !!hero && !!canvas && canvas.width > 0;
  });
  console.log('1. Protected Hero Intact & Canvas Active:', heroIntact);

  // 2. Test Section 01: Transition Bridge & Section 02: Showcase
  await page.evaluate(() => {
    const showcase = document.querySelector('#showcase');
    if (showcase) showcase.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\test_02_showcase.png' });
  console.log('2. Section 02 Showcase captured: test_02_showcase.png');

  // Test interactive hotspot in showcase
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('#showcase button');
    if (buttons.length > 0) buttons[1]?.click(); // click wheel louvres
  });
  await new Promise(r => setTimeout(r, 300));

  // 3. Test Section 03: Engineering Narrative
  await page.evaluate(() => {
    const eng = document.querySelector('#engineering');
    if (eng) eng.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\test_03_engineering.png' });
  console.log('3. Section 03 Engineering captured: test_03_engineering.png');

  // Click Chapter 2 in Engineering
  await page.evaluate(() => {
    const chapterButtons = document.querySelectorAll('#engineering button');
    if (chapterButtons.length > 1) chapterButtons[1]?.click();
  });
  await new Promise(r => setTimeout(r, 300));

  // 4. Test Section 04: Craftsmanship Gallery
  await page.evaluate(() => {
    const gal = document.querySelector('#gallery');
    if (gal) gal.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\test_04_gallery.png' });
  console.log('4. Section 04 Gallery captured: test_04_gallery.png');

  // 5. Test Section 05: Interactive 360° Orbital Viewer
  await page.evaluate(() => {
    const orbit = document.querySelector('#interactive-3d');
    if (orbit) orbit.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));

  // Test drag rotation on turntable
  const orbitBox = await page.evaluate(() => {
    const c = document.querySelector('#interactive-3d canvas');
    if (!c) return null;
    const r = c.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });

  if (orbitBox) {
    await page.mouse.move(orbitBox.x, orbitBox.y);
    await page.mouse.down();
    await page.mouse.move(orbitBox.x + 300, orbitBox.y, { steps: 10 });
    await page.mouse.up();
  }
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'd:\\Cars\\test_05_interactive_3d.png' });
  console.log('5. Section 05 Interactive 3D Turntable captured: test_05_interactive_3d.png');

  // 6. Test Section 06: Design Philosophy
  await page.evaluate(() => {
    const philo = document.querySelector('#philosophy');
    if (philo) philo.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\test_06_philosophy.png' });
  console.log('6. Section 06 Philosophy captured: test_06_philosophy.png');

  // 7. Test Section 07: Cockpit Experience
  await page.evaluate(() => {
    const cockpit = document.querySelector('#cockpit');
    if (cockpit) cockpit.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\test_07_cockpit.png' });
  console.log('7. Section 07 Cockpit captured: test_07_cockpit.png');

  // Click PASM rotary dial in Cockpit
  await page.evaluate(() => {
    const dials = document.querySelectorAll('#cockpit button');
    if (dials.length > 1) dials[1]?.click();
  });
  await new Promise(r => setTimeout(r, 300));

  // 8. Test Section 08: Track Telemetry
  await page.evaluate(() => {
    const tel = document.querySelector('#telemetry');
    if (tel) tel.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\test_08_telemetry.png' });
  console.log('8. Section 08 Telemetry captured: test_08_telemetry.png');

  // 9. Test Section 09: Cinematic Moment & Section 10: Final CTA
  await page.evaluate(() => {
    const cta = document.querySelector('#cta');
    if (cta) cta.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\test_10_final_cta.png' });
  console.log('9. Section 10 Final CTA captured: test_10_final_cta.png');

  // Check desktop horizontal overflow
  const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log('Desktop Overflow Check:', desktopOverflow ? 'FAIL' : 'PASS (0px overflow)');

  // 10. Test Mobile Responsive Viewport (390x844 iPhone)
  console.log('\n--- TESTING MOBILE RESPONSIVE VIEWPORT ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 600));

  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log('Mobile Overflow Check:', mobileOverflow ? 'FAIL' : 'PASS (0px overflow)');
  await page.screenshot({ path: 'd:\\Cars\\test_mobile_overview.png' });

  // Mobile scroll to interactive 3D
  await page.evaluate(() => {
    const orbit = document.querySelector('#interactive-3d');
    if (orbit) orbit.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\test_mobile_interactive_3d.png' });
  console.log('Mobile Interactive 3D captured: test_mobile_interactive_3d.png');

  console.log('\n--- CONSOLE ERRORS AUDIT ---');
  if (consoleErrors.length === 0) {
    console.log('✓ PERFECT: ZERO console errors across entire homepage!');
  } else {
    console.warn('Console errors detected:', consoleErrors);
  }

  await browser.close();
  console.log('=== HOMEPAGE TESTING COMPLETED SUCCESSFULLY ===');
}

testCompleteHomepage().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
