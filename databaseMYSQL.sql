CREATE DATABASE db_locadora; 
USE db_locadora;

CREATE TABLE tbl_cliente (
    idCliente INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30),
    telefone VARCHAR(15) UNIQUE,
    email VARCHAR(50) UNIQUE,
    senha VARCHAR(255),
    PRIMARY KEY(idCliente)
);

CREATE TABLE tbl_locacao(
    idLocacao INT NOT NULL AUTO_INCREMENT,
    dataLocacao DATE,
    dataDevolucao DATE,
    idCliente INT,
    PRIMARY KEY (idLocacao),
    FOREIGN KEY (idCliente) REFERENCES tbl_cliente(idCliente)
);

CREATE TABLE tbl_veiculo (
    idVeiculo INT NOT NULL AUTO_INCREMENT,
    modelo VARCHAR(50),
    ano INT,
    kms INT,
    precoLocacao FLOAT,
    imagemUrl VARCHAR(255),
    idLocacao INT,
    PRIMARY KEY (idVeiculo),
    FOREIGN KEY (idLocacao) REFERENCES tbl_locacao(idLocacao)
);

INSERT INTO tbl_veiculo (modelo, ano, kms, precoLocacao, imagemURL)
VALUES 
('Toyota Corolla', 2020, '0', 180.00, 'https://media.istockphoto.com/id/1157655660/pt/foto/generic-red-suv-on-a-white-background-side-view.jpg?s=612x612&w=0&k=20&c=SwmLFK_KmRw0oQFCDscipI-N2gSj1PItzTkC69BdlpA='),
('Jeep', 2001, '0', 200.00, 'https://www.jeep.com.br//renegade/asset/versoes/sahara/jeep-renegade-sahara-carbon-black.webp')
('SUV', 2012, '0', 120.00, 'https://pemavel.com.br/wp-content/uploads/2024/08/imagick_convert.webp'),
('Ferrari', 2001, '0', 2000.00, 'https://s2-oglobo.glbimg.com/W8JPalZuWuH3XMlLmLfPOqdsXEc=/0x0:1536x864/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2025/l/D/oO98jYQfuueFbrw2k0hg/ferrari-presents-the-f76-02-1536x864.jpg')



