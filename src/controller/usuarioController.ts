
import { Request, Response } from "express";
import * as usuarioService from "../services/UsuarioService";


class UsuarioController {
  async criarConta(req: Request, res: Response) {
    try {
      const novoUsuario = await usuarioService.criarConta(req.body);
      res.json(novoUsuario);
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const usuario = await usuarioService.login(email, senha);
      res.json(usuario);
    } catch (err: any) {
      res.status(401).json({ erro: err.message });
    }
  }

  async listar(req: Request, res: Response) {
    const usuarios = await usuarioService.listarTodos();
    res.json(usuarios);
  }
}

export const usuarioController = new UsuarioController();