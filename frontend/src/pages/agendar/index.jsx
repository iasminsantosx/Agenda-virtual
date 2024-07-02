import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import { useContext, useState } from 'react';
import { agendarService } from '../../services/agentamentoService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from '../../utils/Toastify';


import "./styles.css";
export function Agendar (){

    const history = useHistory();

    const { user } = useContext(UserContext);

    const [descricao,setDescricao] = useState('');
    const [dataMarcacao, setDataMarcacao] = useState('');
    const [horaInicial, setHoraInicial] = useState('');
    const [horaTermino, setHoraTermino] = useState('');


    const createNewScheduling = async (event) => {
        event.preventDefault();
        console.log("Entro no button");
        try {
        const response = await agendarService({
            usuario_id:user.id,
            descricao,
            data_evento: formatarDataBrasileira(dataMarcacao), 
            hora_inicio: horaInicial,
            hora_termino: horaTermino
        });

        if (response) {
            showToastSuccess("Agendamento criado com sucesso")
        }
        
        setDescricao('');
        setDataMarcacao('');
        setHoraInicial('');
        setHoraTermino('');

        } catch (e) {
            console.log(e);
            const messageError = e.response.data.mensagem;

            showToastError(messageError) 
        }
    }

    const handleAdmin = () => {
        history.push('/home')
    }

    if (!user) {
        history.push('/')
    }

    const formatarDataBrasileira = (data) => {
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    };

    return(
        <div className="container">
        <header className="header">
          <span>Agendar</span>
          <button className="logout-button" onClick={handleAdmin}>Voltar</button>
        </header>
      
        <div className="content">
          <div className="card">
          <form>
            <div classNameName="inputContainer">
            <label htmlFor="email">Descrição</label>
            <input
                type="text"
                value={ descricao }
                onChange={ ({ target: { value } }) => setDescricao(value) } 
            />
            </div>

            <div classNameName="inputContainer">
            <label>Hora de Inicio</label>
            <input
                type="time"
                value={ horaInicial }
                onChange={ ({ target: { value } }) => setHoraInicial(value) } 
            />
            <label>Hora de Termino</label>
            <input
                type="time"
                value={ horaTermino }
                onChange={ ({ target: { value } }) => setHoraTermino(value) } 
            />
            <label>Hora de Termino</label>
            <input
                type="date"
                value={ dataMarcacao }
                onChange={ ({ target: { value } }) => setDataMarcacao(value) }
            />
            </div>
            <button onClick={createNewScheduling} classNameName="button">Agendar</button>
        </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
}