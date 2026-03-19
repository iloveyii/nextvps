const postgres = require("postgres");

const POSTGRES_URL =
  "postgresql://neondb_owner:npg_ft6wHEo1YIJW@192.168.100.21:5432/neondb";

const sql = postgres(POSTGRES_URL, { ssl: "prefer" });
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function updateDb(ip, privateKey, publicKey) {
  console.log("DB Url::", POSTGRES_URL);
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

// updateDb("10.0.0.11", "public", "private");

function incrementIp(ip) {
  const parts = ip.split(".").map(Number);
  parts[3] += 1;

  for (let i = 3; i >= 0; i--) {
    if (parts[i] > 255) {
      parts[i] = 0;
      parts[i - 1]++;
    }
  }

  return parts.join(".");
}

async function getNextIp() {
  const result = await sql`
    SELECT host(MAX(ip_address)) AS last_ip FROM wg_clients
  `;

  const lastIp = result[0].last_ip || "10.0.0.1";
  console.log(incrementIp(lastIp));
}

console.log(getNextIp());
