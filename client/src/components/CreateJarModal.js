import React, { useState } from 'react';
import { WithFirebase } from '../contexts/firebase/context';

const CreateJarModalBase = props => {
  const [jarName, setJarName] = useState('');

  const closeModal = () => {
    props.setIsOpenCreateNewJarModal(false);
  };

  const createJar = () => {
    props.createJar(jarName);
  };

  const onSubmit = e => {
    e.preventDefault();
    createJar();
    closeModal();
  };

  return (
    <div>
      <h1>Create a New Jar</h1>
      <p>Enter jar owner's first name:</p>
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          type='text'
          value={jarName}
          onChange={e => setJarName(e.target.value)}
        />
        <button>Create Jar</button>
        <button className='close-modal-button' onClick={closeModal}>
          X
        </button>
      </form>
    </div>
  );
};

const CreateJarModal = WithFirebase(CreateJarModalBase);

export default CreateJarModal;
