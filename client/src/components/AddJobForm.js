import React, { useState } from 'react';
import axios from 'axios';

export default function AddJobPage(props) {
  const [newJob, setNewJob] = useState('');
  const [message, setMessage] = useState('');

  const onChange = e => {
    if (!props.jarId) {
      setMessage('You must create a jar before adding jobs');
    } else {
      setMessage('');
      setNewJob(e.target.value);
    }
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
      <div className='show-jobs-links'>
        <button className='link' onClick={props.showCurrentJobs}>
          Show remaining jobs
        </button>
        <button className='link' onClick={props.showCompletedJobs}>
          Show completed jobs
        </button>
      </div>
      <div className='display-added-job'>{message && <p>{message}</p>}</div>
      <form id='job-form' onSubmit={onSubmit}>
        <textarea
          onChange={onChange}
          placeholder='Add a new job'
          value={newJob}
        />
        <input type='submit' value='Submit' disabled={!props.jarId} />
      </form>
    </div>
  );
}
