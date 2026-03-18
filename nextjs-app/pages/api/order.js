// /pages/api/order.js
import amqp from "amqplib";
const QUEUE = "wg_clients";

export default async function handler(req, res) {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const ch = await conn.createChannel();

  await ch.assertQueue(QUEUE);
  ch.sendToQueue(QUEUE, Buffer.from(JSON.stringify(req.body)));
  res.status(202).json({ status: "Order queued" });
}
