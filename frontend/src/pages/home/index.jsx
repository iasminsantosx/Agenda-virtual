import { useHistory } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import "./styles.css";
export function Home (){

    const history = useHistory();

    const { user, logOut } = useContext(UserContext);

    const handleAgendamentos = () => {
        history.push('/agendamentos')
    }
    
    const handleAgendar = () => {
    history.push('/agendar')
    }

    if (!user) {
        history.push('/')
    }

    return(
        <div className="container">
        <header className="header">
          <span>Página Principal</span>
          <button className="logout-button" onClick={logOut}>Sair</button>
        </header>
        <div className="content">
          <div className="card">
            <div className="button-container">
              <button className="button" onClick={handleAgendamentos}>Agenda</button>
            </div>
            <div className="button-container">
              <button className="button" onClick={handleAgendar}>Agendar</button>
            </div>
          </div>
        </div>
      </div>
    );
}