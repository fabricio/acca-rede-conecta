// src/repositories/RedeApoioRepository.ts
import pool from '../database/db';

export interface RedeApoio {
  id_apoio: number;
  id_usuario: number | null;
  nome: string;
  tipo_apoio: string | null;
  endereco: string | null;
  telefone: string | null;
  publico_alvo: string | null;
  descricao: string | null;
  criado_em: string;
}

class RedeApoioRepository {
  async findAll(): Promise<RedeApoio[]> {
    const result = await pool.query('SELECT * FROM rede_apoio ORDER BY id_apoio;');
    return result.rows;
  }

  async create(id_usuario: number | null, nome: string, tipo_apoio: string | null, endereco: string | null, telefone: string | null, publico_alvo: string | null, descricao: string | null): Promise<RedeApoio> {
    const query = `
      INSERT INTO rede_apoio (id_usuario, nome, tipo_apoio, endereco, telefone, publico_alvo, descricao)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *;
    `;
    const result = await pool.query(query, [id_usuario, nome, tipo_apoio, endereco, telefone, publico_alvo, descricao]);
    return result.rows[0];
  }
}

export const redeApoioRepository = new RedeApoioRepository();
