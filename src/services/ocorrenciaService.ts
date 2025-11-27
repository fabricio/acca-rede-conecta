import { ocorrenciaRepository } from "../repositories/OcorrenciaRepository";

class OcorrenciaService {
  async criar(id_usuario: number, data: any) {
    return ocorrenciaRepository.create(
      id_usuario,
      data.descricao,
      data.data_ocorrencia,
      data.status,
      data.id_apoio
    );
  }
  
  async listar() {
    return ocorrenciaRepository.findAll();
  }
}
export const ocorrenciaService = new OcorrenciaService();
