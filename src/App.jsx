import React, { useEffect, useState } from 'react'
import AddNote from './components/AddNote'
import Note from './components/Note'
import Navbar from './components/Navbar'
import Intro from './components/Intro'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://firenote-bdeab-default-rtdb.firebaseio.com/notes.json")
      if (!response.ok) {
        throw new Error("Cannot connect to the firebase.")
      }
      const notes = await response.json();

      const modifiedNote = [];

      for (const key in notes) {
        modifiedNote.push({
          key, note: notes[key]
        });
      }

      setNotes(modifiedNote)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false);
  }

  return (
    <section className='form-border'>
      <Navbar totalNotes={notes.length} />
      {loading && !error && <p className='message'>Getting notes ...</p>}
      {error && <p className='message error'>{error}</p>}
      {
        !loading && !error &&
        (
          <>
            <AddNote getNotes={getNotes} />
            {notes.map((note, index) => (
              <Note key={index} note={note} getNotes={getNotes} />
            ))}
          </>
        )
      }
      {notes.length === 0 && <Intro/>}
    </section>
  )
}

export default App

