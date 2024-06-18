import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function cadastrarUsuarioService(registerPayload) {
  const URL = `${BASE_URL}/usuario`;
  const response = await axios.post(URL, registerPayload);
  return response;
}

async function editarUsuariosService(id,dados) {
  const URL = `${BASE_URL}/usuario/${id}`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.put(URL,dados,{
          headers: {
          'Authorization': `Bearer ${token}`,
          }
      });
    return response;
  } catch (error) {
    // Lide com erros aqui
    console.error('Erro na requisição:', error);
    throw error;
  }
}

async function excluiUsuariosService(id) {

  const URL = `${BASE_URL}/usuario/${id}`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.delete(URL,{
          headers: {
          'Authorization': `Bearer ${token}`,
          }
      });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

async function listagemUsuarioervice(id) {

  
  const URL = `${BASE_URL}/usuario/${id}`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.get(URL,{
          headers: {
          'Authorization': `Bearer ${token}`,
          }
      });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export {
  cadastrarUsuarioService,
  editarUsuariosService,
  excluiUsuariosService,
  listagemUsuarioervice,
}