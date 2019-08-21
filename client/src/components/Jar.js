import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jar from '../assets/jarsilhouette.svg';
import Label from '../components/Label';
import Navbar from '../components/Navbar';
import AddJobForm from '../components/AddJobForm';
import { WithFirebase } from '../contexts/firebase/context';

const JarBase = props => {
  const [currentJar, setCurrentJar] = useState({});
  const [currentJarName, setCurrentJarName] = useState('');
  const [jars, setJars] = useState([]);
  const [newJob, setNewJob] = useState('');

  console.log(jars);

  // const firebaseId = props.firebase.currentUserId();

  const firebaseId = '123456Sally';
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
    axios.post('/jars', { jarName, ownerFirebaseId: firebaseId }).then(jars => {
      selectCurrentJar(jarName);
    });
  };

  const changeJar = e => {
    const selectedJarName = e.target.value;
    const newJar = jars.find(jar => jar.jarName === selectedJarName);
    selectCurrentJar(newJar);
    console.log(currentJar);
  };

  useEffect(() => {
    axios.get(`/jars/${firebaseId}`).then(jars => {
      console.log('jars: ', jars.data);
      console.log('current jar: ', jars.data[0]);

      setJars(jars.data);

      selectCurrentJar(jars.data[0]);
    });

    console.log(jars, currentJar);
  }, []);

  return (
    <div className='jar-page'>
      <Navbar jars={jars} changeJar={changeJar} createJar={createJar} />
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
