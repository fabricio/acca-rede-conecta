import * as userRepo from "../repositories/userRepository";
import bcrypt from "bcryptjs";

export async function register(userData) {
  const existing = await userRepo.findByEmail(userData.email);
  if (existing) throw new Error("E-mail já cadastrado.");

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  await userRepo.create({
    ...userData,
    password: hashedPassword,
  });

  return { message: "Usuário criado com sucesso!" };
}

export async function login(email: string, password: string) {
  const user = await userRepo.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Credenciais inválidas.");
  }

  return {
    message: "Login realizado com sucesso!",
    user,
  };
}
