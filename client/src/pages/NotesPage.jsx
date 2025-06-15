import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const NotesPage = () => {
  const { auth } = useAuth();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/notes/user-notes", {
      headers: { Authorization: auth.token },
    });
    setNotes(res.data.notes);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/v1/notes/create", { title, content }, {
      headers: { Authorization: auth.token },
    });
    setTitle('');
    setContent('');
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/v1/notes/${id}`, {
      headers: { Authorization: auth.token },
    });
    fetchNotes();
  };

  useEffect(() => { fetchNotes(); }, []);

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content' />
        <button type='submit'>Create</button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;