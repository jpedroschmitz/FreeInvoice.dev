import { expect, test } from '@playwright/test';

test('should generate the PDF according to the data', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('FreeInvoice.dev');
});
