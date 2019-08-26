import React from 'react';

export default function Alert(props) {
  return (
    <div>
      <p className='alert'>There are currently no jobs in your jar.</p>
      <button onClick={() => props.setIsDisplayedAlert(false)}>OK</button>
    </div>
  );
}
