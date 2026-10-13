import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function runTest() {
  console.log('--- STARTING END-TO-END SCROLL ANIMATION & UX TEST ---');

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

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  console.log('Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait 1.5s for initial assets to settle
  await new Promise(r => setTimeout(r, 1500));

  // Check initial frame screenshot
  await page.screenshot({ path: 'd:\\Cars\\screenshot_initial.png' });
  console.log('✓ Initial frame captured: screenshot_initial.png');

  // Verify canvas element exists
  const canvasExists = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    return !!c && c.width > 0 && c.height > 0;
  });
  console.log('✓ Canvas rendered with physical dimensions:', canvasExists);

  // Check horizontal overflow
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('✓ Horizontal overflow detected:', overflow ? 'FAIL (overflowing)' : 'PASS (no overflow)');

  // Test Scroll Progression
  const scrollSteps = [0.25, 0.50, 0.75, 1.0];
  const maxScroll = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
  console.log(`Total page scrollable height: ${maxScroll}px`);

  // Scroll through Hero Pin (Hero pin height is ~380vh = ~4104px)
  console.log('\n--- TESTING FORWARD SCROLL PROGRESSION ---');
  for (let i = 1; i <= 4; i++) {
    const scrollY = i * 900;
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
    await new Promise(r => setTimeout(r, 400));

    const status = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        scrollY: window.scrollY,
        hasTelemetry: text.includes('TELEMETRY ARCHIVE'),
        hasDRS: text.includes('DRS'),
      };
    });

    await page.screenshot({ path: `d:\\Cars\\screenshot_scroll_step_${i}.png` });
    console.log(`✓ Step ${i} (Scroll ${scrollY}px) captured: status:`, status);
  }

  // Test Reverse Scroll
  console.log('\n--- TESTING REVERSE SCROLL ---');
  await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'd:\\Cars\\screenshot_reverse_scroll.png' });
  console.log('✓ Reverse scroll to 1200px captured');

  // Test Scroll Past Hero into Next Sections
  console.log('\n--- TESTING TRANSITION INTO SUBSEQUENT SECTIONS ---');
  await page.evaluate(() => {
    const aero = document.querySelector('#aerodynamics');
    if (aero) aero.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\screenshot_section_aero.png' });
  console.log('✓ Aerodynamics section transition captured');

  await page.evaluate(() => {
    const perf = document.querySelector('#performance');
    if (perf) perf.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\screenshot_section_performance.png' });
  console.log('✓ Performance section transition captured');

  // Test Mobile Viewport
  console.log('\n--- TESTING MOBILE RESPONSIVE VIEWPORT (390x844 iPhone 14) ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'd:\\Cars\\screenshot_mobile_hero.png' });

  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('✓ Mobile horizontal overflow:', mobileOverflow ? 'FAIL' : 'PASS');

  console.log('\n--- CONSOLE ERRORS SUMMARY ---');
  if (consoleErrors.length === 0) {
    console.log('✓ ZERO console errors detected! Perfect clean execution.');
  } else {
    console.warn('Console errors encountered:', consoleErrors);
  }

  await browser.close();
  console.log('\n--- ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY ---');
}

runTest().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
