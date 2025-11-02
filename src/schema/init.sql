-- Tabela principa lde usuários (vítimas, rede de apoio, administradores)
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(120),           -- pode ser NULL para cadastro anônimo
    senha VARCHAR(255),           -- pode ser NULL para cadastro anônimo
    perfil VARCHAR(50) NOT NULL,  -- 'vitima', 'rede_apoio', 'admin'
    idade INTEGER,
    sexo VARCHAR(20),
    tipo_violencia VARCHAR(100),
    tipo_apoio VARCHAR(100),
    endereco VARCHAR(200),
    estado VARCHAR(80),
    cidade VARCHAR(120),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rede de apoio (pontos/organizações/profissionais)
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

-- Biblioteca de materiais (links/textos)
CREATE TABLE IF NOT EXISTS material (
    id_material SERIAL PRIMARY KEY,
    titulo VARCHAR(120) NOT NULL,
    tipo VARCHAR(40) NOT NULL, -- ex: 'link','texto','pdf'
    link TEXT,
    descricao TEXT,
    id_enviado_por INTEGER REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ocorrências / denúncias (anonimizadas quando necessário)
CREATE TABLE IF NOT EXISTS ocorrencia (
    id_ocorrencia SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    data_ocorrencia DATE,
    status VARCHAR(50),
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    id_apoio INTEGER REFERENCES rede_apoio(id_apoio) ON DELETE SET NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback / sugestões
CREATE TABLE IF NOT EXISTS feedback (
    id_feedback SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
