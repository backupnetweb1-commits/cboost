import React, { useState } from "react";

type CryptoOption = {
  id: number;
  name: string;
  rate: number;
};

const initialOptions: CryptoOption[] = [
  { id: 1, name: "Bitcoin", rate: 45000 },
  { id: 2, name: "Ethereum", rate: 3200 },
];

const AdminBuyCryptoManager: React.FC = () => {
  const [options, setOptions] = useState<CryptoOption[]>(initialOptions);
  const [newName, setNewName] = useState("");
  const [newRate, setNewRate] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editRate, setEditRate] = useState("");

  // Create
  const handleAdd = () => {
    if (!newName || !newRate) return;
    setOptions([
      ...options,
      { id: Date.now(), name: newName, rate: Number(newRate) },
    ]);
    setNewName("");
    setNewRate("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setOptions(options.filter((opt) => opt.id !== id));
  };

  // Edit
  const startEdit = (opt: CryptoOption) => {
    setEditId(opt.id);
    setEditName(opt.name);
    setEditRate(opt.rate.toString());
  };
  const handleUpdate = () => {
    if (editId === null || !editName || !editRate) return;
    setOptions(options.map(opt => opt.id === editId ? { ...opt, name: editName, rate: Number(editRate) } : opt));
    setEditId(null);
    setEditName("");
    setEditRate("");
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Manage BuyCrypto Screen</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add New Crypto Option</h4>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          placeholder="Rate"
          value={newRate}
          onChange={e => setNewRate(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Crypto Options</h4>
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Rate</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {options.map(opt => (
            <tr key={opt.id}>
              <td className="p-2">{opt.name}</td>
              <td className="p-2">{opt.rate}</td>
              <td className="p-2">
                <button onClick={() => startEdit(opt)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(opt.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Crypto Option</h4>
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="number"
            value={editRate}
            onChange={e => setEditRate(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
          <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminBuyCryptoManager;
