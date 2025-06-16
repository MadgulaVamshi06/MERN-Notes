import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const { data } = await axios.get(
      "https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/notes/user-notes",
      { headers: { Authorization: auth.token } }
    );
    if (data.success) setNotes(data.notes);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/notes/create",
      { title, content },
      { headers: { Authorization: auth.token } }
    );
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/notes/${id}`,
      { headers: { Authorization: auth.token } }
    );
    fetchNotes();
  };

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      <h2>Create Note</h2>
      <form onSubmit={handleCreate} className="note-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <button type="submit" className="btn-purple">Add Note</button>
      </form>

      <h2>Your Notes</h2>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note._id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button
              onClick={() => handleDelete(note._id)}
              className="btn-red"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
