// /pages/api/order.js
import amqp from "amqplib";

export default async function handler(req, res) {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const ch = await conn.createChannel();

  await ch.assertQueue("orders");
  ch.sendToQueue("orders", Buffer.from(JSON.stringify(req.body)));

  res.status(202).json({ status: "Order queued" });
}
