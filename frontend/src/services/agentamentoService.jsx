import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function agendarService(agendarPayload) {
  const URL = `${BASE_URL}/agenda`;
  const token = localStorage.getItem('token');
  const response = await axios.post(URL, agendarPayload, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  });

  return response;
}
async function listagemAgendamentosService(usuario_id) {
    const URL = `${BASE_URL}/agenda-usuario/${usuario_id}`;
  
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

async function excluiAgendamentosService(id) {

    const URL = `${BASE_URL}/agenda/${id}`;
  
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


async function editaAgendamentosService(id, dados) {

  const URL = `${BASE_URL}/agenda/${id}`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.put(URL,dados,{
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

async function listagemAgendamentosDataService(Data,usuario_id) {

  const URL = `${BASE_URL}/agenda-data/${usuario_id}`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.get(URL,{
          headers: {
          'Authorization': `Bearer ${token}`,
          },
          params: {
            data: Data
        }
      });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}


export {
    listagemAgendamentosService,
    excluiAgendamentosService,
    editaAgendamentosService,
    listagemAgendamentosDataService,
    agendarService   
}