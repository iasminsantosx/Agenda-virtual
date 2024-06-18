import axios from "axios";
import BASE_URL from "../constants/base_url";

async function cadastroUsuarioService(dados: {}) {
  const URL = `${BASE_URL}/usuario`;
  const response = await axios.post(URL, dados);
  return response;
}

export { cadastroUsuarioService };
