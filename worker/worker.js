const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE = "orders";

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

        console.log("✅ Order processed:", order.id);
        ch.ack(msg);
      });

      break; // exit retry loop once connected
    } catch (err) {
      console.log("❌ RabbitMQ not ready, retrying in 5s...");
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}

connectWithRetry();
