import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "./NotesPage.css";

const NotesPage = () => {
  const { auth } = useAuth();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    const res = await axios.get("https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/notes/user-notes", {
      headers: { Authorization: auth.token },
    });
    setNotes(res.data.notes);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post("https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/notes/create", { title, content }, {
      headers: { Authorization: auth.token },
    });
    setTitle('');
    setContent('');
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/notes/${id}`, {
      headers: { Authorization: auth.token },
    });
    fetchNotes();
  };

  useEffect(() => { fetchNotes(); }, []);

  return (
    <div className="notes-container">
      <form onSubmit={handleCreate} className="note-form">
        <h2>Create Note</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content' />
        <button type='submit' className="btn-blue">Add Note</button>
      </form>

      <div className="notes-list">
        <h2>Your Notes</h2>
        {notes.map(note => (
          <div key={note._id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note._id)} className="btn-red">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
