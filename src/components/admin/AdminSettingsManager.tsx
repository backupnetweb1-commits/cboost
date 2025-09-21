import React, { useState } from "react";

type Setting = {
  id: number;
  key: string;
  value: string;
};

const initialSettings: Setting[] = [
  { id: 1, key: "Site Title", value: "Invest Boost Pro" },
  { id: 2, key: "Theme", value: "Light" },
];

const AdminSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<Setting[]>(initialSettings);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editKey, setEditKey] = useState("");
  const [editValue, setEditValue] = useState("");

  // Create
  const handleAdd = () => {
    if (!newKey || !newValue) return;
    setSettings([
      ...settings,
      { id: Date.now(), key: newKey, value: newValue },
    ]);
    setNewKey("");
    setNewValue("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setSettings(settings.filter((setting) => setting.id !== id));
  };

  // Edit
  const startEdit = (setting: Setting) => {
    setEditId(setting.id);
    setEditKey(setting.key);
    setEditValue(setting.value);
  };
  const handleUpdate = () => {
    if (editId === null || !editKey || !editValue) return;
    setSettings(settings.map(setting => setting.id === editId ? { ...setting, key: editKey, value: editValue } : setting));
    setEditId(null);
    setEditKey("");
    setEditValue("");
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Manage Settings Screen</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add New Setting</h4>
        <input
          type="text"
          placeholder="Key"
          value={newKey}
          onChange={e => setNewKey(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Value"
          value={newValue}
          onChange={e => setNewValue(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Settings</h4>
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Key</th>
            <th className="p-2">Value</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {settings.map(setting => (
            <tr key={setting.id}>
              <td className="p-2">{setting.key}</td>
              <td className="p-2">{setting.value}</td>
              <td className="p-2">
                <button onClick={() => startEdit(setting)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(setting.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Setting</h4>
          <input
            type="text"
            value={editKey}
            onChange={e => setEditKey(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="text"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
          <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsManager;
