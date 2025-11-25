export interface Material {
  id_material: number;
  id_usuario: number | null;
  titulo: string;
  tipo: string;
  link: string | null;
  descricao: string | null;
  criado_em: string;
}
