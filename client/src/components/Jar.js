import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jar from '../assets/jarsilhouette.svg';
import Label from '../components/Label';
import Navbar from '../components/Navbar';
import AddJobForm from './AddJobForm';
import FirstJarModal from './FirstJarModal';
import Modal from 'react-modal';
import { WithFirebase } from '../contexts/firebase/context';

const JarBase = props => {
  const [currentJar, setCurrentJar] = useState({});
  const [currentJarName, setCurrentJarName] = useState('');
  const [jars, setJars] = useState([]);
  const [newJob, setNewJob] = useState('');
  const [isOpenFirstJarModal, setIsOpenFirstJarModal] = useState(false);

  console.log(jars);

  const firebaseId = props.firebase.currentUserId();
  const email = props.firebase.currentUserEmail();
  const user = { firebaseId, email };
  console.log(user);

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
    console.log(currentJar);
  };

  useEffect(() => {
    axios.get(`/jars/${firebaseId}`).then(jarList => {
      console.log('jars: ', jarList.data);
      console.log('current jar: ', jarList.data[0]);

      setJars(jarList.data);
      console.log(jars);

      jarList.data.length === 0 && setIsOpenFirstJarModal(true);

      selectCurrentJar(jarList.data[0]);

      console.log(jarList.data, currentJar);
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
      <button id='select-job-button'>Select a Random Job</button>
      <div className='page-content'>
        <div className='jar-container'>
          <img src={jar} alt='' className='jar' />
          <Label jarName={currentJarName} />
        </div>
        <AddJobForm />
      </div>
    </div>
  );
};

const Jar = WithFirebase(JarBase);

export default Jar;
