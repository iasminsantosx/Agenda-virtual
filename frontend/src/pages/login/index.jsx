import { Link } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import {loginService} from "../../services/loginService";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastDefault, showToastError } from "../../utils/Toastify";
import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "./styles.css";

export function Login() {
    const history = useHistory();

    const { setUser } = useContext(UserContext);
  
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
  
      if (userData) {
  
        history.push('/home');
      }
    }, []);
  
    const handleLoginBtn = async (event) => {
        event.preventDefault();
        try {
            showToastDefault('Verificando dados!')
            const response = await loginService({
            email,
            senha,
            })
    
            localStorage.setItem('user', JSON.stringify(response.data.usuario));
            
            setUser(response.data.usuario);
    
            history.push('/home');
        } catch (e) {
            const messageError = e.response.data.mensagem;
    
            showToastError(messageError) 
    
            console.log(e)
        }
    }

  return (
    <div className="container">
      <header className="header">
        <span>Por favor digite suas informações de login</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="teste@email.com"
            value={ email }
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
            value={ senha }
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <a href="#">Esqueceu sua senha ?</a>

        <button className="button" onClick={handleLoginBtn}>
          Entrar <img src={arrowImg} alt="->" />
        </button>
        <div className="footer">
          <p>Você não tem uma conta?</p>
          <Link to="/cadastro">Crie a sua conta aqui</Link>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}