const express = require('express');
const { editarUsuario, cadastrarUsuario, excluiUsuario, listarUsuarios, listarUsuario } = require("../controllers/usuario");
const { agendar, excluiAgendamento, editarAgendamento, listarAgendamentosPorUsuario } = require("../controllers/agenda");
const login = require("../controllers/login");

const loginAutenticacao = require("../middleware/loginAutenticacao");
const validarRequisicao = require("../middleware/validarRequisicao");

const loginSchema = require("../schema/loginSchema");
const usuarioSchema = require("../schema/usuarioSchema")

const router = express();

router.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
router.post("/login", validarRequisicao(loginSchema), login);

router.use(loginAutenticacao);

router.post("/agenda", validarRequisicao(agendamentoSchema),agendar);
router.put("/agenda/:id",editarAgendamento);
router.delete("/agenda/:id", excluiAgendamento);
router.get("/agenda;usuario/:usuario_id",listarAgendamentosPorUsuario);