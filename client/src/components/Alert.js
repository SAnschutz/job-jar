import React from 'react';

export default function Alert(props) {
  return (
    <div>
      <p className='alert'>{props.alert}</p>
      <button
        onClick={() => {
          props.setAlert('');
          props.setIsDisplayedAlert(false);
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
