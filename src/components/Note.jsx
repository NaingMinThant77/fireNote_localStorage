import React, { useState, useEffect } from 'react';
import DeleteIcon from '../svgs/DeleteIcon';
import UpdateIcon from '../svgs/UpdateIcon';

const Note = ({ note, getNotes }) => {
  const { note: noteText, isChecked: initialIsChecked } = note;
  const [editMode, setEditMode] = useState(false);
  const [updatedText, setUpdatedText] = useState(noteText || '');
  const [isChecked, setIsChecked] = useState(initialIsChecked);

  useEffect(() => {
    setIsChecked(initialIsChecked);
  }, [initialIsChecked]);

  const deleteNote = () => {
    try {
      const storedNotes = localStorage.getItem('notes');
      let notes = storedNotes ? JSON.parse(storedNotes) : [];
      notes = notes.filter((n) => n.note !== noteText);
      localStorage.setItem('notes', JSON.stringify(notes));
      getNotes();
    } catch (err) {
      alert('Failed to delete this note.');
    }
  };

  const updateNote = (newIsChecked = isChecked) => {
    try {
      const storedNotes = localStorage.getItem('notes');
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
      
      // Update the note's text and checked status
      const updatedNotes = notes.map((n) =>
        n.note === noteText ? { note: updatedText, isChecked: newIsChecked } : n
      );
      
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setEditMode(false); // Exit edit mode
      getNotes(); // Refresh notes list
    } catch (err) {
      alert('Failed to update this note.');
    }
  };
  
  
  const handleTextUpdate = () => {
    updateNote(); // Update with current state of isChecked
  };
  
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked; // Get the new checkbox state (toggled)
    setIsChecked(newCheckedState); // Update local state
    updateNote(newCheckedState); // Update localStorage with the new checkbox state
  };
  

  return (
    <div className='card card-ctr'>
  {editMode ? (
    <input 
      type='text' 
      value={updatedText} 
      onChange={(e) => setUpdatedText(e.target.value)} 
    />
  ) : (
    <div className='icon'>
      <input
        type='checkbox'
        className='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange} // Call checkbox change handler
      />
      <h3 style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
        {noteText || 'No text'}
      </h3>
    </div>
  )}

  <div className='icon'>
    <div onClick={deleteNote}><DeleteIcon /></div>
    <div onClick={() => setEditMode(!editMode)}><UpdateIcon /></div>
  </div>

  {editMode && <button onClick={handleTextUpdate} className='update-btn'>Save</button>}
</div>

  );
};

export default Note;
