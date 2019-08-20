import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { WithFirebase } from '../contexts/firebase/context';

import Navbar from '../components/Navbar';
import EmailLoginModal from './EmailLoginModal';

import history from '../AppRouter';

const LoginPageBase = props => {
  const [emailModalIsOpen, setEmailModalIsOpen] = useState(false);

  const loginWithGoogle = async () => {
    await props.firebase.loginWithGoogle();
    props.history.push('/jar');
    const firebaseId = await props.firebase.currentUserId();
    const email = await props.firebase.currentUserEmail();
    const user = { firebaseId, email };
    console.log(user);

    axios
      .post('/user', user)
      .then(res => console.log(res.data, 'User is logged in'));
  };

  const openEmailLoginModal = () => {
    setEmailModalIsOpen(true);
  };

  return (
    <div className='login-page'>
      <Navbar />
      <h1>Job Jar</h1>
      <div className='button-group'>
        <button onClick={loginWithGoogle}>Log In With Google</button>
        <button onClick={openEmailLoginModal}>Log In With Email</button>
        <Modal isOpen={emailModalIsOpen}>
          <EmailLoginModal setEmailModalIsOpen={setEmailModalIsOpen} />
        </Modal>
      </div>
    </div>
  );
};

const LoginPage = WithFirebase(LoginPageBase);
export default LoginPage;
