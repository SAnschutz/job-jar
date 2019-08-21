import React from 'react';

export default function FirstJarModal(props) {
  return (
    <div className='text'>
      <p>
        Create your first jar by clicking
        <br /> "Create A New Jar" above.
      </p>
      <button onClick={() => props.setIsOpenFirstJarModal(false)}>OK</button>
    </div>
  );
}
