export interface Ocorrencia {
  id_ocorrencia: number;
  id_usuario: number | null;
  descricao: string;
  data_ocorrencia: string | null;
  status: string | null;
  id_apoio: number | null;
  criado_em: string;
}
