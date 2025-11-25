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
// Interface auxiliar para o método de criação (exclui o ID e a data)
export interface RedeApoioCreate {
    sessao_id: string;
    nome: string;
    tipo_apoio: string | null;
    endereco: string | null;
    telefone: string | null;
    publico_alvo: string | null;
    descricao: string | null;
}