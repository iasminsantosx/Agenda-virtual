import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import User from '../pages/Usuario';
import Agendar from '../pages/Agendar';
import Agendamentos from '../pages/Agendamentos';
import EditarAgendamento from '../pages/EditarAgendamento';
import Cadastro from '../pages/Cadastro';

function Routes() {

  return (
    <Switch>
      <Route exact path="/" component={ Login }/>
      <Route exact path="/home" component={ User }/>
      <Route exact path="/agendar" component={ Agendar }/>
      <Route exact path="/agendamentos" component={ Agendamentos }/>
      <Route exact path="/editar-agendamento/:id" component={ EditarAgendamento }/>
      <Route exact path="/cadastro" component={ Cadastro }/>
    </Switch>
  )
}

export default Routes
