import React, { useState } from 'react'

const AddNote = ({ getNotes }) => {
    const [note, setNote] = useState("");

    const addNote = async (e) => {     //default - get method                         //anything.json
        e.preventDefault();
        try {
            await fetch("https://firenote-bdeab-default-rtdb.firebaseio.com/notes.json", {
                method: "POST",
                body: JSON.stringify(note),
                headers: {
                    "Content-Type": "application/json" //case-sensitive
                }
            });
            // const resData = await response.json()
            // console.log(resData);
            setNote("");
            getNotes();
        } catch (err) {
            alert("something went wrong. Try again later.");
        }
    }

    return (
        <section onSubmit={addNote}>
            <form className='card'>
                <input type="text" placeholder='add note here' value={note}
                    onChange={e => setNote(e.target.value)} />
                <button className='submit-btn' >Add Note</button>
            </form>
        </section>
    )
}

export default AddNote