const amqp = require("amqplib");
const postgres = require("postgres");
const { exec } = require("child_process");
const util = require("util");

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE = "vpn";
const execAsync = util.promisify(exec);
const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

async function connectWithRetry() {
  while (true) {
    try {
      console.log("🔄 Trying to connect to RabbitMQ...");
      const conn = await amqp.connect(RABBITMQ_URL);
      const ch = await conn.createChannel();

      await ch.assertQueue(QUEUE);
      console.log("🟢 Connected to RabbitMQ. Waiting for orders...");

      ch.consume(QUEUE, async (msg) => {
        const order = JSON.parse(msg.content.toString());
        console.log("📦 Processing order:", order);

        await new Promise((res) => setTimeout(res, 3000));

        console.log("✅ VPN processed:", order);
        const keys = await generateWireguardKeys();

        console.log("🔐 Keys generated:", keys);
        await updateDb(order.ip, keys.privateKey, keys.publicKey);
        ch.ack(msg);
      });

      break; // exit retry loop once connected
    } catch (err) {
      console.log("❌ RabbitMQ not ready, retrying in 5s...");
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}

async function updateDb(ip, privateKey, publicKey) {
  try {
    await sql`
      UPDATE vpn_clients
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

async function generate_server_file(allowed_ip, public_key) {
  const peer = `
[Peer]
PublicKey = ${public_key}
AllowedIPs = ${allowed_ip}/32
`;
  console.log("###########################");
  console.log(peer);
}

connectWithRetry();
