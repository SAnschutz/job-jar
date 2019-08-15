import React, { useState } from 'react';
import jar from '../assets/jar.svg';
import Label from '../components/Label';

export default function Jar() {
  const [jarTitle, setJarTitle] = useState("Shela's Job Jar");
  const [task, setTask] = useState('');

  const addTitle = () => {};

  return (
    <div className='jarContainer'>
      <img src={jar} alt='' className='jar' />
      <Label jarTitle={jarTitle} />
    </div>
  );
}
