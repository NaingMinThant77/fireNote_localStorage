import React, { useState } from 'react';

const AddNote = ({ getNotes }) => {
  const [note, setNote] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    if (note.trim().length === 0 ) {
      alert("Please enter a valid note. ")
      return;
    }
    try {
      const storedNotes = localStorage.getItem('notes');
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
      const newNote = { note, isChecked: false };
      const updatedNotes = [...notes, newNote]; // Keep previous notes, add new one
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNote('');
      getNotes(); // Refresh the list of notes after adding
    } catch (err) {
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <section onSubmit={addNote}>
      <form className='card'>
        <input
          type='text'
          placeholder='Add note here'
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className='submit-btn'>Add Note</button>
      </form>
    </section>
  );
};

export default AddNote;
