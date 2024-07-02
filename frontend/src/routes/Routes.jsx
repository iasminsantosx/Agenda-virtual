import { Route, Switch } from 'react-router-dom';
import { Login } from '../pages/login/index';
import {Agendar} from '../pages/agendar/index';
import { Agendamentos } from '../pages/agendamentos/index';
import {EditarAgendamento} from '../pages/editarAgendamento/index';
import { Cadastro } from '../pages/cadastro/index';
import { Home } from '../pages/home/index';

function Routes() {

  return (
    <Switch>
      <Route exact path="/" component={ Login }/>
      <Route exact path="/home" component={ Home }/>
      <Route exact path="/agendar" component={ Agendar }/>
      <Route exact path="/agendamentos" component={ Agendamentos }/>
      <Route exact path="/editar-agendamento/:id" component={ EditarAgendamento }/>
      <Route exact path="/cadastro" component={ Cadastro }/>
    </Switch>
  )
}

export default Routes
