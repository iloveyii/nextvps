const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL;

async function producer(ip) {
  const conn = await amqp.connect(RABBITMQ_URL);
  const ch = await conn.createChannel();

  await ch.assertQueue("vpn_server");
  return ch.sendToQueue("vpn_server", Buffer.from(JSON.stringify({ ip })));
}

module.exports = { producer };
