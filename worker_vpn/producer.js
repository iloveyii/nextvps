const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE = "config";

async function producer(ip) {
  const conn = await amqp.connect(RABBITMQ_URL);
  const ch = await conn.createChannel();

  await ch.assertQueue(QUEUE);
  return ch.sendToQueue(QUEUE, Buffer.from(JSON.stringify({ ip })));
}

module.exports = { producer };
