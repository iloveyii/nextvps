import amqp from "amqplib";

const RABBITMQ_URL="amqp://guest:guest@localhost:5672"
export default async function producer(ip:string) {
  const conn = await amqp.connect(RABBITMQ_URL);
  const ch = await conn.createChannel();

  await ch.assertQueue("vpn");
  return ch.sendToQueue("vpn", Buffer.from(JSON.stringify({ip})));
}