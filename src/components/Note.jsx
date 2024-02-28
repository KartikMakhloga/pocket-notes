import React, { useState, useEffect } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import "../App.css";
import { apiConnector } from '../services/apiconnector';
import { note } from '../services/apis';

const Note = ({ groupId, group }) => {
    const id = groupId;
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        // Fetch notes when component mounts or when groupId changes
        const fetchNotes = async (id) => {
            try {
                const response = await apiConnector(
                    "GET",
                    `${note.GET_NOTES_BY_GROUP}/${id}`,
                );
                console.log('response', response.data);
                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes(id);
    }, [groupId]);

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const handleSendNote = async () => {
        try {
            // logic for sending the note
            console.log('Sending note:', newNote);
            // Make an API call to add the new note to the group
            const response = await apiConnector("POST", note.CREATE_NOTE, { groupId:groupId, content: newNote });
            // Update the notes state with the newly added note
            setNotes([...notes, response.data]);
            // Clear the input field after sending the note
            setNewNote('');
        } catch (error) {
            console.error("Error sending note:", error);
        }
    };

    return (
        <>
            <div className='flex w-full bg-blue-900 h-12 gap-4 items-center pl-4'>
                <img className='h-9 w-9 rounded-full' src={`https://ui-avatars.com/api/?name=${group.name}&background=${group.color}&color-fff&rounded=true`}  alt="logo" />
                <h1 className='text-xl text-white'>{group.name}</h1>
            </div>
            <div className='w-full flex flex-col h-[27rem]  gap-3 mt-4 items-center overflow-y-auto custom-scroll'>
                {/* Display the fetched notes */}
                {notes.map((note, index) => (
                    <div className='w-11/12 bg-white shadow-lg p-4' key={index} style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    <p className='items-start'>{note.content}</p>
                </div>
                
                ))}
            </div>
            <div className='absolute w-full bottom-0'>
                {/* Input field for adding a new note */}
                <div className='flex w-full items-center justify-center gap-4 mt-4 bg-blue-900 h-44 rounded-bl-xl'>
                    <textarea
                        className='flex w-full gap-4 mt-7 h-4/6 bg-white m-8 p-4 custom-scroll resize-none rounded-lg'
                        placeholder='Enter your text here.................'
                        value={newNote}
                        onChange={handleNoteChange}
                    />
                    <button
                        className={'absolute bottom-12 right-12 rounded-lg  text-xl' + (newNote.trim() ? ' text-blue-900' : ' text-slate-400')}
                        onClick={handleSendNote}
                        disabled={!newNote.trim()} // Disable if the note is empty or contains only whitespace
                    >
                        <IoSendSharp />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Note;