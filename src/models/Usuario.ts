export interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  senha: string;
  idade: number | null;
  identidade_genero: string | null;
  estado: string | null;
  cidade: string | null;
}
