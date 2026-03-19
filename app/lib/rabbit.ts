'use server';
import amqp from "amqplib";

const QUEUE = "wg_clients";
let connection = null;
let channel: amqp.Channel | null = null;

async function getChannel() {
  if (channel) return channel;
  connection = await amqp.connect(process.env.RABBITMQ_URL!);
  connection.on("close", () => {
    console.log("RabbitMQ connection closed");
    connection = null;
    channel = null;
  });
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE, {
    durable: true,
  });
  return channel;
}

export async function add_worker_task(data : any) {
  console.log("Inside add worker task::", data);
  const ch = await getChannel();
  ch.sendToQueue(
    QUEUE,
    Buffer.from(JSON.stringify(data)),
    {
      persistent: true, // survives restart
    }
  );
  console.log({ status: "Task queued", data });
}