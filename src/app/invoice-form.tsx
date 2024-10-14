'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { InvoiceFormValues, invoiceSchema } from '@/app/validation';
import { Button } from '@/lib/ui/button';
import { Description, ErrorMessage, Field, FieldGroup, Fieldset, Label, Legend } from '@/lib/ui/fieldset';
import { Input } from '@/lib/ui/input';
import { Select } from '@/lib/ui/select';
import { Text } from '@/lib/ui/text';
import { Textarea } from '@/lib/ui/textarea';

const generateInvoiceId = () => {
  const prefix = 'INV';
  const timestamp = Date.now().toString(36); // Convert timestamp to base36
  return `${prefix}-${timestamp}`.toUpperCase();
};

export function InvoiceForm() {
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      currency: 'USD',
      services: [{ description: '', quantity: '1', amount: '' }],
    },
  });

  const currency = watch('currency');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  });

  const onSubmit: SubmitHandler<InvoiceFormValues> = async (data) => {
    setIsGenerating(true);
    // Plausible event tracking
    if (typeof window.plausible !== 'undefined' && process.env.NODE_ENV === 'production') {
      window.plausible('Invoice_Generated', {
        callback: () => {
          console.log('Plausible event sent: Invoice_Generated');
        },
      });
    }

    try {
      const invoiceId = generateInvoiceId();
      const { PdfDocument } = await import('@/app/PdfDocument');
      const blob = await pdf(
        <PdfDocument
          invoice={{
            ...data,
            invoice_id: invoiceId,
          }}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;
      link.click();
      URL.revokeObjectURL(url); // This frees up memory by releasing the reference to the blob
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-10">
      <Fieldset>
        <Legend>Your Company Details</Legend>
        <Text>Provide your company&#39;s official name and address as they should appear on the invoice.</Text>
        <FieldGroup className="grid grid-cols-2 gap-6 space-y-0">
          <Field>
            <Label htmlFor="company_name">Company Name</Label>
            <Input id="company_name" placeholder="e.g., ABC Corporation Ltd." {...register('company_name')} />
            {errors.company_name && <ErrorMessage>{errors.company_name.message}</ErrorMessage>}
          </Field>
          <Field>
            <Label htmlFor="company_address">Company Address</Label>
            <Input
              id="company_address"
              placeholder="e.g., 123 Main Street, City, Country"
              {...register('company_address')}
            />
            {errors.company_address && <ErrorMessage>{errors.company_address.message}</ErrorMessage>}
          </Field>
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Client Information</Legend>
        <Text>Enter the name and address of the person or company you are billing.</Text>
        <FieldGroup className="grid grid-cols-2 gap-6 space-y-0">
          <Field>
            <Label htmlFor="bill_to">Client Name</Label>
            <Input id="bill_to" placeholder="e.g., John Doe" {...register('bill_to')} />
            {errors.bill_to && <ErrorMessage className="text-red-500">{errors.bill_to.message}</ErrorMessage>}
          </Field>
          <Field>
            <Label htmlFor="bill_to_address">Client Address</Label>
            <Input
              id="bill_to_address"
              placeholder="e.g., 456 Elm Street, City, Country"
              {...register('bill_to_address')}
            />
            {errors.bill_to_address && (
              <ErrorMessage className="text-red-500">{errors.bill_to_address.message}</ErrorMessage>
            )}
          </Field>
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Invoice Items</Legend>
        <Text>Detail the products or services provided, including descriptions, amounts, and currency.</Text>

        <FieldGroup className="flex items-center gap-6 space-y-0">
          <Field>
            <Label htmlFor="currency">Currency</Label>
            <Description>The currency you are billing in. It will be used for all items.</Description>
            <Select id="currency" {...register('currency')} className="w-64">
              <option value="">Select currency</option>
              <option value="USD">United States Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">Pound Sterling (GBP)</option>
              <option value="AUD">Australian Dollar (AUD)</option>
              <option value="CAD">Canadian Dollar (CAD)</option>
              <option value="JPY">Yen (JPY)</option>
              <option value="EGP">Egyptian Pound (EGP)</option>
              <option value="AED">United Arab Emirates Dirham (AED)</option>
              <option value="INR">Indian Rupee (INR)</option>
              <option value="NZD">New Zealand Dollar (NZD)</option>
            </Select>
            {errors.currency && <ErrorMessage>{errors.currency.message}</ErrorMessage>}
          </Field>
        </FieldGroup>

        {fields.map((field, index) => (
          <FieldGroup key={field.id} className="flex gap-6 space-y-0">
            <Field className="w-full">
              <Label htmlFor={`services.${index}.description`}>Item Description</Label>
              <Input
                id={`services.${index}.description`}
                placeholder="e.g., Web Design Services"
                {...register(`services.${index}.description`)}
              />
              {errors.services?.[index]?.description && (
                <ErrorMessage>{errors.services[index]?.description?.message}</ErrorMessage>
              )}
            </Field>
            <Field className="w-40">
              <Label htmlFor={`services.${index}.quantity`}>Quantity</Label>
              <Input id={`services.${index}.quantity`} type="number" {...register(`services.${index}.quantity`)} />
              {errors.services?.[index]?.quantity && (
                <ErrorMessage>{errors.services[index]?.quantity?.message}</ErrorMessage>
              )}
            </Field>
            <Field className="w-64">
              <Label htmlFor={`services.${index}.amount`}>Amount</Label>
              <CurrencyInput
                key={currency}
                id={`services.${index}.amount`}
                customInput={Input}
                placeholder="e.g., 1500.00"
                allowNegativeValue={false}
                allowDecimals
                intlConfig={{
                  locale: 'en-US',
                  currency: currency || 'USD',
                }}
                {...register(`services.${index}.amount`)}
              />
              {errors.services?.[index]?.amount && (
                <ErrorMessage>{errors.services[index]?.amount?.message}</ErrorMessage>
              )}
            </Field>
            <div className="w-[34px] h-full flex items-stretch flex-1 shrink-0">
              <Button
                type="button"
                color="red"
                disabled={index === 0}
                onClick={() => {
                  if (index !== 0) remove(index);
                }}
                className="mt-9"
              >
                <TrashIcon />
              </Button>
            </div>
          </FieldGroup>
        ))}
        <Button
          type="button"
          color="zinc"
          onClick={() => append({ description: '', quantity: '1', amount: '' })}
          className="mt-6"
        >
          Add Item
          <PlusIcon />
        </Button>
      </Fieldset>

      <Fieldset>
        <Legend>Additional Details</Legend>
        <FieldGroup className="grid grid-cols-2 gap-6 space-y-0">
          <Field>
            <Label htmlFor="due_date">Due Date</Label>
            <Input type="date" id="due_date" {...register('due_date')} />
            {errors.due_date && <ErrorMessage>{errors.due_date.message}</ErrorMessage>}
          </Field>
          <Field>
            <Label htmlFor="vat_id">VAT ID (optional)</Label>
            <Input id="vat_id" {...register('vat_id')} />
            {errors.vat_id && <ErrorMessage>{errors.vat_id.message}</ErrorMessage>}
          </Field>
        </FieldGroup>
        <Field className="mt-8">
          <Label htmlFor="notes">Notes</Label>
          <Description>Add any extra information such bank details, payment terms, or notes.</Description>
          <Textarea
            id="notes"
            rows={10}
            placeholder="e.g., Bank Details: Bank Name, Account Number, Payment Terms: Net 30 days"
            {...register('notes')}
          />
          {errors.notes && <ErrorMessage>{errors.notes.message}</ErrorMessage>}
        </Field>
      </Fieldset>

      <Button type="submit" className="mt-10" disabled={isGenerating}>
        Download PDF
      </Button>
    </form>
  );
}
