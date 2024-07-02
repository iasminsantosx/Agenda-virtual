import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import { useContext, useState, useEffect } from 'react';
import { listagemAgendamentosService, excluiAgendamentosService, listagemAgendamentosDataService } from '../../services/agentamentoService'
import { MdEdit, MdDelete } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from '../../utils/Toastify';
import { Box, FormControl, HStack, Button,Input, Text } from "@chakra-ui/react";
import "./styles.css";

export function Agendamentos (){

 //--------------------------------------- Consts -------------------------------------------------------------------
 const history = useHistory();

 const { user } = useContext(UserContext);

 const [agendamentos, setAgendamentos] = useState([]);
 const [isDisable, setIsDisable] = useState(false);
 const [Data, setData] = useState("");
 //const [flexHeight, setFlexHeight] = useState(100);

//--------------------------------------------------- Handles -------------------------------------------------------
 const handleDelete = async (id) =>{
   try {
     const response = await excluiAgendamentosService(id);

     showToastSuccess("Excluiu agendamento com sucesso.");

     await fetchAgendamentos();

   } catch(error) {
     const messageError = error.response.data.mensagem;

     showToastError(messageError)

     console.log(error);
   }
 }

 const handleEditar = (id) => {
   history.push(`/editar-agendamento/${id}`);
 };

 const handleAgendamentoPorData = async (event) => {
    event.preventDefault();
    const dataFormatada = formatarDataBrasileira(Data);
    setIsDisable(true);
    try {
      const response = await listagemAgendamentosDataService(dataFormatada,user.id);

      const agendamento = response.data.map(ag => ({
        id:ag.id,
        data_evento:ag.data_evento,
        hora_inicio: ag.hora_inicio,
        hora_termino: ag.hora_termino,
        descricao: ag.descricao,
      }));

      setAgendamentos(agendamento);
    } catch(error) {
      console.error(error);
    }
 }

 const handleAdmin = () => {
   history.push('/home')
 }

//------------------------------------------------------- Funções --------------------------------------------------------
 const formatarDataBrasileira = (data) => {
   const [ano, mes, dia] = data.split("-");
   return `${dia}/${mes}/${ano}`;
 };

//---------------------------------------------------- Use Effect ----------------------------------------------------------
 const fetchAgendamentos = async () => {
   try {
     const response = await listagemAgendamentosService(user.id);
     const agendamento = response.data.map(ag => ({
       id:ag.id,
       data_evento:ag.data_evento,
       hora_inicio: ag.hora_inicio,
       hora_termino: ag.hora_termino,
       descricao: ag.descricao,
     }));
     setAgendamentos(agendamento);
   } catch (error) {
     console.error(error);
   }
 };

 useEffect(() => {
   fetchAgendamentos();
 }, []); 

 if (!user) {
   history.push('/')
 }

    return(
        <div className="container">
          <header className="header">
            <span>Agenda</span>
            <button className="logout-button" onClick={handleAdmin}>Voltar</button>
          </header>
          <div className="content">
            <div className="card">
              <form className="form-control">
                <div className="box">
                  <label>Data:</label>
                  <input type="date" value={Data} onChange={(e) => setData(e.target.value)} />
                  <Button _hover={{ bg: "blue.600", color: "white"}} onClick={handleAgendamentoPorData}> Agendamentos Por Data</Button>
                </div>
                <ul className="agendamentos-list">
                  {agendamentos.map(agendamento => (
                    <div key={agendamento.id} className="agendamento-box">
                      <div className="agendamento-content">
                        <li>
                          <strong>Descrição:</strong> {agendamento.descricao} - 
                          <strong> Data:</strong> {agendamento.data_evento} -  
                          <strong> Horário Inicio:</strong> {agendamento.hora_inicio} - 
                          <strong> Horário Termino:</strong> {agendamento.hora_termino}
                        </li>
                        <button className="edit-button" onClick={() => handleEditar(agendamento.id)}><MdEdit/></button>
                        <button className="delete-button" onClick={() => handleDelete(agendamento.id)}><MdDelete /></button>
                      </div>
                    </div>
                  ))}
                </ul>
              </form>
          </div>
            </div>
            <ToastContainer />
      </div>
    );
}