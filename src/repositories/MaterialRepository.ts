import pool from '../database/db';

export interface Material {
  id_material: number;
  titulo: string;
  tipo: string;
  link?: string | null;
  descricao?: string | null;
  id_enviado_por?: number | null;
  criado_em?: string;
}

class MaterialRepository {
  async findAll(): Promise<Material[]> {
    const result = await pool.query('SELECT * FROM material ORDER BY id_material;');
    return result.rows;
  }

  async create(
    titulo: string,
    tipo: string,
    link: string | null,
    descricao: string | null,
    id_enviado_por: number | null
  ): Promise<Material> {
    const query = `
      INSERT INTO material (titulo, tipo, link, descricao, id_enviado_por)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [titulo, tipo, link, descricao, id_enviado_por]);
    return result.rows[0];
  }
}

export const materialRepository = new MaterialRepository();
