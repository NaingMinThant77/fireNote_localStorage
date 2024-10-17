import React, { useState, useEffect } from 'react';
import DeleteIcon from '../svgs/DeleteIcon';
import UpdateIcon from '../svgs/UpdateIcon';

const Note = ({ note, getNotes}) => {
  const { key: id, note: noteText, isChecked: initialIsChecked } = note;
  const [editMode, setEditMode] = useState(false);
  const [updatedText, setUpdatedText] = useState(noteText || '');
  const [isChecked, setIsChecked] = useState(initialIsChecked);

  useEffect(() => {
    setIsChecked(initialIsChecked); // Keep the checkbox state updated when the note's state changes
  }, [initialIsChecked]);

  const deleteNote = async () => {
    try {
      const response = await fetch(`https://firenote-bdeab-default-rtdb.firebaseio.com/notes/${id}.json`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete this note.');
      }
      getNotes();
    } catch (err) {
      alert(err.message);
    }
  };

  const updateNote = async () => {
    try {
      const response = await fetch(`https://firenote-bdeab-default-rtdb.firebaseio.com/notes/${id}.json`, {
        method: 'PUT',
        body: JSON.stringify({ note: updatedText, isChecked }), // Save updated text and isChecked status
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to update this note.');
      }
      setEditMode(false);
      getNotes();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCheckboxChange = async () => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);
    try {
      await fetch(`https://firenote-bdeab-default-rtdb.firebaseio.com/notes/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ isChecked: updatedChecked, note: updateNote }),
        headers: { 'Content-Type': 'application/json' },
      });
      getNotes(); // Refresh notes after update
    } catch (err) {
      alert('Failed to update checkbox state.');
    }
  };

  return (
    <div className='card card-ctr'>
      {editMode ? (
        <input type='text' value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} />
      ) : (
        <div className='icon'>
          <input
            type='checkbox'
            className='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <h3 style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
            {editMode ? updatedText : noteText || 'No text'}
          </h3>
        </div>
      )}
      <div className='icon'>
        <div onClick={deleteNote}><DeleteIcon /></div>
        <div onClick={() => setEditMode(!editMode)}><UpdateIcon /></div>
      </div>
      {editMode && <button onClick={updateNote} className='update-btn'>Save</button>}
    </div>
  );
};

export default Note;
