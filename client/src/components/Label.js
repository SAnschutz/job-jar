import React, { useState } from 'react';

export default function Label(props) {
  const displayName = props.firstName ? props.firstName + "'s" : 'My';

  return (
    <div id='label'>
      <p
        style={
          displayName.length > 9
            ? {
                fontSize: '20px',
                fontFamily: 'Delius Unicase'
              }
            : {
                fontSize: '28px',
                fontFamily: 'Delius Unicase'
              }
        }
      >
        {displayName}
      </p>
      <br />
      Job Jar
    </div>
  );
}
