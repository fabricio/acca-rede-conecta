import { feedbackRepository } from "../repositories/FeedbackRepository";
 
class FeedbackService {
    async criar(id_usuario: number, data: any){
    return feedbackRepository.create(
        id_usuario,
        data.id_feedback,
        data.mensagem,
        data.data_envio
    );
    }
    async listar() {
        return feedbackRepository.findAll();
    }
    }
    export const feedbackService = new FeedbackService();
