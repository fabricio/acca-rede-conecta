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
export function criarConta(body: any) {
  throw new Error("Function not implemented.");
}

export function login(email: any, senha: any) {
  throw new Error("Function not implemented.");
}

export function listarTodos() {
  throw new Error("Function not implemented.");
}

