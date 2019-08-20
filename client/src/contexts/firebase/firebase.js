import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  currentUserId = () =>
    this.auth.currentUser ? this.auth.currentUser.uid : null;

  currentUserEmail = () =>
    this.auth.currentUser ? this.auth.currentUser.email : null;

  loginWithGoogle = () => {
    const googleAuthProvider = new app.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(googleAuthProvider);
  };

  loginWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  createAccount = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  signOut = () =>
    this.auth
      .signOut()
      .then(() => console.log('Logged out'))
      .catch(e => console.log('error logging out'));
}

export default firebase;
