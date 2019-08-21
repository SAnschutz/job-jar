import React from 'react';
import Navbar from './Navbar';
import jar from '../assets/jarsilhouette.svg';

export default function FirstJarPage(props) {
  return (
    <div className='first-jar-page'>
      <Navbar />
      <img src={jar} alt='jar' className='jar-container' />
      <div className='text'>
        <p>To begin, add a jar by clicking "Create New Jar" above.</p>
      </div>
    </div>
  );
}
