    import pool from '../database/db';

export interface Feedback {
  id_feedback: number;
  id_usuario?: number | null;
  mensagem: string;
  data_envio?: string;
}

class FeedbackRepository {
  async findAll(): Promise<Feedback[]> {
    const result = await pool.query('SELECT * FROM feedback ORDER BY data_envio DESC;');
    return result.rows;
  }

  async create(id_usuario: number | null, mensagem: string): Promise<Feedback> {
    const query = `
      INSERT INTO feedback (id_usuario, mensagem)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await pool.query(query, [id_usuario, mensagem]);
    return result.rows[0];
  }
}

export const feedbackRepository = new FeedbackRepository();
