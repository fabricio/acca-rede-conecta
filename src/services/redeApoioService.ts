import { redeApoioRepository } from "../repositories/RedeApoioRepository";

class RedeApoioService {
  async criar (id_usuario: number, data: any)
  return redeApoioRepository.create (
    id_usuario,
    data.nome,
    data.id_apoio,
    data.tipo_apoio,
    data.endereco,
    data.telefone,
    data.publico_alvo,
    data.descricao,
    data.criado_em

  );
}
async listar() {
  return redeApoioRepository.findAll()

} 

export RedeApoioService = new RedeApoioService();

