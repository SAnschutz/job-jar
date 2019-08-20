import React, { useState } from 'react';
import jar from '../assets/jarsilhouette.svg';
import Label from '../components/Label';
import Navbar from '../components/Navbar';
import AddJobForm from '../components/AddJobForm';
import jarsContext from '../contexts/jars/jarsContext';

export default function Jar() {
  const [firstName, setFirstName] = useState('Shela');
  const [newJob, setNewJob] = useState('');

  return (
    <jarsContext.Provider value={{ firstName }}>
      <div className='jar-page'>
        <Navbar />
        <button id='select-job-button'>Select a Random Job</button>
        <div className='page-content'>
          <div className='jar-container'>
            <img src={jar} alt='' className='jar' />
            <Label firstName={firstName} />
          </div>
          <AddJobForm />
        </div>
      </div>
    </jarsContext.Provider>
  );
}
