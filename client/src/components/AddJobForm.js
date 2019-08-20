import React, { useState } from 'react';

export default function AddJobPage() {
  const [newNote, setNewNote] = useState('');

  const onChange = e => {
    setNewNote(e.target.value);
  };
  return (
    <form id='note-form'>
      <textarea
        onChange={onChange}
        placeholder='Add a new job'
        value={newNote}
      />
      <button>Submit</button>
    </form>
  );
}
