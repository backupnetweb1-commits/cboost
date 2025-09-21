import React, { useState } from "react";

type Investment = {
  id: number;
  name: string;
  amount: number;
};

const initialInvestments: Investment[] = [
  { id: 1, name: "Growth Fund", amount: 10000 },
  { id: 2, name: "Tech Fund", amount: 5000 },
];

const AdminInvestmentManager: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>(initialInvestments);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");

  // Create
  const handleAdd = () => {
    if (!newName || !newAmount) return;
    setInvestments([
      ...investments,
      { id: Date.now(), name: newName, amount: Number(newAmount) },
    ]);
    setNewName("");
    setNewAmount("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setInvestments(investments.filter((inv) => inv.id !== id));
  };

  // Edit
  const startEdit = (inv: Investment) => {
    setEditId(inv.id);
    setEditName(inv.name);
    setEditAmount(inv.amount.toString());
  };
  const handleUpdate = () => {
    if (editId === null || !editName || !editAmount) return;
    setInvestments(investments.map(inv => inv.id === editId ? { ...inv, name: editName, amount: Number(editAmount) } : inv));
    setEditId(null);
    setEditName("");
    setEditAmount("");
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Manage Investment Screen</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add New Investment</h4>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newAmount}
          onChange={e => setNewAmount(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Investments</h4>
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {investments.map(inv => (
            <tr key={inv.id}>
              <td className="p-2">{inv.name}</td>
              <td className="p-2">{inv.amount}</td>
              <td className="p-2">
                <button onClick={() => startEdit(inv)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(inv.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Investment</h4>
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="number"
            value={editAmount}
            onChange={e => setEditAmount(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
          <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminInvestmentManager;
