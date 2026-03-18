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

updateDb("10.0.0.11", "public", "private");
