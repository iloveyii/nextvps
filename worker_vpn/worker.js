const amqp = require("amqplib");
const postgres = require("postgres");
const { exec } = require("child_process");
const util = require("util");
const { producer } = require("./producer");

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE = "wg_clients";
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
        console.log(msg);
        console.log(msg.content);
        console.log(msg.content.toString());
        const order = JSON.parse(msg.content.toString());
        console.log("📦 Processing order:", order);
        const keys = await generateWireguardKeys();
        console.log("🔐 Keys generated:", keys);
        await updateDb(order.ip, keys.privateKey, keys.publicKey);
        await producer(order.ip);
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

async function updateDb(ip, privateKey, publicKey) {
  console.log("DB Url::", process.env.POSTGRES_URL);
  console.log("Params::", ip, privateKey, publicKey);
  try {
    await sql`
      UPDATE wg_clients
      SET
        private_key = ${privateKey},
        public_key  = ${publicKey}
      WHERE ip_address = ${ip}::inet 
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to updae vpn by ip.");
  }
}

async function generateWireguardKeys() {
  try {
    // Generate private key
    const { stdout: privateKey } = await execAsync("wg genkey");

    // Generate public key from private key
    const { stdout: publicKey } = await execAsync(
      `echo "${privateKey.trim()}" | wg pubkey`,
    );

    return {
      privateKey: privateKey.trim(),
      publicKey: publicKey.trim(),
    };
  } catch (err) {
    console.error("❌ Key generation failed:", err);
    throw err;
  }
}

connectWithRetry();
