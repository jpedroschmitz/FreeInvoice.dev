'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/lib/ui/button';
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/lib/ui/fieldset';
import { Input } from '@/lib/ui/input';
import { Select } from '@/lib/ui/select';
import { Text } from '@/lib/ui/text';
import { Textarea } from '@/lib/ui/textarea';

const formSchema = z.object({
  due_date: z.string(),
  company_name: z.string(),
  company_email: z.string(),
  company_address: z.string(),
  company_phone: z.string(),
  bill_to: z.string(),
  bill_to_email: z.string(),
  bill_to_address: z.string(),
  bill_to_phone: z.string(),
  currency: z.string(),
  services: z.array(
    z.object({
      description: z.string().optional(),
      amount: z.string(),
    })
  ),
  notes: z.string().optional(),
});

export function InvoiceForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [{ description: '', amount: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log(data);
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
            {errors.company_name && <Description className="text-red-500">{errors.company_name.message}</Description>}
          </Field>
          <Field>
            <Label htmlFor="company_address">Company Address</Label>
            <Input
              id="company_address"
              placeholder="e.g., 123 Main Street, City, Country"
              {...register('company_address')}
            />
            {errors.company_address && (
              <Description className="text-red-500">{errors.company_address.message}</Description>
            )}
          </Field>
          <Field>
            <Label htmlFor="company_email">Company Email (optional)</Label>
            <Input id="company_email" placeholder="e.g., contact@yourcompany.com" {...register('company_email')} />
            {errors.company_email && <Description className="text-red-500">{errors.company_email.message}</Description>}
          </Field>
          <Field>
            <Label htmlFor="company_phone">Company Phone (optional)</Label>
            <Input id="company_phone" placeholder="e.g., +1 123 456 7890" {...register('company_phone')} />
            {errors.company_phone && <Description className="text-red-500">{errors.company_phone.message}</Description>}
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
            {errors.bill_to && <Description className="text-red-500">{errors.bill_to.message}</Description>}
          </Field>
          <Field>
            <Label htmlFor="bill_to_address">Client Address</Label>
            <Input
              id="bill_to_address"
              placeholder="e.g., 456 Elm Street, City, Country"
              {...register('bill_to_address')}
            />
            {errors.bill_to_address && (
              <Description className="text-red-500">{errors.bill_to_address.message}</Description>
            )}
          </Field>
          <Field>
            <Label htmlFor="bill_to_email">Client Email (optional)</Label>
            <Input id="bill_to_email" placeholder="e.g., client@example.com" {...register('bill_to_email')} />
            {errors.bill_to_email && <Description className="text-red-500">{errors.bill_to_email.message}</Description>}
          </Field>
          <Field>
            <Label htmlFor="bill_to_phone">Client Phone (optional)</Label>
            <Input id="bill_to_phone" placeholder="e.g., +1 987 654 3210" {...register('bill_to_phone')} />
            {errors.bill_to_phone && <Description className="text-red-500">{errors.bill_to_phone.message}</Description>}
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
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </Select>
            {errors.currency && <Description className="text-red-500">{errors.currency.message}</Description>}
          </Field>
        </FieldGroup>

        {fields.map((field, index) => (
          <FieldGroup key={field.id} className="flex items-center gap-6 space-y-0">
            <Field className="w-full">
              <Label htmlFor={`services.${index}.description`}>Item Description</Label>
              <Input
                id={`services.${index}.description`}
                placeholder="e.g., Web Design Services"
                {...register(`services.${index}.description`)}
              />
            </Field>
            <Field>
              <Label htmlFor={`services.${index}.amount`}>Amount</Label>
              <Input
                id={`services.${index}.amount`}
                placeholder="e.g., 1500.00"
                {...register(`services.${index}.amount`)}
              />
              {errors.services?.[index]?.amount && (
                <Description className="text-red-500">{errors.services[index]?.amount?.message}</Description>
              )}
            </Field>
            <Button type="button" color="red" onClick={() => remove(index)} className="shrink-0 self-end">
              <TrashIcon />
            </Button>
          </FieldGroup>
        ))}
        <Button type="button" color="zinc" onClick={() => append({ description: '', amount: '' })} className="mt-6">
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
            {errors.due_date && <Description className="text-red-500">{errors.due_date.message}</Description>}
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
          </Field>
        </FieldGroup>
      </Fieldset>

      <Button type="submit">Download PDF</Button>
    </form>
  );
}
