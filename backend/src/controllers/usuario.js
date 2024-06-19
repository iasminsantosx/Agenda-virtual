const knex = require("../database/conexao");
const bcrypt = require("bcrypt");
require("dotenv").config();

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;


  try {
    const usuarioEncontrado = await knex("usuario").where({ email }).first();

    if (usuarioEncontrado) {
      return res.status(400).json({
        mensagem: "O e-mail informado já está sendo utilizado por outro usuário."
      });
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuario")
      .insert({
        nome,
        email,
        senha: senhaCriptografada
      })
      .returning("*");

    const { senha: _, ...usuarioCadastrado } = usuario[0];

    return res.status(201).json(usuarioCadastrado);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


module.exports = {
  cadastrarUsuario
};