import axios from "axios";
import BASE_URL from "../constants/base_url";

async function agendarService(agendarPayload: {}) {
  const URL = `${BASE_URL}/agenda`;
  const token = localStorage.getItem("token");

  const response = await axios.post(URL, agendarPayload, {
    headers: {
      Authorization: `Bearer ${token}`, // Adicione o token ao cabeçalho de autorização
    },
  });

  return response;
}

async function listagemAgendamentosService(usuario_id: number) {
  const URL = `${BASE_URL}/agenda-usuario/${usuario_id}`;

  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function listagemAgendamentosDataService(
  usuario_id: number,
  Data: string
) {
  const URL = `${BASE_URL}/agenda-data/${usuario_id}`;

  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        data: Data,
      },
    });
    return response;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export {
  listagemAgendamentosService,
  listagemAgendamentosDataService,
  agendarService,
};
