import { pool } from '../config/db';
import { RedeApoio, RedeApoioCreate } from '../models/redeApoioModels';

class RedeApoioRepository {

  async findAll(): Promise<RedeApoio[]> {
    const result = await pool.query(`
      SELECT * FROM rede_apoio
      ORDER BY id_apoio;
    `);
    return result.rows;
  }

  async create(data: RedeApoioCreate): Promise<RedeApoio> {
    const {
      sessao_id,
      nome,
      tipo_apoio,
      endereco,
      telefone,
      publico_alvo,
      descricao
    } = data;

    const query = `
      INSERT INTO rede_apoio (
        sessao_id, nome, tipo_apoio,
        endereco, telefone, publico_alvo, descricao
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      sessao_id,
      nome,
      tipo_apoio,
      endereco,
      telefone,
      publico_alvo,
      descricao
    ]);

    return result.rows[0];
  }
}

export const redeApoioRepository = new RedeApoioRepository();
