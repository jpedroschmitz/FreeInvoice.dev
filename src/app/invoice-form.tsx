'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStatus } from 'react-dom';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/lib/ui/button';
import { ErrorMessage, Field, FieldGroup, Fieldset, Label, Legend } from '@/lib/ui/fieldset';
import { Input } from '@/lib/ui/input';
import { Select } from '@/lib/ui/select';
import { Text } from '@/lib/ui/text';
import { Textarea } from '@/lib/ui/textarea';

const formSchema = z.object({
  due_date: z
    .string()
    .min(10, {
      message: 'Due date is required',
    })
    .max(10),
  company_name: z.string().min(3, { message: 'Company name is required' }),
  company_email: z.string().optional(),
  company_address: z.string().min(3, { message: 'Company address is required' }),
  company_phone: z.string().optional(),
  bill_to: z.string().min(3, { message: 'Client name is required' }),
  bill_to_email: z.string().optional(),
  bill_to_address: z.string().min(3, { message: 'Client address is required' }),
  bill_to_phone: z.string().optional(),
  currency: z.string().min(3, { message: 'Currency is required' }),
  services: z.array(
    z.object({
      description: z.string().min(3, { message: 'Description is required' }),
      quantity: z.string().optional().default('1'),
      amount: z.string().min(1, { message: 'Amount is required' }),
    })
  ),
  notes: z.string().optional(),
});

export type InvoiceFormValues = z.infer<typeof formSchema>;

export function InvoiceForm() {
  const { pending } = useFormStatus();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [{ description: '', quantity: '1', amount: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  });

  const onSubmit: SubmitHandler<InvoiceFormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-10">
      <Fieldset disabled={pending}>
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
          <Field>
            <Label htmlFor="company_email">Company Email (optional)</Label>
            <Input id="company_email" placeholder="e.g., contact@yourcompany.com" {...register('company_email')} />
            {errors.company_email && <ErrorMessage>{errors.company_email.message}</ErrorMessage>}
          </Field>
          <Field>
            <Label htmlFor="company_phone">Company Phone (optional)</Label>
            <Input id="company_phone" placeholder="e.g., +1 123 456 7890" {...register('company_phone')} />
            {errors.company_phone && <ErrorMessage>{errors.company_phone.message}</ErrorMessage>}
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
          <Field>
            <Label htmlFor="bill_to_email">Client Email (optional)</Label>
            <Input id="bill_to_email" placeholder="e.g., client@example.com" {...register('bill_to_email')} />
            {errors.bill_to_email && <ErrorMessage>{errors.bill_to_email.message}</ErrorMessage>}
          </Field>
          <Field>
            <Label htmlFor="bill_to_phone">Client Phone (optional)</Label>
            <Input id="bill_to_phone" placeholder="e.g., +1 987 654 3210" {...register('bill_to_phone')} />
            {errors.bill_to_phone && <ErrorMessage>{errors.bill_to_phone.message}</ErrorMessage>}
          </Field>
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Invoice Items</Legend>
        <Text>Detail the products or services provided, including descriptions, amounts, and currency.</Text>

        <FieldGroup className="flex items-center gap-6 space-y-0">
          <Field className="w-64">
            <Label htmlFor="currency">Currency</Label>
            <Select id="currency" {...register('currency')}>
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
              <Input
                id={`services.${index}.amount`}
                type="number"
                placeholder="e.g., 1500.00"
                {...register(`services.${index}.amount`)}
              />
              {errors.services?.[index]?.amount && (
                <ErrorMessage>{errors.services[index]?.amount?.message}</ErrorMessage>
              )}
            </Field>
            <Button
              type="button"
              color="red"
              disabled={index === 0}
              onClick={() => {
                if (index !== 0) remove(index);
              }}
              className="shrink-0 self-center"
            >
              <TrashIcon />
            </Button>
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
        <Text>Add any extra information such as VAT number, bank details, payment terms, or notes.</Text>
        <FieldGroup className="space-y-8">
          <Field className="w-64">
            <Label htmlFor="due_date">Due Date</Label>
            <Input type="date" id="due_date" {...register('due_date')} />
            {errors.due_date && <ErrorMessage>{errors.due_date.message}</ErrorMessage>}
          </Field>
          <Field>
            <Label htmlFor="notes" className="sr-only">
              Notes
            </Label>
            <Textarea
              id="notes"
              rows={10}
              placeholder="e.g., VAT ID: 123456789, Bank Details: Bank Name, Account Number, Payment Terms: Net 30 days"
              {...register('notes')}
            />
            {errors.notes && <ErrorMessage>{errors.notes.message}</ErrorMessage>}
          </Field>
        </FieldGroup>
      </Fieldset>

      <Button type="submit" className="mt-10" disabled={pending}>
        {pending ? 'Generating...' : 'Download PDF'}
      </Button>
    </form>
  );
}
