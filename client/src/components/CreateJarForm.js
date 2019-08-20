import React, { useState } from 'react';

export default function CreateJarForm() {
  const [firstName, setFirstName] = useState('');
  const onSubmit = () => {};
  return (
    <div>
      <h1>Create a New Jar!</h1>
      <p>Enter the jar owner's first name:</p>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={firstName}
          placeholder='Name'
          onChange={e => setFirstName(e.target.value)}
        />
        <button>Create Jar</button>
      </form>
    </div>
  );
}
