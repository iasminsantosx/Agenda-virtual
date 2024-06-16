const joi = require("joi");

const agendaSchema = joi.object({
  usuario_id: joi.number().required().messages({
    "any.required": "usuario_id é obrigatório.",
  }),
  data_evento: joi.string().min(8).required().messages({
    "string.empty": "Data do evento é obrigatória.",
    "any.required": "Data do evento é obrigatória.",
  }),
  hora_inicio: joi.string().required().messages({
    "string.empty": "Hora do serviço é obrigatória.",
    "any.required": "Hora do serviço é obrigatória.",
  }),
  hora_termino: joi.string().allow('').optional(),
  descricao: joi.string().allow('').optional()
});

module.exports = agendaSchema;