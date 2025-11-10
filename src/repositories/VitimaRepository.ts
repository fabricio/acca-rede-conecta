import pool from '../database/db';

export interface DeclaracaoVitima {
  id_declaracao: number;
  sessao_id: string;
  nome?: string | null;
  contato?: string | null;
  idade?: number | null;
  identidade_genero?: string | null;
  tipo_violencia?: string | null;
  resumo?: string | null;
  estado?: string | null;
  cidade?: string | null;
  consentimento?: boolean;
  criado_em?: string;
}

class VitimaRepository {
  async findAll(): Promise<DeclaracaoVitima[]> {
    const result = await pool.query('SELECT * FROM declaracao_vitima ORDER BY id_declaracao;');
    return result.rows;
  }

  async findBySessao(sessao_id: string): Promise<DeclaracaoVitima[]> {
    const result = await pool.query('SELECT * FROM declaracao_vitima WHERE sessao_id = $1 ORDER BY id_declaracao;', [sessao_id]);
    return result.rows;
  }

  async create(data: {
    sessao_id: string;
    nome?: string | null;
    contato?: string | null;
    idade?: number | null;
    identidade_genero?: string | null;
    tipo_violencia?: string | null;
    resumo?: string | null;
    estado?: string | null;
    cidade?: string | null;
    consentimento?: boolean;
  }): Promise<DeclaracaoVitima> {
    const {
      sessao_id,
      nome = null,
      contato = null,
      idade = null,
      identidade_genero = null,
      tipo_violencia = null,
      resumo = null,
      estado = null,
      cidade = null,
      consentimento = false,
    } = data;

    const query = `
      INSERT INTO declaracao_vitima
        (sessao_id, nome, contato, idade, identidade_genero, tipo_violencia, resumo, estado, cidade, consentimento)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      sessao_id,
      nome,
      contato,
      idade,
      identidade_genero,
      tipo_violencia,
      resumo,
      estado,
      cidade,
      consentimento,
    ]);
    return result.rows[0];
  }
}

export const vitimaRepository = new VitimaRepository();
