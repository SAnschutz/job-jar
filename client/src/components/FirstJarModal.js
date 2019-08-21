import React from 'react';

export default function FirstJarModal(props) {
  return (
    <div className='first-jar-modal'>
      <div className='text'>
        <p>To begin, add a jar by clicking "Create New Jar" above.</p>
        <button onClick={() => props.setIsOpenFirstJarModal(false)}>OK</button>
      </div>
    </div>
  );
}
