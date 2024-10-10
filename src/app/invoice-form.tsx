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
  invoice_number: z.string(),
  due_date: z.string(),
  company_name: z.string(),
  company_address: z.string(),
  bill_to: z.string(),
  bill_to_address: z.string(),
  services: z.array(
    z.object({
      description: z.string().optional(),
      amount: z.string(),
      currency: z.string(),
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
      services: [{ description: '', amount: '', currency: '' }],
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
        <Legend>Invoice details</Legend>
        <Text>Please provide the invoice number and the payment due date.</Text>
        <FieldGroup className="grid grid-cols-2 gap-6 space-y-0">
          <Field>
            <Label htmlFor="invoice_number">Invoice number</Label>
            <Input type="text" id="invoice_number" placeholder="e.g., INV-1001" {...register('invoice_number')} />
            {errors.due_date && <Description className="text-red-500">{errors.due_date.message}</Description>}
          </Field>
          <Field>
            <Label htmlFor="due_date">Due Date</Label>
            <Input type="date" id="due_date" {...register('due_date')} />
            {errors.due_date && <Description className="text-red-500">{errors.due_date.message}</Description>}
          </Field>
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Company Information</Legend>
        <Text>Enter your company&#39;s name and address as they should appear on the invoice.</Text>
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
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Bill To</Legend>
        <Text>Provide the name and address of the person or company being billed.</Text>
        <FieldGroup className="grid grid-cols-2 gap-6 space-y-0">
          <Field>
            <Label htmlFor="bill_to">Name</Label>
            <Input id="bill_to" placeholder="e.g., John Doe" {...register('bill_to')} />
            {errors.bill_to && <Description className="text-red-500">{errors.bill_to.message}</Description>}
          </Field>
          <Field>
            <Label htmlFor="bill_to_address">Address</Label>
            <Input
              id="bill_to_address"
              placeholder="e.g., 456 Elm Street, City, Country"
              {...register('bill_to_address')}
            />
            {errors.bill_to_address && (
              <Description className="text-red-500">{errors.bill_to_address.message}</Description>
            )}
          </Field>
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Services</Legend>
        <Text>List the services or products provided, including descriptions, amounts, and currency.</Text>
        {fields.map((field, index) => (
          <FieldGroup key={field.id} className="flex items-center gap-6 space-y-0">
            <Field className="w-full">
              <Label htmlFor={`services.${index}.description`}>Description</Label>
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
            <Field className="w-64">
              <Label htmlFor={`services.${index}.currency`}>Currency</Label>
              <Select id={`services.${index}.currency`} {...register(`services.${index}.currency`)}>
                <option value="">Select currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </Select>
              {errors.services?.[index]?.currency && (
                <Description className="text-red-500">{errors.services[index]?.currency?.message}</Description>
              )}
            </Field>
            <Button type="button" color="red" onClick={() => remove(index)} className="shrink-0 self-end">
              <TrashIcon />
            </Button>
          </FieldGroup>
        ))}
        <Button type="button" onClick={() => append({ description: '', amount: '', currency: '' })} className="mt-6">
          Add item
          <PlusIcon />
        </Button>
      </Fieldset>

      <Fieldset>
        <Legend>Additional Information</Legend>
        <Text>Include any extra details such as VAT ID, bank details, payment instructions, or other notes.</Text>
        <Field>
          <Label htmlFor="bank_details" className="sr-only">
            Notes
          </Label>
          <Textarea
            id="bank_details"
            rows={10}
            placeholder="e.g., VAT ID: 123456789, Bank Details: Bank Name, Account Number, Payment Terms: Net 30 days"
            {...register('notes')}
          />
        </Field>
      </Fieldset>

      <Button type="submit" color="blue">
        Download PDF
      </Button>
    </form>
  );
}
