import { pool } from "../config/db";
import { User } from "../models/userModels";

export async function findAll(): Promise<User[]> {
  const result = await pool.query("SELECT * FROM users ORDER BY id;");
  return result.rows;
}

export async function findByEmail(email: string): Promise<User | null> {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0] || null;
}

export async function create(user: User): Promise<void> {
  const { name, email, password } = user;

  await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password]
  );
}
