import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { cadastrarUsuarioService } from '../../services/usuarioService'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from "../../utils/Toastify";
import { Link } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import "./styles.css";

export function Cadastro() {
    const history = useHistory();

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('')
  

    const registerNewUser = async (event) => {
        event.preventDefault();
        try {
            const response = await cadastrarUsuarioService({
            nome,
            senha,
            email
            });
    
            if (response) {
            showToastSuccess("Usuario cadastrado com sucesso")
            }
            
            setNome('');
            setEmail('');
            setSenha('');
    
        } catch (e) {
            const messageError = e.response.data.mensagem;
    
            showToastError(messageError) 
    
            console.log(e);
      }
    }
  
  return (
    <div className="container">
      <header className="header">
        <span>Por favor digite suas informações de cadastro</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={registerNewUser} className="button">
          Cadastrar <img src={arrowImg} alt="->" />
        </button>
        <div className="footer">
          <p>Você já tem uma conta?</p>
          <Link to="/">Acesse sua conta aqui</Link>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}