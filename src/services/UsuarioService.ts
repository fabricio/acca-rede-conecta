import { usuarioRepository } from "../repositories/UsuarioRepository";

class UsuarioService {
  async criarConta(data: any) {
    return usuarioRepository.create(data);
  }

  async login(email: string, senha: string) {
    const user = await usuarioRepository.findByEmail(email);

    if (!user || user.senha !== senha) {
      throw new Error("Email ou senha incorretos.");
    }

    return user;
  }

  async listarTodos() {
    return usuarioRepository.findAll();
  }
}

export const usuarioService = new UsuarioService();
