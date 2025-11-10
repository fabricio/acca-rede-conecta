import pool from '../database/db';

export interface RedeApoio {
  id_apoio: number;
  sessao_id: string;
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

  async create(sessao_id: string, nome: string, tipo_apoio: string | null, endereco: string | null, telefone: string | null, publico_alvo: string | null, descricao: string | null): Promise<RedeApoio> {
    const query = `
      INSERT INTO rede_apoio (sessao_id, nome, tipo_apoio, endereco, telefone, publico_alvo, descricao)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *;
    `;
    const result = await pool.query(query, [sessao_id, nome, tipo_apoio, endereco, telefone, publico_alvo, descricao]);
    return result.rows[0];
  }
}

export const redeApoioRepository = new RedeApoioRepository();
