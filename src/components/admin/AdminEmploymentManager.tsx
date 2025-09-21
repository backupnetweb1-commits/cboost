import React, { useState } from "react";

type EmploymentApp = {
  id: number;
  name: string;
  position: string;
};

const initialApps: EmploymentApp[] = [
  { id: 1, name: "Alice Smith", position: "Developer" },
  { id: 2, name: "Bob Lee", position: "Designer" },
];

const AdminEmploymentManager: React.FC = () => {
  const [apps, setApps] = useState<EmploymentApp[]>(initialApps);
  const [newName, setNewName] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPosition, setEditPosition] = useState("");

  // Create
  const handleAdd = () => {
    if (!newName || !newPosition) return;
    setApps([
      ...apps,
      { id: Date.now(), name: newName, position: newPosition },
    ]);
    setNewName("");
    setNewPosition("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setApps(apps.filter((app) => app.id !== id));
  };

  // Edit
  const startEdit = (app: EmploymentApp) => {
    setEditId(app.id);
    setEditName(app.name);
    setEditPosition(app.position);
  };
  const handleUpdate = () => {
    if (editId === null || !editName || !editPosition) return;
    setApps(apps.map(app => app.id === editId ? { ...app, name: editName, position: editPosition } : app));
    setEditId(null);
    setEditName("");
    setEditPosition("");
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Manage Employment Screen</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add New Application</h4>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Position"
          value={newPosition}
          onChange={e => setNewPosition(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Applications</h4>
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map(app => (
            <tr key={app.id}>
              <td className="p-2">{app.name}</td>
              <td className="p-2">{app.position}</td>
              <td className="p-2">
                <button onClick={() => startEdit(app)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(app.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Application</h4>
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="text"
            value={editPosition}
            onChange={e => setEditPosition(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
          <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminEmploymentManager;
