CREATE DATABASE agendadb;

CREATE TABLE usuario (
	id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
);

CREATE TABLE agenda(
	id SERIAL PRIMARY KEY,
    data_evento  VARCHAR(10) NOT NULL,
    descricao TEXT,
    hora_inicio TIME NOT NULL,
    hora_termino TIME,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);


