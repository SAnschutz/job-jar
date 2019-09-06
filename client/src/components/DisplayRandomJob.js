import React from 'react';
import axios from 'axios';

export default function DisplayRandomJob(props) {
  const markAsCompleted = () => {
    axios.post(`/jobs/completed/${props.randomJob._id}`).then(res => {
      axios.get(`/jobs/${props.currentJar._id}`).then(jobs => {
        const todoList = jobs.data.filter(job => job.completed === false);
        if (todoList.length === 0) {
          props.setAlert(
            'CONGRATS!! You have completed all the jobs in your Job Jar!!'
          );
          props.setIsDisplayedAlert(true);
          props.setIsDisplayedRandomJob(false);
          props.setFancyButton(true);
          props.setThrowConfetti(true);
        } else {
          props.setAlert(`Great job!`);
          props.setIsDisplayedAlert(true);
          props.setIsDisplayedRandomJob(false);
          props.setThanksButton(true);
        }
      });
    });
  };

  const returnJobToJar = () => {
    axios.post(`/jobs/return/${props.randomJob._id}`).then(() => {
      props.setAlert(
        `"${props.randomJob.description}" has been returned to your jar.`
      );
      props.setIsDisplayedAlert(true);
      props.setIsDisplayedRandomJob(false);
    });
  };

  return (
    <div className='random-job-modal'>
      <div>
        <h1>Your current job is:</h1>
        <h2 className='job-description'>{props.randomJob.description}</h2>

        <p>
          Do <span>not</span> click COMPLETED until you've <br />
          <span>fully</span> completed this task!
        </p>
        <button onClick={markAsCompleted}>COMPLETED</button>
        <button onClick={returnJobToJar} className='link message'>
          I can't do this now -- put it back in the jar.
        </button>
      </div>
    </div>
  );
}
