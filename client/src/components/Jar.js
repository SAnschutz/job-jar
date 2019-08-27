import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jar from '../assets/jarsilhouette.svg';
import Label from '../components/Label';
import Navbar from '../components/Navbar';
import AddJobForm from './AddJobForm';
import FirstJarModal from './FirstJarModal';
import Alert from './Alert';
import Modal from 'react-modal';
import { WithFirebase } from '../contexts/firebase/context';
import DisplayRandomJob from './DisplayRandomJob';

const JarBase = props => {
  const [isOpenFirstJarModal, setIsOpenFirstJarModal] = useState(false);
  const [currentJar, setCurrentJar] = useState({});
  const [currentJarName, setCurrentJarName] = useState('');
  const [jars, setJars] = useState([]);

  const [randomJob, setRandomJob] = useState('');
  const [isDisplayedRandomJob, setIsDisplayedRandomJob] = useState(false);

  const [alert, setAlert] = useState('');
  const [isDisplayedAlert, setIsDisplayedAlert] = useState(false);

  const firebaseId = props.firebase.currentUserId();

  const selectCurrentJar = jarName => {
    if (jarName) {
      setCurrentJar(jarName);
      setCurrentJarName(jarName.jarName);
    }
  };

  const createJar = jarName => {
    axios
      .post('/jars', { jarName, ownerFirebaseId: firebaseId })
      .then(jarList => {
        setJars(jarList.data);
        const newJar = jarList.data.find(jar => jar.jarName === jarName);

        selectCurrentJar(newJar);
      });
  };

  const changeJar = e => {
    const selectedJarName = e.target.value;
    const newJar = jars.find(jar => jar.jarName === selectedJarName);
    selectCurrentJar(newJar);
  };

  const displayRandomJob = () => {
    axios.get(`/jobs/${currentJar._id}`).then(jobs => {
      const todoList = jobs.data.filter(job => job.completed === false);
      if (todoList.length === 0) {
        setAlert('You have no jobs in your jar.');
        setIsDisplayedAlert(true);
      } else {
        const currentJob = todoList.find(job => job.currentJob === true);
        if (currentJob) {
          setRandomJob(currentJob);
          setIsDisplayedRandomJob(true);
        } else {
          const randomIndex = Math.floor(Math.random() * todoList.length);
          const randomJob = todoList[randomIndex];
          setRandomJob(randomJob);

          setIsDisplayedRandomJob(true);

          axios.post(`jobs/select/${randomJob._id}`).then(() => {
            console.log('Current job stored.');
          });
        }
      }
    });
  };

  useEffect(() => {
    axios.get(`/jars/${firebaseId}`).then(jarList => {
      setJars(jarList.data);

      jarList.data.length === 0 && setIsOpenFirstJarModal(true);

      selectCurrentJar(jarList.data[0]);
    });
  }, []);

  return (
    <div className='jar-page'>
      <Navbar
        jars={jars}
        changeJar={changeJar}
        createJar={createJar}
        isOpenFirstJarModal={isOpenFirstJarModal}
        setIsOpenFirstJarModal={setIsOpenFirstJarModal}
      />
      <Modal isOpen={isOpenFirstJarModal} className='first-jar-modal modal'>
        <FirstJarModal setIsOpenFirstJarModal={setIsOpenFirstJarModal} />
      </Modal>
      <Modal isOpen={isDisplayedRandomJob} className='random-job-modal modal'>
        <DisplayRandomJob
          randomJob={randomJob}
          setIsDisplayedRandomJob={setIsDisplayedRandomJob}
        />
      </Modal>
      <Modal isOpen={isDisplayedAlert} className='alert-modal modal'>
        <Alert alert={alert} setIsDisplayedAlert={setIsDisplayedAlert} />
      </Modal>
      <div className='flex-container'>
        <div className='jar-container'>
          <button id='select-job-button' onClick={displayRandomJob}>
            Select a Random Job
          </button>
          <div className='jar-container'>
            <img src={jar} alt='' className='jar' />
            <Label jarName={currentJarName} />
          </div>
        </div>
        <div className='job-form-container'>
          <div id='job-links'>
            <button className='link'>See remaining jobs</button>
            <button className='link'>See completed jobs</button>
          </div>
          <AddJobForm jarId={currentJar._id} />
        </div>
      </div>
    </div>
  );
};

const Jar = WithFirebase(JarBase);

export default Jar;
