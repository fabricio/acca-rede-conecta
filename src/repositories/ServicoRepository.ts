// src/repositories/ServicoRepository.ts
import pool from '../database/db';

interface Servico {
  id_servico: number;
  id_usuario: number | null;
  nome: string;
  tipo: string;
  endereco: string;
  telefone: string;
  disponibilidade: boolean;
  descricao: string;
}

class ServicoRepository {
  async findAll(): Promise<Servico[]> {
    const result = await pool.query('SELECT * FROM servico ORDER BY id_servico;');
    return result.rows;
  }

  async create(
    id_usuario: number | null,
    nome: string,
    tipo: string,
    endereco: string,
    telefone: string,
    disponibilidade: boolean,
    descricao: string
  ): Promise<Servico> {
    const query = `
      INSERT INTO servico (id_usuario, nome, tipo, endereco, telefone, disponibilidade, descricao)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const result = await pool.query(query, [id_usuario, nome, tipo, endereco, telefone, disponibilidade, descricao]);
    return result.rows[0];
  }
}

export const servicoRepository = new ServicoRepository();
