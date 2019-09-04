import React, { useState } from 'react';
import Modal from 'react-modal';
import ConfirmDeleteJarModal from './ConfirmDeleteJarModal';

export default function DeleteJarModal(props) {
  console.log('delete');
  const [
    isOpenConfirmDeleteJarModal,
    setIsOpenConfirmDeleteJarModal
  ] = useState(false);

  const [NameOfJarToDelete, setNameOfJarToDelete] = useState('');

  const closeModal = () => {
    props.setIsOpenDeleteJarModal(false);
  };
  const openConfirmDeleteJarModal = () => {
    // props.setIsOpenDeleteJarModal(false);
    setIsOpenConfirmDeleteJarModal(true);
  };

  return (
    <div>
      <h1>Select the name of the jar you wish to delete:</h1>
      <select
        class='select-jar-options'
        onChange={e => setNameOfJarToDelete(e.target.value)}
      >
        <option value='' disabled selected>
          Select Jar Name
        </option>
        {props.jars.map(jar => (
          <option value={jar.jarName} key={jar.jarName}>
            {jar.jarName}'s Jar
          </option>
        ))}
      </select>
      <button onClick={openConfirmDeleteJarModal} disabled={!NameOfJarToDelete}>
        Delete
      </button>

      <button onClick={closeModal}>Cancel</button>
      <Modal
        isOpen={isOpenConfirmDeleteJarModal}
        className='confirm-delete-jar-modal modal'
      >
        <ConfirmDeleteJarModal
          NameOfJarToDelete={NameOfJarToDelete}
          setIsOpenDeleteJarModal={props.setIsOpenDeleteJarModal}
          setIsOpenConfirmDeleteJarModal={setIsOpenConfirmDeleteJarModal}
          deleteJar={props.deleteJar}
        />
      </Modal>
    </div>
  );
}
