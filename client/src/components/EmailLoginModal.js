import React, { useState } from 'react';
// import firebase from '../contexts/firebase/firebase';
import { WithFirebase } from '../contexts/firebase/context';

const EmailLoginModalBase = props => {
  const [newAccount, setNewAccount] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (newAccount && password !== password2) {
      setErrorMessage('Passwords do not match.');
    } else if (email.length === 0 || password.length === 0) {
      setErrorMessage('Please enter e-mail and password.');
    } else {
      newAccount
        ? createAccount(email, password)
        : loginWithEmailAndPassword(email, password);
    }
  };

  const createAccount = () => {
    props.firebase.createAccount(email, password).then(() => {
      console.log('account created');
    });
  };

  const loginWithEmailAndPassword = () => {
    props.firebase
      .loginWithEmailAndPassword(email, password)
      .then(() => {
        props.setEmailModalIsOpen(false);
        console.log('logged in');
      })
      .catch(error => setErrorMessage(error.message));
  };

  const closeModal = () => {
    props.setEmailModalIsOpen(false);
  };

  const displayPasswordConfirm = e => {
    e.preventDefault();
    setNewAccount(true);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder='E-mail Address'
          type='email'
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setErrorMessage('');
          }}
        />
        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setErrorMessage('');
          }}
        />
        {newAccount && (
          <input
            placeholder='ConfirmPassword'
            type='password'
            value={password2}
            onChange={e => {
              setPassword2(e.target.value);
              setErrorMessage('');
            }}
          />
        )}
        <button className='close-modal-button' onClick={closeModal}>
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
};

export default WithFirebase(EmailLoginModalBase);
