import pool from './database/db';
import * as fs from 'fs/promises';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { randomUUID } from 'crypto';
import { materialRepository } from './repositories/MaterialRepository';
import { redeApoioRepository } from './repositories/RedeApoioRepository';
import { ocorrenciaRepository } from './repositories/OcorrenciaRepository';
import { feedbackRepository } from './repositories/FeedbackRepository';
import { vitimaRepository } from './repositories/VitimaRepository';


const INIT_SCHEMA_PATH = './src/schema/init.sql';
const rl = readline.createInterface({ input, output });

let sessao_id = randomUUID(); // 🔹 Gera ID de sessão único

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

/* ---------------- MATERIAL ---------------- */
async function handleCreateMaterial() {
  console.log('\n--- Cadastro: Material ---');
  const titulo = await rl.question("Título: ");
  const tipo = await rl.question("Tipo (link/texto/pdf): ");
  const link = (await rl.question("Link (ou ENTER): ")).trim() || null;
  const descricao = (await rl.question("Descrição (ou ENTER): ")).trim() || null;

  const novo = await materialRepository.create(sessao_id, titulo, tipo, link, descricao);
  console.log("✅ Material criado:", novo);
}

async function handleListMaterials() {
  const materials = await materialRepository.findAll();
  console.table(materials);
}
/* ---------------- DECLARAÇÃO DA VÍTIMA ---------------- */
async function handleCreateDeclaracaoVitima() {
  console.log('\n--- Cadastro: Informações da Vítima ---');
  const nome = (await rl.question("Nome (ou ENTER para manter anônimo): ")).trim() || null;
  const contato = (await rl.question("Contato (telefone/email) (ou ENTER): ")).trim() || null;
  const idadeStr = (await rl.question("Idade (ou ENTER): ")).trim();
  const idade = idadeStr ? Number(idadeStr) : null;
  const identidade_genero = (await rl.question("Identidade de gênero (ou ENTER): ")).trim() || null;
  const tipo_violencia = (await rl.question("Tipo de violência (fisica, verbal, patrimonial, psicologica) (ou ENTER): ")).trim() || null;
  const resumo = (await rl.question("Resumo do ocorrido (ou ENTER): ")).trim() || null;
  const estado = (await rl.question("Estado (ex: SP, RJ): ")).trim() || null;
  const cidade = (await rl.question("Cidade: ")).trim() || null;
  const consentStr = (await rl.question("Autoriza contato para suporte? (sim/não): ")).trim().toLowerCase();
  const consentimento = consentStr === 'sim' || consentStr === 's';

  const novo = await vitimaRepository.create({
    sessao_id,
    nome,
    contato,
    idade,
    identidade_genero,
    tipo_violencia,
    resumo,
    estado,
    cidade,
    consentimento
  });

  console.log("✅ Informações registradas (ID):", novo.id_declaracao);
}


async function handleListDeclaracoes() {
  const lista = await vitimaRepository.findAll();
  console.table(lista);
}

/* ---------------- REDE DE APOIO ---------------- */
async function handleCreateRedeApoio() {
  console.log('\n--- Cadastro: Rede de Apoio ---');
  const nome = await rl.question("Nome: ");
  const tipo_apoio = await rl.question("Tipo de apoio: ");
  const endereco = await rl.question("Endereço: ");
  const telefone = await rl.question("Telefone: ");
  const publico_alvo = await rl.question("Público-alvo: ");
  const descricao = await rl.question("Descrição: ");

  const novo = await redeApoioRepository.create(sessao_id, nome, tipo_apoio, endereco, telefone, publico_alvo, descricao);
  console.log("✅ Rede de Apoio cadastrada:", novo);
}

async function handleListRedeApoio() {
  const lista = await redeApoioRepository.findAll();
  console.table(lista);
}

/* ---------------- OCORRÊNCIA ---------------- */
async function handleCreateOcorrencia() {
  console.log('\n--- Cadastro: Ocorrência ---');
  const descricao = await rl.question("Descrição: ");
  const data_ocorrencia = await rl.question("Data (YYYY-MM-DD ou ENTER): ");
  const status = await rl.question("Status (ex: pendente, resolvida): ");
  const id_apoioStr = (await rl.question("ID de apoio (ou ENTER): ")).trim();
  const id_apoio = id_apoioStr ? Number(id_apoioStr) : null;

  const novo = await ocorrenciaRepository.create(sessao_id, descricao, data_ocorrencia || null, status || null, id_apoio);
  console.log("✅ Ocorrência criada:", novo);
}

async function handleListOcorrencias() {
  const lista = await ocorrenciaRepository.findAll();
  console.table(lista);
}

/* ---------------- FEEDBACK ---------------- */
async function handleCreateFeedback() {
  console.log('\n--- Enviar Feedback ---');
  const mensagem = await rl.question("Mensagem: ");
  const novo = await feedbackRepository.create(sessao_id, mensagem);
  console.log("✅ Feedback enviado:", novo);
}

async function handleListFeedbacks() {
  const lista = await feedbackRepository.findAll();
  console.table(lista);
}

/* ---------------- MENU ---------------- */
async function showMenu() {
  console.log(`\nSessão atual: ${sessao_id}`);
  let running = true;
  while (running) {
    console.log("\n--- MENU REDE CONECTA ---");
    console.log("[1] Cadastrar Informações da Vítima");
    console.log("[2] Listar Materiais");
    console.log("[3] Cadastrar Rede de Apoio");
    console.log("[4] Listar Rede de Apoio");
    console.log("[5] Cadastrar Ocorrência");
    console.log("[6] Listar Ocorrências");
    console.log("[7] Enviar Feedback");
    console.log("[8] Listar Feedbacks");
    console.log("[9] Cadastrar Material");
    console.log("[10] Listar Declarações da Vítima");
    console.log("[0] Sair");

    const choice = await rl.question("Opção: ");

    switch (choice) {
      case '1': await handleCreateDeclaracaoVitima(); break;
      case '2': await handleCreateMaterial(); break;
      case '3': await handleListMaterials(); break;
      case '4': await handleCreateRedeApoio(); break;
      case '5': await handleListRedeApoio(); break;
      case '6': await handleCreateOcorrencia(); break;
      case '7': await handleListOcorrencias(); break;
      case '8': await handleCreateFeedback(); break;
      case '9': await handleListFeedbacks(); break;
      case '10': await handleListDeclaracoes(); break;
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
