import pool from '../database/db';

export interface Ocorrencia {
  id_ocorrencia: number;
  sessao_id: string;
  descricao: string;
  data_ocorrencia: string | null;
  status: string | null;
  id_apoio: number | null;
  criado_em: string;
}

class OcorrenciaRepository {
  async findAll(): Promise<Ocorrencia[]> {
    const result = await pool.query('SELECT * FROM ocorrencia ORDER BY id_ocorrencia;');
    return result.rows;
  }

  async create(sessao_id: string, descricao: string, data_ocorrencia: string | null, status: string | null, id_apoio: number | null): Promise<Ocorrencia> {
    const query = `
      INSERT INTO ocorrencia (sessao_id, descricao, data_ocorrencia, status, id_apoio)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *;
    `;
    const result = await pool.query(query, [sessao_id, descricao, data_ocorrencia, status, id_apoio]);
    return result.rows[0];
  }
}

export const ocorrenciaRepository = new OcorrenciaRepository();
