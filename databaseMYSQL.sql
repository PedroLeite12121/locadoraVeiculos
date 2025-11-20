CREATE DATABASE db_locadora;
USE db_locadora;

CREATE TABLE tbl_cliente (
    idCliente INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    telefone VARCHAR(15) UNIQUE,
    email VARCHAR(50) UNIQUE,
    senha VARCHAR(255) NOT NULL,
    PRIMARY KEY(idCliente)
);


CREATE TABLE tbl_veiculo (
    idVeiculo INT NOT NULL AUTO_INCREMENT,
    modelo VARCHAR(50) NOT NULL,
    ano INT NOT NULL,
    kms INT NOT NULL,
    precoLocacao DECIMAL(10,2) NOT NULL,
    imagemUrl VARCHAR(255),
    PRIMARY KEY (idVeiculo)
);

CREATE TABLE tbl_locacao(
    idLocacao INT NOT NULL AUTO_INCREMENT,
    dataLocacao DATE NOT NULL,
    dataDevolucao DATE NOT NULL,
    idCliente INT NOT NULL,
    idVeiculo INT NOT NULL,
    PRIMARY KEY (idLocacao),
    FOREIGN KEY (idVeiculo) REFERENCES tbl_veiculo(idVeiculo),
    FOREIGN KEY (idCliente) REFERENCES tbl_cliente(idCliente)
);


INSERT INTO tbl_veiculo (modelo, ano, kms, precoLocacao, imagemURL)
VALUES 
('Toyota Corolla', 2020, '0', 180.00, 'https://media.istockphoto.com/id/1157655660/pt/foto/generic-red-suv-on-a-white-background-side-view.jpg?s=612x612&w=0&k=20&c=SwmLFK_KmRw0oQFCDscipI-N2gSj1PItzTkC69BdlpA='),
('Jeep', 2001, '0', 200.00, 'https://www.jeep.com.br//renegade/asset/versoes/sahara/jeep-renegade-sahara-carbon-black.webp'),
('SUV', 2012, '0', 120.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8tMFWRpKqlBGy72jrYEtfUVOa3vGtxW5MPg&s'),
('Ferrari', 2001, '0', 2000.00, 'https://www.webmotors.com.br/imagens/prod/348762/FERRARI_ROMA_3.9_V8_TURBO_GASOLINA_F1DCT_34876209043394051.webp')
