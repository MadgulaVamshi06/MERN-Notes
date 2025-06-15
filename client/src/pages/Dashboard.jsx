import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { auth } = useAuth();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const { data } = await axios.get(
      "https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/notes/user-notes",
      {
        headers: { Authorization: auth.token },
      }
    );
    if (data.success) setNotes(data.notes);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/notes/create",
      { title, content },
      {
        headers: { Authorization: auth.token },
      }
    );
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/notes/${id}`, {
      headers: { Authorization: auth.token },
    });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Create Note</h2>
      <form onSubmit={handleCreate} className="space-y-4 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="border p-2 w-full"
        />
        <button className="bg-purple-600 text-white px-4 py-2">Add Note</button>
      </form>

      <h2 className="text-xl font-bold mb-4">Your Notes</h2>
      {notes.map((note) => (
        <div key={note._id} className="border p-4 mb-3 rounded">
          <h3 className="font-bold">{note.title}</h3>
          <p>{note.content}</p>
          <button
            onClick={() => handleDelete(note._id)}
            className="text-red-600 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
