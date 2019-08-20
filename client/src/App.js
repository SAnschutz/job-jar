import React from 'react';
import firebase from './contexts/firebase/firebase';
import FirebaseContext from './contexts/firebase/context';

import '../src/styles/styles.scss';

import AppRouter from './AppRouter';

function App() {
  return (
    <FirebaseContext.Provider value={new firebase()}>
      <AppRouter />
    </FirebaseContext.Provider>
  );
}

export default App;
