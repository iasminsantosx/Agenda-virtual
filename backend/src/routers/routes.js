const express = require('express');
const { cadastrarUsuario } = require("../controllers/usuario");
const { agendar, excluiAgendamento, editarAgendamento, listarAgendamentosPorUsuario, listarAgendamentosPorData } = require("../controllers/agenda");
const login = require("../controllers/login");

const loginAutenticacao = require("../middleware/loginAutenticacao");
const validarRequisicao = require("../middleware/validarRequisicao");

const loginSchema = require("../schema/loginSchema");
const usuarioSchema = require("../schema/usuarioSchema")
const agendaSchema = require("../schema/agendaSchema");

const router = express();

router.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
router.post("/login", validarRequisicao(loginSchema), login);

router.use(loginAutenticacao);

router.post("/agenda", validarRequisicao(agendaSchema),agendar);
router.put("/agenda/:id",editarAgendamento);
router.delete("/agenda/:id", excluiAgendamento);
router.get("/agenda-usuario/:usuario_id",listarAgendamentosPorUsuario);
router.get("/agenda-data/:usuario_id",listarAgendamentosPorData);


module.exports = router;