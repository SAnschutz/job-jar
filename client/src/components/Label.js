import React from 'react';

export default function Label(props) {
  const jarName = props.jarName;
  const displayName = jarName ? jarName + "'s" : '';

  return (
    <div id='label'>
      <p
        style={
          displayName.length > 9
            ? {
                fontSize: '1.5em',
                fontFamily: 'Delius Unicase'
              }
            : {
                fontSize: '2em',
                fontFamily: 'Delius Unicase'
              }
        }
      >
        {displayName}
        <br />
        Job Jar
      </p>
    </div>
  );
}
