import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { invoices, customers, revenue, users, vpn_clients, configs } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedInvoices() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

async function seedVpnClients() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    DROP TABLE IF EXISTS vpn_clients;
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS vpn_clients (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(64) NOT NULL,
      private_key VARCHAR(64) NULL,
      public_key VARCHAR(64) NULL,
      ip_address inet NOT NULL
    );
  `;

  const insertedVpnClients = await Promise.all(
    vpn_clients.map(
      (client) => sql`
        INSERT INTO vpn_clients (name, private_key, public_key, ip_address)
        VALUES (${client.name}, ${client.private_key}, ${client.public_key}, ${client.ip_address})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedVpnClients;
}

async function seedConfig() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    DROP TABLE IF EXISTS config;
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS config (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      config_key VARCHAR(64) NOT NULL,
      config_value VARCHAR(128) NULL,
      category VARCHAR(64) NULL,
      description VARCHAR(256) NULL
    );
  `;

  const insertedConfig = await Promise.all(
    configs.map(
      (config) => sql`
        INSERT INTO config (config_key, config_value, category, description)
        VALUES (${config.key}, ${config.value}, ${config.category}, ${config.description})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedConfig;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedCustomers(),
      seedInvoices(),
      seedRevenue(),
      seedVpnClients(),
      seedConfig()
    ]);
    console.log(result);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
