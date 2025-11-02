import pool from './database/db';

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Conexão bem-sucedida!');
    client.release();
  } catch (err) {
    console.error('❌ Erro ao conectar:', err);
  } finally {
    pool.end();
  }
}

testConnection();
