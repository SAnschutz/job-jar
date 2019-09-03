import React from 'react';

export default function FirstJarModal(props) {
  return (
    <div className='text'>
      <p>
        To create your first jar, select "Add A Jar" from the "Jars" menu above.
      </p>
      <button onClick={() => props.setIsOpenFirstJarModal(false)}>OK</button>
    </div>
  );
}
