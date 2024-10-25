import { expect, test } from '@playwright/test';

// Test data
const validInvoiceData = {
  companyName: 'Acme Corp',
  companyAddress: '123 Business St, City, 12345',
  clientName: 'John Doe',
  clientAddress: '456 Client Ave, Town, 67890',
  service: 'Web Development',
  quantity: '1',
  amount: '1500.00',
  dueDate: '2024-12-31',
  notes: 'Payment due within 30 days',
};

test.describe('Invoice Generation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should generate a PDF with valid data', async ({ page }) => {
    // Try to submit without filling required fields
    await page.getByRole('button', { name: 'Download PDF' }).click();

    // Check for validation error messages
    await expect(page.getByText('Company name is required')).toBeVisible();
    await expect(page.getByText('Company address is required')).toBeVisible();
    await expect(page.getByText('Client name is required')).toBeVisible();
    await expect(page.getByText('Client address is required')).toBeVisible();
    await expect(page.getByText('Due date is required')).toBeVisible();

    // Fill company details
    await page.getByLabel('Company Name').fill(validInvoiceData.companyName);
    await page.getByLabel('Company Address').fill(validInvoiceData.companyAddress);

    // Fill client information
    await page.getByLabel('Client Name').fill(validInvoiceData.clientName);
    await page.getByLabel('Client Address').fill(validInvoiceData.clientAddress);

    // Select currency
    await page.getByLabel('Currency').selectOption('USD');

    // Add first service item
    await page.getByLabel('Item Description').first().fill('Service 1');
    await page.getByLabel('Quantity').first().fill('1');
    await page.getByLabel('Amount').first().fill('1000.00');

    // Add new item
    await page.getByRole('button', { name: 'Add new item' }).click();

    // Fill second service item
    await page.getByLabel('Item Description').nth(1).fill('Service 2');
    await page.getByLabel('Quantity').nth(1).fill('2');
    await page.getByLabel('Amount').nth(1).fill('500.00');

    // Fill additional details
    await page.getByLabel('VAT ID').fill('EU123456789');
    await page.getByLabel('Due Date').fill(validInvoiceData.dueDate);
    await page.getByLabel('Notes').fill(validInvoiceData.notes);

    // Setup download listener
    const downloadPromise = page.waitForEvent('download');

    // Click generate button
    await page.getByRole('button', { name: 'Download PDF' }).click();

    // Wait for download
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^invoice-INV-.*\.pdf$/);
  });

  test('should handle different currencies', async ({ page }) => {
    // Fill minimum required fields
    await page.getByLabel('Company Name').fill(validInvoiceData.companyName);
    await page.getByLabel('Company Address').fill(validInvoiceData.companyAddress);
    await page.getByLabel('Client Name').fill(validInvoiceData.clientName);
    await page.getByLabel('Client Address').fill(validInvoiceData.clientAddress);
    await page.getByLabel('Due Date').fill(validInvoiceData.dueDate);

    // Test different currencies
    const currencies = ['EUR', 'GBP', 'JPY'];
    for (const currency of currencies) {
      await page.getByLabel('Currency').selectOption(currency);
      await page.getByLabel('Amount').first().fill('1000.00');

      // Verify currency input field updates
      const amountField = page.getByLabel('Amount').first();
      await expect(amountField).toBeVisible();
    }
  });

  test('should allow removing invoice items except the first one', async ({ page }) => {
    // Add multiple items
    await page.getByRole('button', { name: 'Add new item' }).click();
    await page.getByRole('button', { name: 'Add new item' }).click();

    // Verify we have 3 items
    await expect(page.getByLabel('Item Description')).toHaveCount(3);

    // Try to remove first item (should be disabled)
    const firstRemoveButton = page.getByRole('button', { name: 'Remove item' }).first();
    await expect(firstRemoveButton).toBeDisabled();

    // Remove second item
    await page.getByRole('button', { name: 'Remove item' }).nth(1).click();

    // Verify we now have 2 items
    await expect(page.getByLabel('Item Description')).toHaveCount(2);
  });
});
