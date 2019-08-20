import React, { useState } from 'react';
import { Link } from 'react-dom';
// import Modal from 'react-modal';

export default function EmailLoginModal(props) {
  const [newAccount, setNewAccount] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createAccount = () => {
    props.firebase.createAccount(email, password).then(() => {
      console.log('account created');
    });
  };

  const loginWithEmailAndPassword = () => {
    props.firebase.loginWithEmailAndPassword(email, password).then(() => {
      props.setEmailModalIsOpen(false);
      // console.log(props.firebase.currentUserEmail());
    });
  };

  const closeModal = () => {
    props.setEmailModalIsOpen(false);
  };

  const displayPasswordConfirm = e => {
    e.preventDefault();
    setNewAccount(true);
  };

  const onSubmit = e => {
    e.preventDefault();
    // console.log('email: ', email, 'password: ', password);
  };

  return (
    <div className='email-form'>
      <form onSubmit={onSubmit}>
        <input
          placeholder='E-mail Address'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {newAccount && (
          <input
            placeholder='ConfirmPassword'
            type='password'
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        )}
        <button id='close-modal' onClick={closeModal}>
          X
        </button>
        <button className='submit-button' onClick={onSubmit}>
          Submit
        </button>
        <button className='link' onClick={displayPasswordConfirm}>
          No account? Click here to create one.
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}
