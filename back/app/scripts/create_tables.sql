CREATE TABLE Pessoa (
    cpf VARCHAR(11) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Endereco (
    endereco VARCHAR(255) NOT NULL,
    pessoa_cpf VARCHAR(11) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    rua VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    PRIMARY KEY (endereco, pessoa_cpf),
    FOREIGN KEY (pessoa_cpf) REFERENCES Pessoa(cpf)
);

CREATE TABLE Funcionario (
    pessoa_cpf VARCHAR(11) PRIMARY KEY,
    FOREIGN KEY (pessoa_cpf) REFERENCES Pessoa(cpf)
);

CREATE TABLE Gerente (
    funcionario_pessoa_cpf VARCHAR(11) PRIMARY KEY,
    FOREIGN KEY (funcionario_pessoa_cpf) REFERENCES Funcionario(pessoa_cpf)
);

CREATE TABLE Motorista (
    funcionario_pessoa_cpf VARCHAR(11) PRIMARY KEY,
    status_disponibilidade BOOLEAN NOT NULL,
    FOREIGN KEY (funcionario_pessoa_cpf) REFERENCES Funcionario(pessoa_cpf)
);

CREATE TABLE Locatario (
    pessoa_cpf VARCHAR(11) PRIMARY KEY,
    FOREIGN KEY (pessoa_cpf) REFERENCES Pessoa(cpf)
);

CREATE TABLE CategoriaVeiculo (
    tipo_categoria VARCHAR(50) PRIMARY KEY,
    tipo_veiculo VARCHAR(50) NOT NULL,
    quant_passageiros INT NOT NULL,
    quant_bagagens INT NOT NULL
);

CREATE TABLE Veiculo (
    codigo VARCHAR(50) PRIMARY KEY,
    pais VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    disponibilidade BOOLEAN NOT NULL,
    categoria_veiculo_tipo_categoria VARCHAR(50) NOT NULL,
    FOREIGN KEY (categoria_veiculo_tipo_categoria) REFERENCES CategoriaVeiculo(tipo_categoria)
);

CREATE TABLE Preco (
    data DATETIME NOT NULL,
    multa_hora FLOAT NOT NULL,
    preco_dia FLOAT NOT NULL,
    categoria_veiculo_tipo_categoria VARCHAR(50) NOT NULL,
    PRIMARY KEY (data, categoria_veiculo_tipo_categoria),
    FOREIGN KEY (categoria_veiculo_tipo_categoria) REFERENCES CategoriaVeiculo(tipo_categoria)
);

CREATE TABLE Reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    valor_multa FLOAT NOT NULL,
    valor_seguro FLOAT NOT NULL,
    valor_categoria FLOAT NOT NULL,
    valor_desconto FLOAT NOT NULL,
    data_hora_retirada DATETIME NOT NULL,
    data_hora_devolucao DATETIME NOT NULL,
    data_hora_devolucao_efetiva DATETIME,
    status VARCHAR(50) NOT NULL,
    tem_motorista BOOLEAN NOT NULL,
    veiculo_codigo VARCHAR(50) NOT NULL,
    motorista_funcionario_pessoa_cpf VARCHAR(11),
    locatario_pessoa_cpf VARCHAR(11) NOT NULL,
    FOREIGN KEY (veiculo_codigo) REFERENCES Veiculo(codigo),
    FOREIGN KEY (motorista_funcionario_pessoa_cpf) REFERENCES Motorista(funcionario_pessoa_cpf),
    FOREIGN KEY (locatario_pessoa_cpf) REFERENCES Locatario(pessoa_cpf)
);

CREATE TABLE SeguroLocacao (
    codigo_seguro INT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    tipo_seguro VARCHAR(50) NOT NULL,
    valor_dia FLOAT NOT NULL,
    locatario_pessoa_cpf VARCHAR(11),
    FOREIGN KEY (locatario_pessoa_cpf) REFERENCES Locatario(pessoa_cpf)
);

CREATE TABLE SeguroLocacao_has_Reserva (
    seguro_locacao_codigo_seguro INT NOT NULL,
    reserva_idreserva INT NOT NULL,
    PRIMARY KEY (seguro_locacao_codigo_seguro, reserva_idreserva),
    FOREIGN KEY (seguro_locacao_codigo_seguro) REFERENCES SeguroLocacao(codigo_seguro),
    FOREIGN KEY (reserva_idreserva) REFERENCES Reserva(id_reserva)
);

CREATE TABLE Plano (
    id_plano INT PRIMARY KEY,
    valor FLOAT NOT NULL,
    locatario_pessoa_cpf VARCHAR(11) NOT NULL,
    FOREIGN KEY (locatario_pessoa_cpf) REFERENCES Locatario(pessoa_cpf)
);

CREATE TABLE Beneficio (
    beneficio VARCHAR(255) NOT NULL,
    plano_id_plano INT NOT NULL,
    PRIMARY KEY (beneficio, plano_id_plano),
    FOREIGN KEY (plano_id_plano) REFERENCES Plano(id_plano)
);
