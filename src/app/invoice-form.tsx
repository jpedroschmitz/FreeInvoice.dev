'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/lib/ui/button';
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/lib/ui/fieldset';
import { Input } from '@/lib/ui/input';
import { Select } from '@/lib/ui/select';
import { Textarea } from '@/lib/ui/textarea';

const formSchema = z.object({
  due_date: z.string(),
  company_name: z.string(),
  company_address: z.string(),
  company_country: z.string(),
  bill_to: z.string(),
  bill_to_address: z.string(),
  bill_to_country: z.string(),
  vat_id: z.string().optional(),
  services: z.array(
    z.object({
      description: z.string().optional(),
      amount: z.string(),
      currency: z.string(),
    })
  ),
  bank_details: z.string().optional(),
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
    // Here you would typically send the data to your server
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <Fieldset>
        <Legend>Invoice Details</Legend>
        <FieldGroup>
          <Field>
            <Label htmlFor="due_date">Due Date</Label>
            <Input type="date" id="due_date" {...register('due_date')} />
            {errors.due_date && <Description className="text-red-500">{errors.due_date.message}</Description>}
          </Field>
          <Field>
            <Label htmlFor="company_name">Company Name</Label>
            <Input id="company_name" {...register('company_name')} />
            {errors.company_name && <Description className="text-red-500">{errors.company_name.message}</Description>}
          </Field>
          <Field>
            <Label htmlFor="company_address">Company Address</Label>
            <Textarea id="company_address" {...register('company_address')} />
            {errors.company_address && (
              <Description className="text-red-500">{errors.company_address.message}</Description>
            )}
          </Field>
          <Field>
            <Label htmlFor="company_country">Company Country</Label>
            <Input id="company_country" {...register('company_country')} />
            {errors.company_country && (
              <Description className="text-red-500">{errors.company_country.message}</Description>
            )}
          </Field>
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Bill To</Legend>
        <FieldGroup>
          <Field>
            <Label htmlFor="bill_to">Bill To Name</Label>
            <Input id="bill_to" {...register('bill_to')} />
            {errors.bill_to && <Description className="text-red-500">{errors.bill_to.message}</Description>}
          </Field>
          <Field>
            <Label htmlFor="bill_to_address">Bill To Address</Label>
            <Textarea id="bill_to_address" {...register('bill_to_address')} />
            {errors.bill_to_address && (
              <Description className="text-red-500">{errors.bill_to_address.message}</Description>
            )}
          </Field>
          <Field>
            <Label htmlFor="bill_to_country">Bill To Country</Label>
            <Input id="bill_to_country" {...register('bill_to_country')} />
            {errors.bill_to_country && (
              <Description className="text-red-500">{errors.bill_to_country.message}</Description>
            )}
          </Field>
          <Field>
            <Label htmlFor="vat_id">VAT ID (optional)</Label>
            <Input id="vat_id" {...register('vat_id')} />
          </Field>
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Services</Legend>
        {fields.map((field, index) => (
          <FieldGroup key={field.id}>
            <Field>
              <Label htmlFor={`services.${index}.description`}>Description</Label>
              <Input id={`services.${index}.description`} {...register(`services.${index}.description`)} />
            </Field>
            <Field>
              <Label htmlFor={`services.${index}.amount`}>Amount</Label>
              <Input id={`services.${index}.amount`} {...register(`services.${index}.amount`)} />
              {errors.services?.[index]?.amount && (
                <Description className="text-red-500">{errors.services[index]?.amount?.message}</Description>
              )}
            </Field>
            <Field>
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
            <Button type="button" onClick={() => remove(index)} className="mt-2">
              Remove Service
            </Button>
          </FieldGroup>
        ))}
        <Button type="button" onClick={() => append({ description: '', amount: '', currency: '' })} className="mt-2">
          Add Service
        </Button>
      </Fieldset>

      <Fieldset>
        <Legend>Bank Details (optional)</Legend>
        <Field>
          <Label htmlFor="bank_details">Bank Details</Label>
          <Textarea id="bank_details" {...register('bank_details')} />
        </Field>
      </Fieldset>

      <Button type="submit">Submit Invoice</Button>
    </form>
  );
}
