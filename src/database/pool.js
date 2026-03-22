import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "app_user",
  password: process.env.DB_PASSWORD || "#ADSO_node",
  database: process.env.DB_NAME || "inventario_adso",
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_POOL_LIMIT) || 5,
  queueLimit: 0,
});

export const testConnection = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
  } finally {
    connection.release();
  }
};

export default pool;
