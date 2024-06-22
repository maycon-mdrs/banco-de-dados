-- Inserir dados na tabela Pessoa
INSERT INTO Pessoa (cpf, nome, telefone, email, password) VALUES 
('12345678901', 'João Silva', '11987654321', 'joao.silva@example.com', 'MD5("password123")'),
('23456789012', 'Maria Oliveira', '21987654321', 'maria.oliveira@example.com', 'MD5("123")'),
('34567890123', 'Carlos Pereira', '31987654321', 'carlos.pereira@example.com', 'MD5("1234")');

-- Inserir dados na tabela Endereco
INSERT INTO Endereco (endereco, pessoa_cpf, cep, rua, numero, cidade) VALUES 
('Avenida Paulista, 1000', '12345678901', '01310000', 'Avenida Paulista', '1000', 'São Paulo'),
('Rua das Flores, 500', '23456789012', '22041001', 'Rua das Flores', '500', 'Rio de Janeiro'),
('Praça Sete de Setembro, 300', '34567890123', '30180000', 'Praça Sete de Setembro', '300', 'Belo Horizonte');

-- Inserir dados na tabela Funcionario
INSERT INTO Funcionario (pessoa_cpf) VALUES 
('12345678901'),
('23456789012');

-- Inserir dados na tabela Gerente
INSERT INTO Gerente (funcionario_pessoa_cpf) VALUES 
('12345678901');

-- Inserir dados na tabela Motorista
INSERT INTO Motorista (funcionario_pessoa_cpf, status_disponibilidade) VALUES 
('23456789012', TRUE);

-- Inserir dados na tabela Locatario
INSERT INTO Locatario (pessoa_cpf) VALUES 
('34567890123');

-- Inserir dados na tabela CategoriaVeiculo
INSERT INTO CategoriaVeiculo (tipo_categoria, tipo_veiculo, quant_passageiros, quant_bagagens) VALUES 
('SUV', 'Carro', 5, 3),
('Sedan', 'Carro', 5, 2),
('Hatch', 'Carro', 5, 1);

-- Inserir dados na tabela Veiculo
INSERT INTO Veiculo (codigo, pais, estado, cidade, disponibilidade, categoria_veiculo_tipo_categoria) VALUES 
('ABC1234', 'Brasil', 'São Paulo', 'São Paulo', TRUE, 'SUV'),
('DEF5678', 'Brasil', 'Rio de Janeiro', 'Rio de Janeiro', TRUE, 'Sedan'),
('GHI9101', 'Brasil', 'Minas Gerais', 'Belo Horizonte', TRUE, 'Hatch');

-- Inserir dados na tabela Preco
INSERT INTO Preco (data, multa_hora, preco_dia, categoria_veiculo_tipo_categoria) VALUES 
('2023-01-01 00:00:00', 50.0, 200.0, 'SUV'),
('2023-01-01 00:00:00', 30.0, 150.0, 'Sedan'),
('2023-01-01 00:00:00', 20.0, 100.0, 'Hatch');

-- Inserir dados na tabela Reserva
INSERT INTO Reserva (valor_multa, valor_seguro, valor_categoria, valor_desconto, data_hora_retirada, data_hora_devolucao, data_hora_devolucao_efetiva, status, tem_motorista, veiculo_codigo, motorista_funcionario_pessoa_cpf, locatario_pessoa_cpf) VALUES 
(100.0, 50.0, 200.0, 20.0, '2023-06-01 10:00:00', '2023-06-10 10:00:00', NULL, 'Confirmada', TRUE, 'ABC1234', '23456789012', '34567890123'),
(60.0, 30.0, 150.0, 10.0, '2023-07-01 10:00:00', '2023-07-05 10:00:00', NULL, 'Confirmada', FALSE, 'DEF5678', NULL, '34567890123');

-- Inserir dados na tabela SeguroLocacao
INSERT INTO SeguroLocacao (codigo_seguro, descricao, tipo_seguro, valor_dia, locatario_pessoa_cpf) VALUES 
(1, 'Seguro contra terceiros', 'Básico', 20.0, '34567890123'),
(2, 'Seguro completo', 'Premium', 50.0, '34567890123');

-- Inserir dados na tabela SeguroLocacao_has_Reserva
INSERT INTO SeguroLocacao_has_Reserva (seguro_locacao_codigo_seguro, reserva_idreserva) VALUES 
(1, 1),
(2, 2);

-- Inserir dados na tabela Plano
INSERT INTO Plano (id_plano, valor, locatario_pessoa_cpf) VALUES 
(1, 100.0, '34567890123');

-- Inserir dados na tabela Beneficio
INSERT INTO Beneficio (beneficio, plano_id_plano) VALUES 
('Desconto em aluguel', 1),
('Prioridade no atendimento', 1);
