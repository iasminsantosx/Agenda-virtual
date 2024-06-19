import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function cadastrarUsuarioService(registerPayload) {
  const URL = `${BASE_URL}/usuario`;
  const response = await axios.post(URL, registerPayload);
  return response;
}

export {
  cadastrarUsuarioService
}