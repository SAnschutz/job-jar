import React, { useState } from 'react';
import { WithFirebase } from '../contexts/firebase/context';

const CreateJarModalBase = props => {
  const [jarName, setJarName] = useState('');

  const closeModal = () => {
    props.setCreateNewJarModalIsOpen(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.createJar(jarName);
    closeModal();
  };

  return (
    <div>
      <h1>Create a New Jar</h1>
      <p>Enter the jar owner's first name:</p>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={jarName}
          placeholder='Name'
          onChange={e => setJarName(e.target.value)}
        />
        <button>Create Jar</button>
        <button className='close-modal' onClick={closeModal}>
          X
        </button>
      </form>
    </div>
  );
};

const CreateJarModal = WithFirebase(CreateJarModalBase);

export default CreateJarModal;
