const amqp = require("amqplib");
const postgres = require("postgres");
const { exec } = require("child_process");
const util = require("util");

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE = "config";
const execAsync = util.promisify(exec);
const sql = postgres(process.env.POSTGRES_URL, { ssl: "prefer" });
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function connectWithRetry() {
  while (true) {
    try {
      console.log("🔄 Trying to connect to RabbitMQ...");
      const conn = await amqp.connect(RABBITMQ_URL);
      const ch = await conn.createChannel();

      await ch.assertQueue(QUEUE);
      console.log("🟢 Connected to RabbitMQ. Waiting for orders...");
      // Only give worker 1 job at a time
      ch.prefetch(1);
      console.log("🟢 Worker ready");

      ch.consume(QUEUE, async (msg) => {
        await delay(3000); // 15s delay per job
        const order = JSON.parse(msg.content.toString());
        console.log("📦 Processing order:", order);
        const configs = await getVpnConfigFromDb();
        console.log("configs::", configs);
        const clients = await getClientsFromDb();
        console.log("Clients::", clients);
        console.log("✅ VPN processed:", order);

        ch.ack(msg);
      });

      break; // exit retry loop once connected
    } catch (err) {
      console.log("❌ RabbitMQ not ready, retrying in 5s...", err);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}

async function getVpnConfigFromDb() {
  console.log("DB Url::", process.env.POSTGRES_URL);

  try {
    const configs = await sql`
      SELECT * FROM config
      WHERE category = 'wg' 
    `;
    return configs;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to get config from DB.");
  }
}

async function getClientsFromDb() {
  console.log("DB Url::", process.env.POSTGRES_URL);

  try {
    const clients = await sql`
      SELECT * FROM wg_clients
    `;
    return clients;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to get clients from DB.");
  }
}

connectWithRetry();
