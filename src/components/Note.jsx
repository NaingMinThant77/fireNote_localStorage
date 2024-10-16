import React from 'react'
import DeleteIcon from '../svgs/DeleteIcon'

const Note = ({note, getNotes}) => {
  const {note: text, key: id} = note;
  const deleteNote = async () => {
    try {
      const response = await fetch(`https://firenote-bdeab-default-rtdb.firebaseio.com/notes/${id}.json`, {method:"DELETE"})
    if(!response.ok) {
        throw new Error("Failed to delete this note.")
    }
    getNotes();
    } catch(err) {
      alert(err.message)
    }
  }
  return (
    <div className='card card-ctr'>
        <h3> + {text}</h3>
        <div onClick={deleteNote}>
            <DeleteIcon/>
        </div>
    </div>
  )
}

export default Note

//https://firenote-bdeab-default-rtdb.firebaseio.com/notes/-O9FXbvi5FMSGHM1gvCX.json - "time to study"