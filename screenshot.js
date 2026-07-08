const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 414, height: 896 }
  });

  if (!fs.existsSync('assets/screenshots')) {
    fs.mkdirSync('assets/screenshots', { recursive: true });
  }

  console.log('Navigating to Home...');
  await page.goto('http://localhost:8081/');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'assets/screenshots/home.png' });

  console.log('Navigating to Quran...');
  await page.goto('http://localhost:8081/quran');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'assets/screenshots/quran.png' });

  console.log('Navigating to Doa...');
  await page.goto('http://localhost:8081/doa');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'assets/screenshots/doa.png' });

  console.log('Navigating to Hadits...');
  await page.goto('http://localhost:8081/hadits');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'assets/screenshots/hadits.png' });

  console.log('Navigating to Haid...');
  await page.goto('http://localhost:8081/haid');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'assets/screenshots/haid.png' });
  
  console.log('Navigating to Settings...');
  await page.goto('http://localhost:8081/settings');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'assets/screenshots/settings.png' });

  await browser.close();
  console.log('Screenshots saved!');
})();
