// src/index.ts
import pool from './database/db';
import * as fs from 'fs/promises';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { materialRepository } from './repositories/MaterialRepository';
import { redeApoioRepository } from './repositories/RedeApoioRepository';
import { ocorrenciaRepository } from './repositories/OcorrenciaRepository';
import { feedbackRepository } from './repositories/FeedbackRepository';
import { usuarioRepository, Usuario } from './repositories/UsuarioRepository';

const INIT_SCHEMA_PATH = './src/schema/init.sql';
const rl = readline.createInterface({ input, output });

let usuarioLogado: Usuario | null = null;

async function runSchemaMigration() {
  try {
    console.log("Verificando e criando o esquema do banco de dados...");
    const schemaSql = await fs.readFile(INIT_SCHEMA_PATH, { encoding: 'utf-8' });
    await pool.query(schemaSql);
    console.log("Esquema criado/verificado com sucesso!");
  } catch (err) {
    console.error("Erro ao rodar a migração do esquema:", err);
  }
}

/* ---------------- USUÁRIO (cadastro e login) ---------------- */
async function handleCreateAccount() {
  console.log("\n--- Criar Conta ---");
  const nome = await rl.question("Nome: ");
  const email = await rl.question("Email: ");
  const senha = await rl.question("Senha: ");
  const idadeStr = await rl.question("Idade (ou ENTER): ");
  const idade = idadeStr ? Number(idadeStr) : null;
  const identidade_genero = (await rl.question("Identidade de gênero (ou ENTER): ")).trim() || null;
  const estado = (await rl.question("Estado (ou ENTER): ")).trim() || null;
  const cidade = (await rl.question("Cidade (ou ENTER): ")).trim() || null;

  const novo = await usuarioRepository.create({
    nome,
    email,
    senha,
    idade,
    identidade_genero,
    estado,
    cidade
  });

  console.log("Conta criada com sucesso! ID:", novo.id_usuario);
}

async function handleLogin() {
  console.log("\n--- Login ---");
  const email = await rl.question("Email: ");
  const senha = await rl.question("Senha: ");

  const usuario = await usuarioRepository.findByEmail(email);

  if (!usuario || usuario.senha !== senha) {
    console.log("❌ Email ou senha incorretos!");
    return;
  }

  usuarioLogado = usuario;
  console.log(`✅ Bem-vindo(a), ${usuario.nome}! (ID: ${usuario.id_usuario})`);
}

async function handleListUsuarios() {
  const lista = await usuarioRepository.findAll();
  console.table(lista);
}

/* ---------------- MATERIAL ---------------- */
async function handleCreateMaterial() {
  if (!usuarioLogado) { console.log("⚠️ Você precisa fazer login primeiro."); return; }

  console.log('\n--- Cadastro: Material ---');
  const titulo = await rl.question("Título: ");
  const tipo = await rl.question("Tipo (link/texto/pdf): ");
  const link = (await rl.question("Link (ou ENTER): ")).trim() || null;
  const descricao = (await rl.question("Descrição (ou ENTER): ")).trim() || null;

  const novo = await materialRepository.create(usuarioLogado.id_usuario, titulo, tipo, link, descricao);
  console.log("✅ Material criado:", novo);
}

async function handleListMaterials() {
  const materials = await materialRepository.findAll();
  console.table(materials);
}

/* ---------------- REDE DE APOIO ---------------- */
async function handleCreateRedeApoio() {
  if (!usuarioLogado) { console.log("⚠️ Você precisa fazer login primeiro."); return; }

  console.log('\n--- Cadastro: Rede de Apoio ---');
  const nome = await rl.question("Nome: ");
  const tipo_apoio = await rl.question("Tipo de apoio: ");
  const endereco = await rl.question("Endereço: ");
  const telefone = await rl.question("Telefone: ");
  const publico_alvo = await rl.question("Público-alvo: ");
  const descricao = await rl.question("Descrição: ");

  const novo = await redeApoioRepository.create(usuarioLogado.id_usuario, nome, tipo_apoio, endereco, telefone, publico_alvo, descricao);
  console.log("✅ Rede de Apoio cadastrada:", novo);
}

async function handleListRedeApoio() {
  const lista = await redeApoioRepository.findAll();
  console.table(lista);
}

/* ---------------- OCORRÊNCIA ---------------- */
async function handleCreateOcorrencia() {
  if (!usuarioLogado) { console.log("⚠️ Você precisa fazer login primeiro."); return; }

  console.log('\n--- Cadastro: Ocorrência ---');
  const descricao = await rl.question("Descrição: ");
  const data_ocorrencia = (await rl.question("Data (YYYY-MM-DD ou ENTER): ")).trim() || null;
  const status = (await rl.question("Status (ex: pendente, resolvida): ")).trim() || null;
  const id_apoioStr = (await rl.question("ID de apoio (ou ENTER): ")).trim();
  const id_apoio = id_apoioStr ? Number(id_apoioStr) : null;

  const novo = await ocorrenciaRepository.create(usuarioLogado.id_usuario, descricao, data_ocorrencia, status, id_apoio);
  console.log("✅ Ocorrência criada:", novo);
}

async function handleListOcorrencias() {
  const lista = await ocorrenciaRepository.findAll();
  console.table(lista);
}

/* ---------------- FEEDBACK ---------------- */
async function handleCreateFeedback() {
  if (!usuarioLogado) { console.log("⚠️ Você precisa fazer login primeiro."); return; }

  console.log('\n--- Enviar Feedback ---');
  const mensagem = await rl.question("Mensagem: ");
  const novo = await feedbackRepository.create(usuarioLogado.id_usuario, mensagem);
  console.log("✅ Feedback enviado:", novo);
}

async function handleListFeedbacks() {
  const lista = await feedbackRepository.findAll();
  console.table(lista);
}

/* ---------------- MENU ---------------- */
async function showMenu() {
  let running = true;
  while (running) {
    console.log("\n--- MENU REDE CONECTA ---");
    console.log("[1] Criar conta");
    console.log("[2] Login");
    console.log("[3] Cadastrar Material");
    console.log("[4] Listar Materiais");
    console.log("[5] Cadastrar Rede de Apoio");
    console.log("[6] Listar Rede de Apoio");
    console.log("[7] Cadastrar Ocorrência");
    console.log("[8] Listar Ocorrências");
    console.log("[9] Enviar Feedback");
    console.log("[10] Listar Feedbacks");
    console.log("[11] Listar Usuários");
    console.log("[0] Sair");

    const choice = await rl.question("Opção: ");

    switch (choice) {
      case '1': await handleCreateAccount(); break;
      case '2': await handleLogin(); break;
      case '3': await handleCreateMaterial(); break;
      case '4': await handleListMaterials(); break;
      case '5': await handleCreateRedeApoio(); break;
      case '6': await handleListRedeApoio(); break;
      case '7': await handleCreateOcorrencia(); break;
      case '8': await handleListOcorrencias(); break;
      case '9': await handleCreateFeedback(); break;
      case '10': await handleListFeedbacks(); break;
      case '11': await handleListUsuarios(); break;
      case '0': running = false; break;
      default: console.log("Opção inválida."); break;
    }
  }
}

/* ---------------- INÍCIO ---------------- */
async function startApplication() {
  await runSchemaMigration();

  // loop de autenticação
  while (!usuarioLogado) {
    console.log("\n1 - Criar conta");
    console.log("2 - Login");
    console.log("0 - Sair");

    const op = await rl.question("Escolha: ");

    if (op === "1") await handleCreateAccount();
    else if (op === "2") await handleLogin();
    else return;
  }

  await showMenu();
  rl.close();
  pool.end();
}

startApplication();
