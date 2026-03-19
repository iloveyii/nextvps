'use server';
import { z } from "zod";
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const FormSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  device_tag: z.string(),
  ip_address: z.string(),
  status: z.enum(['enabled', 'disabled'], {
    invalid_type_error: 'Please select a status'
  }),
  date: z.string()
});

const CreateWg = FormSchema.omit({id:true, date:true, ip_address: true});
const UpdateWg = FormSchema.omit({ id: true, date: true });
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
    console.log('else part', validatedFields.data, validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  try {
    const {customer_id, device_tag, status } = validatedFields.data;
    const ip_address = await getNextIp();
    await sql`
      INSERT INTO wg_clients (customer_id, device_tag, status, updated_at, ip_address)
      VALUES (${customer_id}, ${device_tag}, ${status}, CURRENT_TIMESTAMP, ${ip_address})
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

export async function deleteWg(id: string) {
  await sql`DELETE FROM wg_clients WHERE id = ${id}`;
  revalidatePath('/dashboard/wg');
}

export async function updateWg(prevState: StateWg, formData: FormData) {
  console.log(formData);
  const { customer_id, device_tag, status, ip_address } = UpdateWg.parse({
    customer_id: formData.get('customer_id'),
    device_tag: formData.get('device_tag'),
    ip_address: formData.get('ip_address'),
    status: formData.get('status')
  });
 
  try {
    const id =  formData.get('id');
    await sql`
      UPDATE wg_clients
      SET device_tag = ${device_tag}, status = ${status}, ip_address = ${ip_address}
      WHERE id = ${id}
    `;
    
  } catch(error) {
    console.error(error);
  }

  revalidatePath('/dashboard/wg');
  redirect('/dashboard/wg');
}

export async function fetchWgById(id: string) {
  try {
    const clients = await sql<WgClient[]>`
      SELECT
        w.id,
        w.device_tag,
        w.private_key,
        w.public_key,
        w.ip_address,
        w.status,
        c.id as customer_id,
        c.name,
        c.email,
        c.image_url
      FROM wg_clients w
      JOIN customers c ON w.customer_id = c.id
      WHERE w.id = ${id};
    `;
    return clients.length > 0 ? clients[0]: null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchWgClients() {
  try {
    const clients = await sql<WgClient[]>`
      SELECT
        w.id,
        w.device_tag,
        w.private_key,
        w.public_key,
        w.ip_address,
        w.status,
        c.id as customer_id,
        c.name,
        c.email,
        c.image_url
      FROM wg_clients w
      JOIN customers c ON w.customer_id = c.id
      ORDER BY w.updated_at DESC
      LIMIT 5`;
    return clients;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}


function incrementIp(ip) {
  const parts = ip.split(".").map(Number);
  parts[3] += 1;

  for (let i = 3; i >= 0; i--) {
    if (parts[i] > 255) {
      parts[i] = 0;
      parts[i - 1]++;
    }
  }

  return parts.join(".");
}

export async function getNextIp() {
  const result = await sql`
    SELECT host(MAX(ip_address)) AS last_ip FROM wg_clients
  `;

  const lastIp = result[0].last_ip || "10.0.0.1";
  return incrementIp(lastIp);
}