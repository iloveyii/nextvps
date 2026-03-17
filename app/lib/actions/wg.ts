'use server';
import { z } from "zod";
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer'
  }),
  name: z.string(),
  email: z.string(),
  status: z.enum(['enabled', 'disabled'], {
    invalid_type_error: 'Please select a status'
  }),
  date: z.string()
});

const CreateWg = FormSchema.omit({id:true, date:true});
// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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

  const validatedFields = CreateWg.safeParse ({
    customerId: formData.get('customerId'),
    name: formData.get('name'),
    enail: formData.get('email'),
    device_tag: formData.get('device_tag'),
    status: formData.get('status')
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  // Prepare data for insertion into the database
  const { customerId, name, email, status } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO wg_clients (customer_id, name, email, status, date)
      VALUES (${customerId}, ${name}, ${email}, ${status}, ${date})
    `;
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

 
