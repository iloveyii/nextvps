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
  name: z.string({
    required_error: 'Please enter a name',
    invalid_type_error: 'Please enter a valid name'
  }).min(1, 'Name is required'),
  email: z.string({
    required_error: 'Please enter an email',
    invalid_type_error: 'Please enter a valid email'
  }).email('Please enter a valid email'),
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
    customerId?: string[];
    email?: string[];
    name?: string[];
    device_tag?: string[];
  };
  message?: string | null;
};

export async function createWg(prevState: StateWg, formData:FormData) {
  console.log('formData', formData);

  const validatedFields = CreateWg.safeParse ({
    name: formData.get('name'),
    email: formData.get('email'),
    device_tag: formData.get('device_tag'),
    status: formData.get('status')
  });

  if(! validatedFields.success) {
    console.log('if part', validatedFields);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  } else {
    console.log('else part', validatedFields.data);
  }

  try {
    const {name, email, device_tag, status } = validatedFields.data;
    await sql`
      INSERT INTO wg_clients (name, email, device_tag, status, updated_at)
      VALUES (${name}, ${email}, ${device_tag}, ${status}, CURRENT_TIMESTAMP)
    `;
    console.error('Inserted::', `${name}, ${email}, ${device_tag} ${status}`);
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

export async function updateWg(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    
  } catch(error) {
    // We'll also log the error to the console for now
    console.error(error);
    // return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteWg(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
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

 
