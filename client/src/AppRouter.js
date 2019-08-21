import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LoginPage from '../src/components/LoginPage';
import Jar from '../src/components/Jar';
import FirstJarPage from './components/FirstJarPage';
import { WithFirebase } from './contexts/firebase/context';

export const history = createBrowserHistory();

const AppRouterBase = props => {
  const [isAuthed, setIsAuthed] = useState(false);

  props.firebase.auth.onAuthStateChanged(authUser => {
    authUser ? setIsAuthed(true) : setIsAuthed(false);
  });

  return (
    <Router history={history} isAuthed={isAuthed}>
      <Switch>
        <Route path='/' component={LoginPage} exact={true} />
        <Route path='/jar' component={isAuthed ? Jar : LoginPage} />
        <Route
          path='/firstjar'
          component={isAuthed ? FirstJarPage : LoginPage}
        />
      </Switch>
    </Router>
  );
};

const AppRouter = WithFirebase(AppRouterBase);

export default AppRouter;
