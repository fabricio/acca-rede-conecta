import pool from '../database/db';

export interface Feedback {
  id_feedback: number;
  sessao_id: string;
  mensagem: string;
  data_envio: string;
}

class FeedbackRepository {
  async findAll(): Promise<Feedback[]> {
    const result = await pool.query('SELECT * FROM feedback ORDER BY id_feedback;');
    return result.rows;
  }

  async create(sessao_id: string, mensagem: string): Promise<Feedback> {
    const query = `
      INSERT INTO feedback (sessao_id, mensagem)
      VALUES ($1,$2)
      RETURNING *;
    `;
    const result = await pool.query(query, [sessao_id, mensagem]);
    return result.rows[0];
  }
}

export const feedbackRepository = new FeedbackRepository();
