import React, { useState } from "react";

type HomeContent = {
  id: number;
  title: string;
  description: string;
};

const initialContent: HomeContent[] = [
  { id: 1, title: "Welcome", description: "Welcome to Invest Boost Pro!" },
  { id: 2, title: "Get Started", description: "Learn how to start investing." },
];

const AdminHomeManager: React.FC = () => {
  const [contents, setContents] = useState<HomeContent[]>(initialContent);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Create
  const handleAdd = () => {
    if (!newTitle || !newDescription) return;
    setContents([
      ...contents,
      { id: Date.now(), title: newTitle, description: newDescription },
    ]);
    setNewTitle("");
    setNewDescription("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setContents(contents.filter((content) => content.id !== id));
  };

  // Edit
  const startEdit = (content: HomeContent) => {
    setEditId(content.id);
    setEditTitle(content.title);
    setEditDescription(content.description);
  };
  const handleUpdate = () => {
    if (editId === null || !editTitle || !editDescription) return;
    setContents(contents.map(content => content.id === editId ? { ...content, title: editTitle, description: editDescription } : content));
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Manage Home Screen</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add New Home Content</h4>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Home Contents</h4>
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(content => (
            <tr key={content.id}>
              <td className="p-2">{content.title}</td>
              <td className="p-2">{content.description}</td>
              <td className="p-2">
                <button onClick={() => startEdit(content)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(content.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Home Content</h4>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="text"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
          <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminHomeManager;
