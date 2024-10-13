import { z } from 'zod';

export const invoiceSchema = z.object({
  due_date: z
    .string()
    .min(10, {
      message: 'Due date is required',
    })
    .max(10),
  company_name: z.string().min(3, { message: 'Company name is required' }),
  company_address: z.string().min(3, { message: 'Company address is required' }),
  bill_to: z.string().min(3, { message: 'Client name is required' }),
  bill_to_address: z.string().min(3, { message: 'Client address is required' }),
  currency: z.string().min(3, { message: 'Currency is required' }),
  vat_id: z.string().optional(),
  services: z.array(
    z.object({
      description: z.string().min(3, { message: 'Description is required' }),
      quantity: z.string().optional().default('1'),
      amount: z.string().min(1, { message: 'Amount is required' }),
    })
  ),
  notes: z.string().optional(),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
