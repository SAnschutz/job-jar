import React from 'react';

const FirebaseContext = React.createContext();

const WithFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;

export { WithFirebase };
