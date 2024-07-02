import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import { useContext, useState, useEffect } from 'react';
import { editaAgendamentosService } from '../../services/agentamentoService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from '../../utils/Toastify';
import { useParams } from 'react-router-dom';


import "./styles.css";
export function EditarAgendamento (){

    const history = useHistory();

    const { user } = useContext(UserContext);
    const { id } = useParams();

    const [descricao,setDescricao] = useState('');
    const [dataMarcacao, setDataMarcacao] = useState('');
    const [horaInicial, setHoraInicial] = useState('');
    const [horaTermino, setHoraTermino] = useState('');
    const [Id,setId]= useState(null);

    const fetchAgendamentoById = async () => {
        try {
            setId(id);
        } catch(error) {
            console.log(error);
        }
        };

    useEffect(() => {
        fetchAgendamentoById();
    }, [id]); 


    const handleEditarAgenda = async (event) => {
        event.preventDefault();
        
        try {
        const response = await editaAgendamentosService(Id,{
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
        history.push('/agendamentos')
    }

    if (!user) {
        history.push('/agendamentos')
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
            <div className="inputContainer">
            <label htmlFor="email">Descrição</label>
            <input
                type="text"
                value={ descricao }
                onChange={ ({ target: { value } }) => setDescricao(value) } 
            />
            </div>

            <div className="inputContainer">
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
            <button onClick={handleEditarAgenda} className="button">Agendar</button>
        </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
}