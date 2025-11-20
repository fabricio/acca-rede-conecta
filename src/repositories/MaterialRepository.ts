// src/repositories/MaterialRepository.ts
import pool from '../database/db';

export interface Material {
  id_material: number;
  id_usuario: number | null;
  titulo: string;
  tipo: string;
  link: string | null;
  descricao: string | null;
  criado_em: string;
}

class MaterialRepository {
  async findAll(): Promise<Material[]> {
    const result = await pool.query('SELECT * FROM material ORDER BY id_material;');
    return result.rows;
  }

  async create(id_usuario: number | null, titulo: string, tipo: string, link: string | null, descricao: string | null): Promise<Material> {
    const query = `
      INSERT INTO material (id_usuario, titulo, tipo, link, descricao)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *;
    `;
    const result = await pool.query(query, [id_usuario, titulo, tipo, link, descricao]);
    return result.rows[0];
  }
}

export const materialRepository = new MaterialRepository();
