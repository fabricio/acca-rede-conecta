-- src/schema/init.sql
-- REDE CONECTA - Banco de Dados (login simples com usuario)

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(200) NOT NULL,
    idade INTEGER,
    identidade_genero VARCHAR(80),
    estado VARCHAR(80),
    cidade VARCHAR(120),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS material (
    id_material SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    titulo VARCHAR(120) NOT NULL,
    tipo VARCHAR(40) NOT NULL,
    link TEXT,
    descricao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rede_apoio (
    id_apoio SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    nome VARCHAR(120) NOT NULL,
    tipo_apoio VARCHAR(100),
    endereco VARCHAR(200),
    telefone VARCHAR(20),
    publico_alvo VARCHAR(120),
    descricao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ocorrencia (
    id_ocorrencia SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    descricao TEXT NOT NULL,
    data_ocorrencia DATE,
    status VARCHAR(50),
    id_apoio INTEGER REFERENCES rede_apoio(id_apoio) ON DELETE SET NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feedback (
    id_feedback SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
