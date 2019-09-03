import React, { useState } from 'react';
import axios from 'axios';

export default function DisplayRandomJob(props) {
  const [message, setMessage] = useState('');

  const closeModal = () => {
    setMessage('');
    props.setIsDisplayedRandomJob(false);
  };

  const markAsCompleted = () => {
    axios.post(`/jobs/completed/${props.randomJob._id}`).then(() => {
      setMessage('WELL DONE!! Congrats on completing this task!');
    });
  };

  const returnJobToJar = () => {
    axios.post(`/jobs/return/${props.randomJob._id}`).then(() => {
      setMessage(`"${props.randomJob.description}" returned to jar`);
    });
  };

  return (
    <div className='random-job-modal'>
      <h1>Your current job is:</h1>
      <h2 className='job-description'>{props.randomJob.description}</h2>
      {!message && (
        <div>
          <p>
            Do not click DONE until you've <br />
            <span>fully completed</span> this task!
          </p>
          <button onClick={markAsCompleted}>DONE</button>
          <button onClick={returnJobToJar} className='link message'>
            I can't do this now -- put it back in the jar.
          </button>
        </div>
      )}
      {message && (
        <div className='message'>
          <p>{message}</p>
          <button onClick={() => closeModal()}>THANKS</button>
        </div>
      )}
    </div>
  );
}
