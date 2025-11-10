import pool from '../database/db';

export interface Usuario {
  id_usuario: number;
  perfil: string;
  idade?: number | null;
  identidade_genero?: string | null;
  tipo_violencia?: string | null;
  tipo_apoio?: string | null;
  endereco?: string | null;
  estado?: string | null;
  cidade?: string | null;
  criado_em?: string;
}

class UsuarioRepository {
  async findAll(): Promise<Usuario[]> {
    const result = await pool.query('SELECT * FROM usuario ORDER BY id_usuario;');
    return result.rows;
  }

  async findById(id: number): Promise<Usuario | null> {
    const result = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1;', [id]);
    return result.rows[0] ?? null;
  }

  async create(data: {
    perfil: string;
    idade?: number | null;
    identidade_genero?: string | null;
    tipo_violencia?: string | null;
    tipo_apoio?: string | null;
    endereco?: string | null;
    estado?: string | null;
    cidade?: string | null;
  }): Promise<Usuario> {
    const {
      perfil,
      idade = null,
      identidade_genero = null,
      tipo_violencia = null,
      tipo_apoio = null,
      endereco = null,
      estado = null,
      cidade = null,
    } = data;

    const query = `
      INSERT INTO usuario
        (perfil, idade, identidade_genero, tipo_violencia, tipo_apoio, endereco, estado, cidade)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      perfil,
      idade,
      identidade_genero,
      tipo_violencia,
      tipo_apoio,
      endereco,
      estado,
      cidade,
    ]);
    return result.rows[0];
  }
}

export const usuarioRepository = new UsuarioRepository();
