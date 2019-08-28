import React, { useState } from 'react';
import axios from 'axios';

export default function AddJobPage(props) {
  const [newJob, setNewJob] = useState('');
  const [message, setMessage] = useState('');

  const onChange = e => {
    setNewJob(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const description = newJob;
    const jarId = props.jarId;
    axios.post('/jobs', { description, jarId }).then(job => {
      newJob.length > 0 &&
        setMessage(`"${newJob}" has been added to the Job Jar.`);
      setNewJob('');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    });
  };

  return (
    <div className='add-job-form'>
      {!props.jarId && <h1>Select a jar to begin</h1>}
      {message && <p>{message}</p>}
      <form id='job-form' onSubmit={onSubmit}>
        <textarea
          onChange={onChange}
          placeholder='Add a new job'
          value={newJob}
        />
        <input type='submit' value='Submit' />
      </form>
      <button className='link' onClick={props.showCurrentJobs}>
        Show remaining jobs
      </button>
      <button className='link' onClick={props.showCompletedJobs}>
        Show completed jobs
      </button>
    </div>
  );
}
