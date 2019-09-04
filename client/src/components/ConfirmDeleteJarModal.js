import React from 'react';

export default function ConfirmDeleteJarModal(props) {
  const closeModal = () => {
    props.setIsOpenConfirmDeleteJarModal(false);
  };

  const deleteJar = () => {
    props.deleteJar(props.NameOfJarToDelete);
    // closeModal();
    props.setIsOpenDeleteJarModal(false);
  };

  return (
    <div>
      <p>
        You are about to <span>delete</span>
      </p>
      <h1>{props.NameOfJarToDelete}'s Jar.</h1>
      <p>Are you sure?</p>
      <button onClick={deleteJar} className='confirm-delete-jar-button'>
        Yes, delete it!
      </button>
      <button onClick={closeModal}>No -- cancel!</button>
    </div>
  );
}
