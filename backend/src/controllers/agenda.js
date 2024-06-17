const knex = require("../database/conexao");
require("dotenv").config();

const agendar = async (req, res) => {


    const { data_evento, descricao, hora_inicio, hora_termino, usuario_id } = req.body;

  
    try {

      const usuario = await knex('usuario').select("*").where('id', usuario_id).first();

      if (usuario) {
        return res.status(400).json({ mensagem: "Usuario não encontrado." });
      }

      const usuarioId = parseInt(usuario.id, 10);
      
      const horario = await knex("agenda")
      .select("*")
      .where("usuario_id", usuarioId)
      .where("data_evento", data_evento)
      .andWhere(builder => {
        builder.where(function () {
          this.where("hora_inicio", ">=", hora_inicio)
            .andWhere("hora_inicio", "<=", hora_termino);
        }).orWhere(function () {
          this.where("hora_inicio", "<=", hora_inicio)
            .andWhere("hora_termino", ">=", hora_inicio);
        });
      })
      .first();
      
      if(horario){
        return res.status(400).json({ mensagem: "Horário ocupado." });
      }
      const agendamento = await knex("agenda")
        .insert({
            data_evento, 
            descricao, 
            hora_inicio, 
            hora_termino, 
            usuario_id
        })
        .returning("*");
  
      
      return res.status(201).json(agendamento);
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const excluiAgendamento = async (req, res) => {

    const { id } = req.params;
    try {
      const agendamento = await knex("agenda")
        .select("*")
        .where({ id })
        .first();
  
      if (!agendamento) {
        return res
          .status(400)
          .json({ mensagem: "Este evento ainda não foi cadastrado" });
      }
  
      const agendamentoExcluido = await knex("agendamento").where({ id }).del();
  
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const editarAgendamento = async (req, res) => {
  const { id } = req.params;

  const { data_evento, descricao, hora_inicio, hora_termino } = req.body;

  try {

    let horaInicio;
    let horaTermino;

    const agendamentoAtual = await knex('agenda').select("*").where({ id }).first();

    if(agendamentoAtual){
        return res.status(404).json({mensagem: "Evento não encontrado."})
    };

    const usuario = await knex("usuario").where({ id: agendamentoAtual.usuario_id }).first();

    if(!hora_inicio){
      horaInicio = agendamentoAtual.hora_inicio;
    }else{
      horaInicio = hora_inicio;
    }

    if(!hora_termino){
      horaTermino = agendamentoAtual.hora_termino;
    }else{
      horaTermino = hora_termino;
    }
    

    const horario = await knex("agenda")
      .select("*")
      .where("usuario_id", usuario.id)
      .where("data_evento", data_evento)
      .andWhere(builder => {
        builder.where(function () {
          this.where("hora_inicio", ">=", horaInicio)
            .andWhere("hora_inicio", "<=", horaTermino);
        }).orWhere(function () {
          this.where("hora_inicio", "<=", horaInicio)
            .andWhere("hora_termino", ">=", horaInicio);
        });
      })
      .first();

    if (horario) {
      return res.status(400).json({ mensagem: "Horário ocupado." });
    }

    // Cria um objeto com os dados não nulos ou vazios
    const dadosAtualizados = {
      usuario_id: usuario.id,
      descricao,
      data_evento,
      hora_inicio,
      hora_termino
    };

    // Remove propriedades com valores nulos ou vazios
    Object.keys(dadosAtualizados).forEach((key) => (dadosAtualizados[key] == null || dadosAtualizados[key] === '') && delete dadosAtualizados[key]);

    // Verifica se há dados para serem atualizados
    if (Object.keys(dadosAtualizados).length === 0) {
      return res.status(400).json({ mensagem: "Nenhum dado válido para atualização fornecido." });
    }

    const agendamento = await knex("agenda")
      .update(dadosAtualizados)
      .where("id", id)
      .returning("*");

    return res.status(200).json(agendamento);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


const listarAgendamentosPorUsuario = async (req, res) => {

  const { usuario_id } = req.params;
  try {

    const agendamento = await knex("agenda").select("*").where({usuario_id});

    return res.status(200).json(agendamento);
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarAgendamentosPorData = async (req, res) => {

  const { usuario_id } = req.params;

  const { data } = req.query;
  try {

      const agendamento = await knex("agenda").select("*")
      .where({usuario_id})
      .andWhere("data_evento",data)
      .orderBy("hora_inicio", "asc");
      
      return res.status(200).json(agendamento);
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


module.exports = {
    agendar,
    excluiAgendamento,
    editarAgendamento,
    listarAgendamentosPorUsuario,
    listarAgendamentosPorData
};