'use server';
import { z } from "zod";
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { LatestInvoiceRaw } from "../definitions";
import { formatCurrency } from "../utils";

const FormSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  device_tag: z.string(),
  status: z.enum(['enabled', 'disabled'], {
    invalid_type_error: 'Please select a status'
  }),
  date: z.string()
});

const CreateWg = FormSchema.omit({id:true, date:true});
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });

export type StateWg = {
  errors?: {
    customer_id?: string[];
    device_tag?: string[];
    public_key?: string[];
    private_key?: string[];
  };
  message?: string | null;
};

export async function createWg(prevState: StateWg, formData:FormData) {
  console.log('formData', formData);

  const validatedFields = CreateWg.safeParse ({
    customer_id: formData.get('customer_id'),
    device_tag: formData.get('device_tag'),
    status: formData.get('status')
  });

  if(validatedFields.success) {
    console.log('if part', validatedFields);
  } else {
    console.log('else part', validatedFields.data);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  try {
    const {customer_id, device_tag, status } = validatedFields.data;
    await sql`
      INSERT INTO wg_clients (customer_id, device_tag, status, updated_at)
      VALUES (${customer_id}, ${device_tag}, ${status}, CURRENT_TIMESTAMP)
    `;
    console.error('Inserted::', `${customer_id}, ${device_tag} ${status}`);
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  
  revalidatePath('/dashboard/wg');
  redirect('/dashboard/wg');
}

export async function fetchWgClients() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

 
