import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from '@playwright/test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const source = resolve(root, 'og-source.html');
const output = resolve(root, 'public', 'og-image.jpg');

const WIDTH = 1200;
const HEIGHT = 640;

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
await page.goto(`file://${source}`, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({
  path: output,
  type: 'jpeg',
  quality: 92,
  clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
});
await browser.close();

console.log(`wrote ${output.replace(root + '/', '')} (${WIDTH}x${HEIGHT})`);
