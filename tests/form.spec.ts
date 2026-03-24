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
  test.beforeAll(async ({ browser }) => {
    // Create a new context with storage state
    const context = await browser.newContext({
      storageState: {
        cookies: [],
        origins: [],
      },
    });

    // Close the context when done
    await context.close();
  });

  test.beforeEach(async ({ page }) => {
    // Navigate to the page after localStorage is set
    await page.goto('/app');
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

test.describe('Save/Load/Clear Form Data', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
  });

  test('should save form data to localStorage', async ({ page }) => {
    // Fill some fields
    await page.getByLabel('Company Name').fill('Test Corp');
    await page.getByLabel('Company Address').fill('123 Test Street');

    // Click Save
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    // Verify localStorage was set
    const saved = await page.evaluate(() => localStorage.getItem('@freeinvoice-form-data'));
    expect(saved).not.toBeNull();
    const parsed = JSON.parse(saved!);
    expect(parsed.company_name).toBe('Test Corp');
    expect(parsed.company_address).toBe('123 Test Street');
  });

  test('should show Load and Clear buttons after saving', async ({ page }) => {
    // Initially, Load and Clear buttons should not be visible
    await expect(page.getByRole('button', { name: 'Load Saved Data' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear Saved Data' })).not.toBeVisible();

    // Fill and save
    await page.getByLabel('Company Name').fill('Test Corp');
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    // Now Load and Clear should be visible
    await expect(page.getByRole('button', { name: 'Load Saved Data' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear Saved Data' })).toBeVisible();
  });

  test('should show Load and Clear buttons when saved data exists on page load', async ({ page }) => {
    // Pre-set localStorage
    await page.evaluate(() => {
      localStorage.setItem(
        '@freeinvoice-form-data',
        JSON.stringify({
          company_name: 'Saved Corp',
          company_address: '456 Saved Ave',
          bill_to: '',
          bill_to_address: '',
          currency: 'USD',
          due_date: '',
          services: [{ description: '', quantity: '1', amount: '' }],
        })
      );
    });

    // Reload to trigger useEffect
    await page.reload();

    // Load and Clear buttons should be visible
    await expect(page.getByRole('button', { name: 'Load Saved Data' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear Saved Data' })).toBeVisible();

    // Form should NOT be auto-populated (explicit load required)
    await expect(page.getByLabel('Company Name')).toHaveValue('');
  });

  test('should load saved data into the form when Load is clicked', async ({ page }) => {
    // Pre-set localStorage with data
    await page.evaluate(() => {
      localStorage.setItem(
        '@freeinvoice-form-data',
        JSON.stringify({
          company_name: 'Loaded Corp',
          company_address: '789 Loaded Blvd',
          bill_to: 'Client X',
          bill_to_address: '321 Client Rd',
          currency: 'EUR',
          due_date: '2026-06-15',
          vat_id: 'EU999888777',
          services: [{ description: 'Consulting', quantity: '5', amount: '200.00' }],
          notes: 'Net 15 days',
        })
      );
    });

    await page.reload();

    // Click Load
    await page.getByRole('button', { name: 'Load Saved Data' }).click();

    // Verify form fields are populated
    await expect(page.getByLabel('Company Name')).toHaveValue('Loaded Corp');
    await expect(page.getByLabel('Company Address')).toHaveValue('789 Loaded Blvd');
    await expect(page.getByLabel('Client Name')).toHaveValue('Client X');
    await expect(page.getByLabel('Client Address')).toHaveValue('321 Client Rd');
    await expect(page.getByLabel('Currency')).toHaveValue('EUR');
    await expect(page.getByLabel('Due Date')).toHaveValue('2026-06-15');
    await expect(page.getByLabel('VAT ID')).toHaveValue('EU999888777');
    await expect(page.getByLabel('Item Description').first()).toHaveValue('Consulting');
    await expect(page.getByLabel('Quantity').first()).toHaveValue('5');
    await expect(page.getByLabel('Notes')).toHaveValue('Net 15 days');
  });

  test('should clear saved data and reset form when Clear is clicked', async ({ page }) => {
    // Fill and save
    await page.getByLabel('Company Name').fill('Clear Me Corp');
    await page.getByLabel('Company Address').fill('999 Temp St');
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    // Verify saved
    await expect(page.getByRole('button', { name: 'Load Saved Data' })).toBeVisible();

    // Click Clear
    await page.getByRole('button', { name: 'Clear Saved Data' }).click();

    // Load and Clear buttons should disappear
    await expect(page.getByRole('button', { name: 'Load Saved Data' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear Saved Data' })).not.toBeVisible();

    // Form should be reset to defaults
    await expect(page.getByLabel('Company Name')).toHaveValue('');
    await expect(page.getByLabel('Company Address')).toHaveValue('');
    await expect(page.getByLabel('Currency')).toHaveValue('USD');

    // localStorage should be empty
    const saved = await page.evaluate(() => localStorage.getItem('@freeinvoice-form-data'));
    expect(saved).toBeNull();
  });

  test('should not interfere with Download PDF functionality', async ({ page }) => {
    // Save button should not trigger form submission/validation
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    // No validation errors should appear (save doesn't validate)
    await expect(page.getByText('Company name is required')).not.toBeVisible();
  });
});
