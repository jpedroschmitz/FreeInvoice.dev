'use client';

import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { Controller, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InvoiceFormValues, invoiceSchema } from '@/app/validation';
import { PreviewDrawer } from '@/components/preview-drawer';
import { useFormStorage, type AutosaveStatus } from '@/hooks/useFormStorage';
import { ArrowRight, Plus, X } from '@/lib/ui/icons';

const defaultValues: InvoiceFormValues = {
  company_name: '',
  company_address: '',
  bill_to: '',
  bill_to_address: '',
  currency: 'USD',
  due_date: '',
  vat_id: '',
  services: [{ description: '', quantity: '1', amount: '' }],
  notes: '',
};

const CURRENCIES = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'Pound Sterling' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'EGP', name: 'Egyptian Pound' },
  { code: 'AED', name: 'UAE Dirham' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'NZD', name: 'New Zealand Dollar' },
];

function generateInvoiceId() {
  return `INV-${Date.now().toString(36).toUpperCase()}`;
}

function parseAmount(raw: string | number | undefined | null): number {
  if (raw === undefined || raw === null || raw === '') return 0;
  const n = typeof raw === 'number' ? raw : parseFloat(String(raw).replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

// ——— Form primitives ———————————————————————————————————————————————

const inputClass =
  'block w-full border-b border-border-subtle bg-transparent py-2 text-base text-ink-strong placeholder:text-hairline transition-colors focus:border-accent focus:outline-none';

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-muted"
    >
      <path d="m3 4 2 2 2-2" />
    </svg>
  );
}

function Label({ htmlFor, children, srOnlyMd }: { htmlFor?: string; children: React.ReactNode; srOnlyMd?: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className={
        'block font-mono text-2xs uppercase tracking-caps text-muted' +
        (srOnlyMd ? ' md:sr-only' : '')
      }
    >
      {children}
    </label>
  );
}

function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p className="mt-1 font-mono text-2xs uppercase tracking-caps text-accent">{children}</p>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-6 pt-16">
      <h2 className="font-mono text-xs uppercase tracking-caps text-muted">{children}</h2>
    </div>
  );
}

function AutosaveToggle({
  enabled,
  onChange,
  status,
}: {
  enabled: boolean;
  onChange: (next: boolean) => void;
  status: AutosaveStatus;
}) {
  const statusLabel = enabled
    ? status === 'loaded'
      ? 'Loaded'
      : status === 'saving'
      ? 'Saving…'
      : 'Saved'
    : null;

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <label className="group inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-caps text-muted transition-colors hover:text-ink-strong">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={
            'relative block h-3 w-3 shrink-0 border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent ' +
            (enabled ? 'border-accent' : 'border-hairline group-hover:border-muted')
          }
          aria-hidden="true"
        >
          {enabled && <span className="absolute inset-[2px] bg-accent" />}
        </span>
        Autosave &amp; auto-load
      </label>
      <div className="font-mono text-2xs uppercase tracking-caps text-muted">
        {statusLabel ?? 'Off · nothing leaves this tab'}
      </div>
    </div>
  );
}

// ——— Form ——————————————————————————————————————————————————————————

export function InvoiceForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastDownload, setLastDownload] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewData, setPreviewData] = useState<InvoiceFormValues | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const { enabled: autosaveEnabled, setEnabled: setAutosaveEnabled, status: autosaveStatus, clearForm } =
    useFormStorage({ watch, reset, getValues, defaultValues });

  const { fields, append, remove } = useFieldArray({ control, name: 'services' });

  const services = useWatch({ control, name: 'services' }) ?? [];
  const currency = useWatch({ control, name: 'currency' }) ?? 'USD';

  const total = services.reduce((sum, item) => {
    return sum + parseAmount(item?.quantity) * parseAmount(item?.amount);
  }, 0);

  async function generateBlob(data: InvoiceFormValues, invoiceId: string) {
    const { pdf } = await import('@react-pdf/renderer');
    const { PdfDocument } = await import('@/app/PdfDocument');
    return await pdf(<PdfDocument invoice={{ ...data, invoice_id: invoiceId }} />).toBlob();
  }

  const onDownload: SubmitHandler<InvoiceFormValues> = async (data) => {
    setIsGenerating(true);
    if (typeof window.posthog !== 'undefined') {
      window.posthog.capture('Invoice_Generated');
    }
    try {
      const invoiceId = generateInvoiceId();
      const blob = await generateBlob(data, invoiceId);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      const filename = `invoice-${invoiceId}.pdf`;
      setLastDownload(filename);
      window.setTimeout(() => setLastDownload(null), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onPreview: SubmitHandler<InvoiceFormValues> = async (data) => {
    setPreviewData(data);
    setIsPreviewOpen(true);
    setIsPreviewLoading(true);
    setPreviewUrl(null);
    try {
      const invoiceId = generateInvoiceId();
      const blob = await generateBlob(data, invoiceId);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (error) {
      console.error('Error generating preview:', error);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setPreviewData(null);
  };

  const handleDownloadFromPreview = async () => {
    if (!previewData) return;
    await onDownload(previewData);
    handleClosePreview();
  };

  return (
    <>
      <div className="mb-8 flex justify-start sm:justify-end">
        <AutosaveToggle enabled={autosaveEnabled} onChange={setAutosaveEnabled} status={autosaveStatus} />
      </div>

      <form onSubmit={handleSubmit(onDownload)} noValidate>
        {/* FROM ————————————————————————————————————————————————— */}
        <section>
          <SectionHeader>From</SectionHeader>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="company_name">Company name</Label>
              <input
                id="company_name"
                className={inputClass}
                placeholder="ABC Corporation Ltd."
                {...register('company_name')}
              />
              <FieldError>{errors.company_name?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="company_address">Company address</Label>
              <input
                id="company_address"
                className={inputClass}
                placeholder="123 Main Street, City, Country"
                {...register('company_address')}
              />
              <FieldError>{errors.company_address?.message}</FieldError>
            </div>
          </div>
        </section>

        <section>
          <SectionHeader>Bill to</SectionHeader>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="bill_to">Client name</Label>
              <input
                id="bill_to"
                className={inputClass}
                placeholder="John Doe"
                {...register('bill_to')}
              />
              <FieldError>{errors.bill_to?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="bill_to_address">Client address</Label>
              <input
                id="bill_to_address"
                className={inputClass}
                placeholder="456 Elm Street, City, Country"
                {...register('bill_to_address')}
              />
              <FieldError>{errors.bill_to_address?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="vat_id">VAT ID (optional)</Label>
              <input
                id="vat_id"
                className={inputClass}
                placeholder="e.g. DE123456789"
                {...register('vat_id')}
              />
              <FieldError>{errors.vat_id?.message}</FieldError>
            </div>
          </div>
        </section>

        {/* ITEMS ———————————————————————————————————————————————— */}
        <section>
          <SectionHeader>Items</SectionHeader>

          <div className="mb-8 max-w-xs">
            <Label htmlFor="currency">Currency</Label>
            <div className="relative">
              <select id="currency" className={inputClass + ' appearance-none pr-6'} {...register('currency')}>
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
            <FieldError>{errors.currency?.message}</FieldError>
          </div>

          <div className="space-y-4">
            <div className="hidden grid-cols-[1fr_4rem_9rem_6rem_1.75rem] gap-3 md:grid">
              <span className="font-mono text-2xs uppercase tracking-caps text-muted">Description</span>
              <span className="font-mono text-2xs uppercase tracking-caps text-muted">Qty</span>
              <span className="font-mono text-2xs uppercase tracking-caps text-muted">Amount</span>
              <span className="text-right font-mono text-2xs uppercase tracking-caps text-muted">Subtotal</span>
              <span />
            </div>

            {fields.map((field, index) => {
              const subtotal = parseAmount(services[index]?.quantity) * parseAmount(services[index]?.amount);
              const isFirst = index === 0;
              return (
                <div
                  key={field.id}
                  className="grid gap-4 md:grid-cols-[1fr_4rem_9rem_6rem_1.75rem] md:items-center md:gap-3"
                >
                  <div>
                    <Label htmlFor={`services.${index}.description`} srOnlyMd>
                      Description
                    </Label>
                    <input
                      id={`services.${index}.description`}
                      className={inputClass}
                      placeholder="Web design services"
                      {...register(`services.${index}.description`)}
                    />
                    <FieldError>{errors.services?.[index]?.description?.message}</FieldError>
                  </div>
                  <div>
                    <Label htmlFor={`services.${index}.quantity`} srOnlyMd>
                      Qty
                    </Label>
                    <input
                      id={`services.${index}.quantity`}
                      type="number"
                      min="0"
                      step="1"
                      className={inputClass + ' tabular-nums'}
                      {...register(`services.${index}.quantity`)}
                    />
                    <FieldError>{errors.services?.[index]?.quantity?.message}</FieldError>
                  </div>
                  <div>
                    <Label htmlFor={`services.${index}.amount`} srOnlyMd>
                      Amount
                    </Label>
                    <Controller
                      control={control}
                      name={`services.${index}.amount`}
                      render={({ field: { onChange, value, name, onBlur } }) => (
                        <CurrencyInput
                          key={currency}
                          id={`services.${index}.amount`}
                          name={name}
                          className={inputClass + ' tabular-nums'}
                          placeholder="1500.00"
                          allowNegativeValue={false}
                          allowDecimals
                          intlConfig={{ locale: 'en-US', currency: currency || 'USD' }}
                          value={value}
                          onBlur={onBlur}
                          onValueChange={(val) => onChange(val ?? '')}
                        />
                      )}
                    />
                    <FieldError>{errors.services?.[index]?.amount?.message}</FieldError>
                  </div>
                  <div className="flex items-baseline justify-between md:justify-end">
                    <span className="font-mono text-2xs uppercase tracking-caps text-muted md:sr-only">
                      Subtotal
                    </span>
                    <span className="font-mono text-sm tabular-nums text-ink md:text-right">
                      {formatCurrency(subtotal, currency)}
                    </span>
                  </div>
                  <div className="flex md:justify-center">
                    {!isFirst && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        aria-label={`Remove item ${index + 1}`}
                        className="-m-2 p-2 text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <X />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => append({ description: '', quantity: '1', amount: '' })}
              className="-my-1 inline-flex items-center gap-2 py-1 font-mono text-xs uppercase tracking-caps text-muted transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Plus />
              Add item
            </button>
          </div>

          <div className="mt-12 flex items-baseline justify-between border-t border-hairline pt-4">
            <span className="font-mono text-xs uppercase tracking-caps text-muted">Total</span>
            <span className="font-display text-2xl font-medium tabular-nums text-ink-strong">
              {formatCurrency(total, currency)}
            </span>
          </div>
        </section>

        {/* DETAILS ——————————————————————————————————————————————— */}
        <section>
          <SectionHeader>Details</SectionHeader>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="due_date">Due date</Label>
              <input
                id="due_date"
                type="date"
                className={inputClass + ' tabular-nums'}
                {...register('due_date')}
              />
              <FieldError>{errors.due_date?.message}</FieldError>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <textarea
              id="notes"
              rows={6}
              placeholder="Bank details, payment terms, etc."
              className="mt-2 block w-full border border-border-subtle bg-transparent p-3 text-base text-ink-strong placeholder:text-hairline transition-colors focus:border-accent focus:outline-none focus:ring-0"
              {...register('notes')}
            />
            <FieldError>{errors.notes?.message}</FieldError>
          </div>
        </section>

        {/* ACTION BAR ———————————————————————————————————————————— */}
        <section className="pt-16">
          <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={clearForm}
              className="-my-1 self-start py-1 font-mono text-xs uppercase tracking-caps text-muted transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:self-auto"
            >
              Clear form
            </button>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
              <button
                type="button"
                onClick={handleSubmit(onPreview)}
                disabled={isGenerating || isPreviewLoading}
                className="-my-2 inline-flex items-center justify-center gap-2 py-2 font-mono text-xs uppercase tracking-caps text-muted transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50"
              >
                Preview
              </button>
              <button
                type="submit"
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-3 bg-accent px-5 py-3.5 font-mono text-sm font-medium uppercase tracking-caps text-paper transition-[background-color,transform] duration-150 ease-out hover:bg-accent-press active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50"
              >
                {isGenerating ? 'Preparing…' : 'Download PDF'}
                <ArrowRight />
              </button>
            </div>
          </div>

          {lastDownload && (
            <p className="mt-4 text-right font-mono text-2xs uppercase tracking-caps text-muted">
              Downloaded · <span className="tabular-nums text-ink">{lastDownload}</span>
            </p>
          )}
        </section>
      </form>

      <PreviewDrawer
        open={isPreviewOpen}
        loading={isPreviewLoading}
        pdfUrl={previewUrl}
        onClose={handleClosePreview}
        onDownload={handleDownloadFromPreview}
        downloading={isGenerating}
      />
    </>
  );
}
