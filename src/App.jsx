import React, { useEffect, useState } from 'react';
import AddNote from './components/AddNote';
import Note from './components/Note';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import FilterDiv from './components/FilterDiv';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => { getNotes(); }, [filter]); // Refresh notes based on filter change

  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://firenote-bdeab-default-rtdb.firebaseio.com/notes.json");
      if (!response.ok) {
        throw new Error("Cannot connect to Firebase.");
      }
      const notesData = await response.json();
      console.log('Fetched notes data:', notesData); // Debug log

      // Check if notesData is valid
      const modifiedNotes = notesData ? Object.entries(notesData).map(([key, value]) => ({
        key,
        note: value.note || '', // Corrected here
        isChecked: value.isChecked || false
      })) : [];
      // console.log('Modified notes:', modifiedNotes); // Debug log
      setNotes(modifiedNotes);
    } catch (err) {
      // console.error('Error fetching notes:', err); // Debug log
      setError(err.message);
    }
    setLoading(false);
  };

  const clearAllNotes = async () => {
    try {
      await fetch("https://firenote-bdeab-default-rtdb.firebaseio.com/notes.json", {
        method: "DELETE"
      });
      setNotes([]); // Clear local notes state
    } catch (err) {
      alert("Failed to clear all notes");
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredNotes = notes.filter((note) => {
    if (filter === 'complete') return note.isChecked;
    if (filter === 'pending') return !note.isChecked;
    return true; // 'all' case
  });

  return (
    <section className='form-border'>
      <Navbar totalNotes={notes.length} />
      {loading && !error && <p className='message'>Getting notes ...</p>}
      {error && !loading && <p className='message error'>{error}</p>}
      <AddNote getNotes={getNotes} />
      <FilterDiv
        handleFilterChange={handleFilterChange}
        clearAllNotes={clearAllNotes}
        activeFilter={filter}
      />
      {filter === 'pending' && filteredNotes.length === 0 && (
        <p className='message'>There are no pending notes.</p>
      )}
      {filter === 'complete' && filteredNotes.length === 0 && (
        <p className='message'>There are no completed notes.</p>
      )}
      <div className='overflow-ctr'>
       {!loading && !error && filteredNotes.map((note, index) => (
        <Note key={index} note={note} getNotes={getNotes}  />
        ))}
      </div>
      {notes.length === 0 && !loading && <Intro />}
    </section>
  );
};

export default App;
