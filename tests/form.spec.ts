import { expect, test } from '@playwright/test';

const STORAGE_KEY = '@freeinvoice/draft';

const validInvoiceData = {
  companyName: 'Acme Corp',
  companyAddress: '123 Business St, City, 12345',
  clientName: 'John Doe',
  clientAddress: '456 Client Ave, Town, 67890',
  dueDate: '2026-12-31',
  notes: 'Payment due within 30 days',
};

test.describe('Invoice Generation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: 'Download PDF' }).click();

    await expect(page.getByText('Company name is required')).toBeVisible();
    await expect(page.getByText('Company address is required')).toBeVisible();
    await expect(page.getByText('Client name is required')).toBeVisible();
    await expect(page.getByText('Client address is required')).toBeVisible();
    await expect(page.getByText('Due date is required')).toBeVisible();
    await expect(page.getByText('Description is required')).toBeVisible();
    await expect(page.getByText('Amount is required')).toBeVisible();
  });

  test('generates a PDF with valid data', async ({ page }) => {
    await page.getByLabel('Company name').fill(validInvoiceData.companyName);
    await page.getByLabel('Company address').fill(validInvoiceData.companyAddress);
    await page.getByLabel('Client name').fill(validInvoiceData.clientName);
    await page.getByLabel('Client address').fill(validInvoiceData.clientAddress);
    await page.getByLabel('Currency').selectOption('USD');

    await page.getByLabel('Description').first().fill('Service 1');
    await page.getByLabel('Qty').first().fill('1');
    await page.getByLabel('Amount').first().fill('1000.00');

    await page.getByRole('button', { name: 'Add item' }).click();
    await expect(page.getByLabel('Description')).toHaveCount(2);
    await page.getByLabel('Description').nth(1).fill('Service 2');
    await page.getByLabel('Qty').nth(1).fill('2');
    await page.getByLabel('Amount').nth(1).fill('500.00');

    await page.getByLabel(/VAT ID/).fill('EU123456789');
    await page.getByLabel('Due date').fill(validInvoiceData.dueDate);
    await page.getByLabel(/Notes/).fill(validInvoiceData.notes);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PDF' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^invoice-INV-.*\.pdf$/);
  });

  test('handles different currencies', async ({ page }) => {
    await page.getByLabel('Company name').fill(validInvoiceData.companyName);
    await page.getByLabel('Company address').fill(validInvoiceData.companyAddress);
    await page.getByLabel('Client name').fill(validInvoiceData.clientName);
    await page.getByLabel('Client address').fill(validInvoiceData.clientAddress);
    await page.getByLabel('Due date').fill(validInvoiceData.dueDate);

    for (const code of ['EUR', 'GBP', 'JPY']) {
      await page.getByLabel('Currency').selectOption(code);
      await page.getByLabel('Amount').first().fill('1000.00');
      await expect(page.getByLabel('Amount').first()).toBeVisible();
    }
  });

  test('allows removing items except the first', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add item', exact: true });

    await addButton.dispatchEvent('click');
    await expect(page.getByLabel('Description')).toHaveCount(2);
    await addButton.dispatchEvent('click');
    await expect(page.getByLabel('Description')).toHaveCount(3);

    await expect(page.getByRole('button', { name: /^Remove item/ })).toHaveCount(2);

    await page.getByRole('button', { name: 'Remove item 2' }).click();
    await expect(page.getByLabel('Description')).toHaveCount(2);
  });
});

test.describe('Autosave', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
  });

  test('off by default, nothing persisted', async ({ page }) => {
    await page.getByLabel('Company name').fill('Draft Corp');
    // Give any debounced writer a chance (there shouldn't be one while disabled).
    await page.waitForTimeout(700);
    const raw = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    expect(raw).toBeNull();
  });

  test('enabling writes the current form to storage', async ({ page }) => {
    await page.getByLabel('Company name').fill('Toggle Corp');
    await page.getByLabel('Autosave').check({ force: true });

    await expect.poll(() => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).not.toBeNull();
    const parsed = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
    expect(parsed.enabled).toBe(true);
    expect(parsed.form.company_name).toBe('Toggle Corp');
  });

  test('debounces writes as the user types', async ({ page }) => {
    await page.getByLabel('Autosave').check({ force: true });
    await page.getByLabel('Company name').fill('Debounce Corp');

    await expect
      .poll(
        async () => {
          const raw = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
          return raw ? JSON.parse(raw).form?.company_name : null;
        },
        { timeout: 3000 },
      )
      .toBe('Debounce Corp');
  });

  test('restores saved data on reload when autosave is enabled', async ({ page }) => {
    await page.evaluate((key) => {
      localStorage.setItem(
        key,
        JSON.stringify({
          enabled: true,
          form: {
            company_name: 'Loaded Corp',
            company_address: '789 Loaded Blvd',
            bill_to: 'Client X',
            bill_to_address: '321 Client Rd',
            currency: 'EUR',
            due_date: '2026-06-15',
            vat_id: 'EU999888777',
            services: [{ description: 'Consulting', quantity: '5', amount: '200.00' }],
            notes: 'Net 15 days',
          },
        }),
      );
    }, STORAGE_KEY);

    await page.reload();

    await expect(page.getByLabel('Company name')).toHaveValue('Loaded Corp');
    await expect(page.getByLabel('Company address')).toHaveValue('789 Loaded Blvd');
    await expect(page.getByLabel('Client name')).toHaveValue('Client X');
    await expect(page.getByLabel('Client address')).toHaveValue('321 Client Rd');
    await expect(page.getByLabel('Currency')).toHaveValue('EUR');
    await expect(page.getByLabel('Due date')).toHaveValue('2026-06-15');
    await expect(page.getByLabel(/VAT ID/)).toHaveValue('EU999888777');
    await expect(page.getByLabel('Description').first()).toHaveValue('Consulting');
    await expect(page.getByLabel('Qty').first()).toHaveValue('5');
    await expect(page.getByLabel(/Notes/)).toHaveValue('Net 15 days');
  });

  test('does not restore when stored payload has enabled=false', async ({ page }) => {
    await page.evaluate((key) => {
      localStorage.setItem(
        key,
        JSON.stringify({
          enabled: false,
          form: { company_name: 'Ghost Corp' },
        }),
      );
    }, STORAGE_KEY);

    await page.reload();
    await expect(page.getByLabel('Company name')).toHaveValue('');
  });

  test('disabling autosave clears storage', async ({ page }) => {
    await page.getByLabel('Company name').fill('Clear Me Corp');
    await page.getByLabel('Autosave').check({ force: true });

    await expect.poll(() => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).not.toBeNull();

    await page.getByLabel('Autosave').uncheck({ force: true });

    const raw = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    expect(raw).toBeNull();
  });

  test('Clear form resets fields to defaults', async ({ page }) => {
    await page.getByLabel('Company name').fill('Temp Corp');
    await page.getByLabel('Company address').fill('999 Temp St');

    await page.getByRole('button', { name: 'Clear form' }).click();

    await expect(page.getByLabel('Company name')).toHaveValue('');
    await expect(page.getByLabel('Company address')).toHaveValue('');
    await expect(page.getByLabel('Currency')).toHaveValue('USD');
  });
});
