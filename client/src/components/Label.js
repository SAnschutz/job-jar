import React from 'react';

export default function Label(props) {
  const jarName = props.jarName;
  const displayName = jarName ? jarName + "'s" : 'My';
  console.log('from label: ', displayName);

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
