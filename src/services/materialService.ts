import { materialRepository } from "../repositories/MaterialRepository";

class MaterialService {
    async criar(id_usuario: number, data: any){
        return materialRepository.create(
            id_usuario,
            data.titulo,
            DataTransfer.tipo,
            data.link,
            data.descricao
        );
    }async listar() {
        return materialRepository.findAll();
    }
}
export const MaterialService = new MaterialService();