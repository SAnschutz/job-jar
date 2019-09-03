import React from 'react';

export default function Alert(props) {
  return (
    <div className='alert-modal'>
      <p className='alert'>{props.alert}</p>
      <button
        onClick={() => {
          props.setAlert('');
          props.setIsDisplayedAlert(false);
          props.setShowDeleteLink(false);
        }}
      >
        OK
      </button>
      {props.showDeleteLink && (
        <button className='link' onClick={props.deleteCompletedJobs}>
          DELETE completed jobs
        </button>
      )}
    </div>
  );
}
