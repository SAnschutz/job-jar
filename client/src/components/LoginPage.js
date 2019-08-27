import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import housekeepingimage from '../assets/housekeeping.jpg';
import { WithFirebase } from '../contexts/firebase/context';

import Navbar from '../components/Navbar';
import EmailLoginModal from './EmailLoginModal';

const LoginPageBase = props => {
  const [emailModalIsOpen, setEmailModalIsOpen] = useState(false);

  const loginWithGoogle = async () => {
    await props.firebase.loginWithGoogle();
    props.history.push('/jar');
    const firebaseId = await props.firebase.currentUserId();
    const email = await props.firebase.currentUserEmail();
    const user = { firebaseId, email };

    axios.post('/user', user).then(res => console.log('User is logged in'));
  };

  const openEmailLoginModal = () => {
    setEmailModalIsOpen(true);
  };

  return (
    <div className='login-page'>
      <Navbar />
      <div className='flex-container'>
        <div className='image-container'>
          <img
            src={housekeepingimage}
            alt='drawing of man with cleaning supplies'
          />
        </div>
        <div className='text-container'>
          <h1>Job Jar</h1>
          <div className='button-group'>
            <button onClick={loginWithGoogle}>Log In With Google</button>
            <button onClick={openEmailLoginModal}>Log In With Email</button>

            <Modal
              isOpen={emailModalIsOpen}
              className='email-login-modal modal'
            >
              <EmailLoginModal setEmailModalIsOpen={setEmailModalIsOpen} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = WithFirebase(LoginPageBase);
export default LoginPage;
