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

const editarUsuario = async (req, res) => {
  const { id } = req.params;

  const { nome, email, senha } = req.body;

  try {
    const emailExiste = await knex('usuario').select('*').where('email', email).whereNot('id', id);

    if (emailExiste.length > 0) {
      return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." });
    }

    const senhaCriptografada = senha ? await bcrypt.hash(senha, 10) : undefined;

    // Cria um objeto com os dados não nulos ou vazios
    const dadosAtualizados = {
      nome,
      email,
      senha: senhaCriptografada
    };

    // Remove propriedades com valores nulos ou vazios
    Object.keys(dadosAtualizados).forEach((key) => (dadosAtualizados[key] == null || dadosAtualizados[key] === '') && delete dadosAtualizados[key]);

    // Verifica se há dados para serem atualizados
    if (Object.keys(dadosAtualizados).length === 0) {
      return res.status(400).json({ mensagem: "Nenhum dado válido para atualização fornecido." });
    }

    const usr = await knex("usuario")
      .update(dadosAtualizados)
      .where("id", id)
      .returning("*");

    delete usr[0].senha;

    return res.status(200).json(usr);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluiUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex("usuario")
      .select("*")
      .where({ id })
      .first();

    if (!produto) {
      return res
        .status(400)
        .json({ mensagem: "Este usuario ainda não foi cadastrado" });
    }

    const clienteExcluido = await knex("usuario").where({ id }).del();

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await knex("usuario").select("*")

    return res.status(200).json(usuarios);
  
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


const listarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await knex("usuario")
      .select("*")
      .where({ id })
      .first();

    if (!usuario) {
      return res
        .status(400)
        .json({ mensagem: "Este usuario ainda não foi cadastrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  editarUsuario,
  cadastrarUsuario,
  excluiUsuario,
  listarUsuarios,
  listarUsuario
};