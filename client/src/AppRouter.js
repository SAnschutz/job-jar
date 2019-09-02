import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LoginPage from './components/LoginPage';
import Jar from './components/Jar';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
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
        <Route path='/' component={isAuthed ? Jar : LoginPage} exact={true} />
        <Route path='/myjars' component={isAuthed ? Jar : LoginPage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/contact' component={ContactPage} />
      </Switch>
    </Router>
  );
};

const AppRouter = WithFirebase(AppRouterBase);

export default AppRouter;
