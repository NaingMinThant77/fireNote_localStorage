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

  useEffect(() => {
    getNotes();
  }, [filter]);

  const getNotes = () => {
    setLoading(true);
    try {
      const storedNotes = localStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        setNotes([]);
      }
    } catch (err) {
      setError('Failed to load notes from local storage.');
    }
    setLoading(false);
  };

  const clearAllNotes = () => {
    try {
      localStorage.removeItem('notes');
      setNotes([]);
    } catch (err) {
      alert('Failed to clear all notes.');
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredNotes = notes.filter((note) => {
    if (filter === 'complete') return note.isChecked === true; // Check for completed notes
    if (filter === 'pending') return note.isChecked === false; // Check for pending notes
    return true; // Show all notes when 'all' is selected
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
      {notes.length > 0 ? (
        <div className='overflow-ctr'>
          {!loading && !error && filteredNotes.map((note, index) => (
            <Note key={index} note={note} getNotes={getNotes} />
          ))}
        </div>
      ) : (
        <Intro />
      )}
    </section>
  );
};

export default App;
