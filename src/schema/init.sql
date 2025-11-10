-- =============================================
-- REDE CONECTA - Banco de Dados Refatorado (sem login)
-- =============================================

-- Cada execução do sistema gera um sessao_id único (UUID)
-- Todas as informações são associadas a essa sessão, não a um usuário.

-- -----------------------------
-- MATERIAL
-- -----------------------------
CREATE TABLE IF NOT EXISTS material (
    id_material SERIAL PRIMARY KEY,
    sessao_id VARCHAR(50) NOT NULL,
    titulo VARCHAR(120) NOT NULL,
    tipo VARCHAR(40) NOT NULL, -- ex: 'link','texto','pdf'
    link TEXT,
    descricao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------
-- REDE DE APOIO
-- -----------------------------
CREATE TABLE IF NOT EXISTS rede_apoio (
    id_apoio SERIAL PRIMARY KEY,
    sessao_id VARCHAR(50) NOT NULL,
    nome VARCHAR(120) NOT NULL,
    tipo_apoio VARCHAR(100),
    endereco VARCHAR(200),
    telefone VARCHAR(20),
    publico_alvo VARCHAR(120),
    descricao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------
-- OCORRÊNCIA
-- -----------------------------
CREATE TABLE IF NOT EXISTS ocorrencia (
    id_ocorrencia SERIAL PRIMARY KEY,
    sessao_id VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    data_ocorrencia DATE,
    status VARCHAR(50),
    id_apoio INTEGER REFERENCES rede_apoio(id_apoio) ON DELETE SET NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------
-- FEEDBACK
-- -----------------------------
CREATE TABLE IF NOT EXISTS feedback (
    id_feedback SERIAL PRIMARY KEY,
    sessao_id VARCHAR(50) NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Informações fornecidas pela vítima (vinculadas à sessão anônima)
CREATE TABLE IF NOT EXISTS declaracao_vitima (
    id_declaracao SERIAL PRIMARY KEY,
    sessao_id VARCHAR(50) NOT NULL,
    nome VARCHAR(150),               -- opcional: pode ser NULL (anonimato)
    contato VARCHAR(120),            -- opcional: telefone/email
    idade INTEGER,
    identidade_genero VARCHAR(80),
    tipo_violencia VARCHAR(120),
    resumo TEXT,                     -- descrição livre do ocorrido
    estado VARCHAR(80),
    cidade VARCHAR(120),
    consentimento BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
