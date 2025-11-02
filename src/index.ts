import pool from './database/db';
import * as fs from 'fs/promises';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { usuarioRepository } from './repositories/UsuarioRepository';
import { materialRepository } from './repositories/MaterialRepository';
import { redeApoioRepository } from './repositories/RedeApoioRepository';
import { ocorrenciaRepository } from './repositories/OcorrenciaRepository';
import { feedbackRepository } from './repositories/FeedbackRepository';

const INIT_SCHEMA_PATH = './src/schema/init.sql';
const rl = readline.createInterface({ input, output });

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

/* ---------------- USUÁRIO ---------------- */
async function handleCreateVitima() {
  console.log('\n--- Cadastro: usuário ---');
  const tipo_usuario = (await rl.question('Tipo de Usuário (Vitima, admistrador, apoiador): ')).trim();
  const email = (await rl.question("Email (ou ENTER para anônimo): ")).trim() || null;
  const senha = (await rl.question("Senha (ou ENTER para anônimo): ")).trim() || null;
  const idadeStr = (await rl.question("Idade (ou ENTER): ")).trim();
  const idade = idadeStr ? Number(idadeStr) : null;
  const identidade_genero = (await rl.question("Identidade de gênero (feminina, trans, nao-binario): ")).trim() || null;
  const tipo_violencia = (await rl.question("Tipo de violência (fisica, verbal, patrimonial, psicologica): ")).trim() || null;
  const estado = (await rl.question("Estado: ")).trim() || null;
  const cidade = (await rl.question("Cidade: ")).trim() || null;

  const novo = await usuarioRepository.create({
    email,
    senha,
    perfil: 'vitima',
    idade,
    identidade_genero,
    tipo_violencia,
    tipo_apoio: null,
    endereco: null,
    estado,
    cidade
  });

  console.log("✅ Vítima criada:", novo);
}

async function handleCreateRedeApoioUser() {
  console.log('\n--- Cadastro: Rede de Apoio (usuário) ---');
  const email = (await rl.question("Email: ")).trim() || null;
  const senha = (await rl.question("Senha: ")).trim() || null;
  const tipo_apoio = (await rl.question("Tipo de apoio (ex: psicologico, juridico): ")).trim() || null;
  const endereco = (await rl.question("Endereço: ")).trim() || null;
  const telefone = (await rl.question("Telefone: ")).trim() || null;
  const estado = (await rl.question("Estado: ")).trim() || null;
  const cidade = (await rl.question("Cidade: ")).trim() || null;

  const novo = await usuarioRepository.create({
    email,
    senha,
    perfil: 'rede_apoio',
    idade: null,
    identidade_genero: null,
    tipo_violencia: null,
    tipo_apoio,
    endereco,
    estado,
    cidade
  });

  await redeApoioRepository.create(
    novo.id_usuario,
    novo.email ?? 'Contato sem nome',
    tipo_apoio,
    endereco,
    telefone || null,
    null,
    null
  );

  console.log("✅ Usuário Rede de Apoio criado:", novo);
}

async function handleCreateAdmin() {
  console.log('\n--- Cadastro: Administrador ---');
  const email = (await rl.question("Email: ")).trim() || null;
  const senha = (await rl.question("Senha: ")).trim() || null;

  const novo = await usuarioRepository.create({
    email,
    senha,
    perfil: 'admin',
    idade: null,
    identidade_genero: null,
    tipo_violencia: null,
    tipo_apoio: null,
    endereco: null,
    estado: null,
    cidade: null
  });

  console.log("✅ Administrador criado:", novo);
}

async function handleListUsers() {
  const users = await usuarioRepository.findAll();
  console.table(users);
}

/* ---------------- MATERIAL ---------------- */
async function handleCreateMaterial() {
  console.log('\n--- Cadastro: Material ---');
  const titulo = await rl.question("Título: ");
  const tipo = await rl.question("Tipo (link/texto/pdf): ");
  const linkInput = (await rl.question("Link (ou ENTER): ")).trim() || null;
  const descricao = (await rl.question("Descrição (ou ENTER): ")).trim() || null;
  const id_enviado_porStr = (await rl.question("ID do usuário que envia (ou ENTER): ")).trim();
  const id_enviado_por = id_enviado_porStr ? Number(id_enviado_porStr) : null;

  const novo = await materialRepository.create(titulo, tipo, linkInput, descricao, id_enviado_por);
  console.log("✅ Material criado:", novo);
}

async function handleListMaterials() {
  const materials = await materialRepository.findAll();
  console.table(materials);
}

/* ---------------- REDE DE APOIO ---------------- */
async function handleCreateRedeApoio() {
  console.log('\n--- Cadastro: Rede de Apoio (registro separado) ---');
  const id_usuarioStr = (await rl.question("ID do usuário vinculado (ou ENTER): ")).trim();
  const id_usuario = id_usuarioStr ? Number(id_usuarioStr) : null;
  const nome = await rl.question("Nome do serviço/organização: ");
  const tipo_apoio = (await rl.question("Tipo de apoio: "));
  const endereco = await rl.question("Endereço: ");
  const telefone = await rl.question("Telefone: ");
  const publico_alvo = await rl.question("Público-alvo: ");
  const descricao = await rl.question("Descrição: ");

  const novo = await redeApoioRepository.create(id_usuario, nome, tipo_apoio, endereco, telefone, publico_alvo, descricao);
  console.log("✅ Rede de apoio criada:", novo);
}

async function handleListRedeApoio() {
  const lista = await redeApoioRepository.findAll();
  console.table(lista);
}

/* ---------------- OCORRÊNCIA ---------------- */
async function handleCreateOcorrencia() {
  console.log('\n--- Cadastro: Ocorrência ---');
  const descricao = await rl.question("Descrição da ocorrência: ");
  const dataStr = (await rl.question("Data da ocorrência (YYYY-MM-DD) ou ENTER: ")).trim();
  const data_ocorrencia = dataStr || null;
  const status = (await rl.question("Status (ex: pendente, em andamento): ")).trim() || null;
  const id_usuarioStr = (await rl.question("ID do usuário (ou ENTER): ")).trim();
  const id_usuario = id_usuarioStr ? Number(id_usuarioStr) : null;
  const id_apoioStr = (await rl.question("ID do apoio vinculado (ou ENTER): ")).trim();
  const id_apoio = id_apoioStr ? Number(id_apoioStr) : null;

  const novo = await ocorrenciaRepository.create(descricao, data_ocorrencia, status, id_usuario, id_apoio);
  console.log("✅ Ocorrência criada:", novo);
}

async function handleListOcorrencias() {
  const lista = await ocorrenciaRepository.findAll();
  console.table(lista);
}

/* ---------------- FEEDBACK ---------------- */
async function handleCreateFeedback() {
  console.log('\n--- Enviar Feedback ---');
  const id_usuarioStr = (await rl.question("ID do usuário (ou ENTER para anônimo): ")).trim();
  const id_usuario = id_usuarioStr ? Number(id_usuarioStr) : null;
  const mensagem = await rl.question("Mensagem: ");

  const novo = await feedbackRepository.create(id_usuario, mensagem);
  console.log("✅ Feedback registrado:", novo);
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
    console.log("[1] Cadastrar Usuário");
    console.log("[2] Listar Usuários");
    console.log("[3] Cadastrar Material");
    console.log("[4] Listar Materiais");
    console.log("[5] Cadastrar Rede de Apoio (registro)");
    console.log("[6] Listar Rede de Apoio");
    console.log("[7] Cadastrar Ocorrência");
    console.log("[8] Listar Ocorrências");
    console.log("[9] Enviar Feedback");
    console.log("[10] Listar Feedbacks");
    console.log("[0] Sair");

    const choice = await rl.question("Opção: ");

    switch (choice) {
      case '1': await handleCreateVitima(); break;
      case '2': await handleCreateRedeApoioUser(); break;
      case '3': await handleCreateAdmin(); break;
      case '4': await handleListUsers(); break;
      case '5': await handleCreateMaterial(); break;
      case '6': await handleListMaterials(); break;
      case '7': await handleCreateRedeApoio(); break;
      case '8': await handleListRedeApoio(); break;
      case '9': await handleCreateOcorrencia(); break;
      case '10': await handleListOcorrencias(); break;
      case '11': await handleCreateFeedback(); break;
      case '12': await handleListFeedbacks(); break;
      case '0': running = false; break;
      default: console.log("Opção inválida."); break;
    }
  }
}

/* ---------------- INÍCIO ---------------- */
async function startApplication() {
  await runSchemaMigration();
  await showMenu();
  rl.close();
  pool.end();
}

startApplication();
