import React from 'react';
import Confetti from 'react-confetti';

export default function Alert(props) {
  return (
    <div className='alert-modal'>
      <p className='alert'>{props.alert}</p>
      {props.fancyButton ? (
        <button
          class='fancy-button'
          onClick={() => {
            props.setAlert('');
            props.setIsDisplayedAlert(false);
            props.setShowDeleteLink(false);
            props.setThrowConfetti(false);
            props.setFancyButton(false);
          }}
        >
          YAY!
        </button>
      ) : props.thanksButton ? (
        <button
          onClick={() => {
            props.setAlert('');
            props.setIsDisplayedAlert(false);
            props.setShowDeleteLink(false);
            props.setThanksButton(false);
          }}
        >
          THANKS
        </button>
      ) : (
        <button
          onClick={() => {
            props.setAlert('');
            props.setIsDisplayedAlert(false);
            props.setShowDeleteLink(false);
          }}
        >
          OK
        </button>
      )}
      {props.showDeleteLink && (
        <button className='link' onClick={props.deleteCompletedJobs}>
          DELETE completed jobs
        </button>
      )}
      {props.throwConfetti && <Confetti id='confetti' />}
    </div>
  );
}
