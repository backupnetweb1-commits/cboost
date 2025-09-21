import React, { useState } from "react";

// The same User type as before
type User = {
  id: number;
  name: string;
  referralCode: string;
  referredCount: number;
  balance: number;
  lastActive: string;
  referredUsers: number[];
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "Sam",
    referralCode: "SAM123",
    referredCount: 3,
    balance: 50.0,
    lastActive: "2025-09-18",
    referredUsers: [2],
  },
  {
    id: 2,
    name: "Alex",
    referralCode: "ALEX456",
    referredCount: 5,
    balance: 75.5,
    lastActive: "2025-09-19",
    referredUsers: [],
  },
];

// New data for users who purchased a referral
const initialPurchasedReferrals: User[] = [
  {
    id: 3,
    name: "Lisa",
    referralCode: "LISA789",
    referredCount: 0,
    balance: 5.0,
    lastActive: "2025-09-20",
    referredUsers: [],
  },
  {
    id: 4,
    name: "Mike",
    referralCode: "MIKE012",
    referredCount: 0,
    balance: 15.0,
    lastActive: "2025-09-20",
    referredUsers: [],
  },
];

const AdminReferringManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [purchasedReferrals, setPurchasedReferrals] = useState<User[]>(initialPurchasedReferrals);
  const [activeTab, setActiveTab] = useState<'users' | 'market'>('users');
  const [showUserDetails, setShowUserDetails] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: "", referralCode: "", balance: "" });
  const [editUser, setEditUser] = useState<User | null>(null);
  const [referralTargetUser, setReferralTargetUser] = useState<User | null>(null);
  const [referredUserId, setReferredUserId] = useState("");
  const [assigningUser, setAssigningUser] = useState<User | null>(null);
  const [assignToUserId, setAssignToUserId] = useState("");

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.referralCode || !newUser.balance) return;
    const newUserData = {
      id: Date.now(),
      name: newUser.name,
      referralCode: newUser.referralCode,
      referredCount: 0,
      balance: Number(newUser.balance),
      lastActive: new Date().toISOString().slice(0, 10),
      referredUsers: [],
    };
    setUsers([...users, newUserData]);
    setNewUser({ name: "", referralCode: "", balance: "" });
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    setPurchasedReferrals(purchasedReferrals.filter((user) => user.id !== id));
    setShowUserDetails(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editUser) {
      setEditUser({ ...editUser, [name]: value });
    }
  };

  const startEdit = (user: User) => {
    setEditUser(user);
    setShowUserDetails(null);
  };

  const handleUpdate = () => {
    if (editUser) {
      setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
      setEditUser(null);
    }
  };

  const viewDetails = (user: User) => {
    setShowUserDetails(user);
    setEditUser(null);
    setReferralTargetUser(null);
  };

  const startAddReferral = (user: User) => {
    setReferralTargetUser(user);
    setShowUserDetails(null);
    setEditUser(null);
  };

  const handleAddReferral = () => {
    if (!referralTargetUser || !referredUserId) return;
    const referredId = Number(referredUserId);
    const referredUser = users.find(user => user.id === referredId);
    if (referredUser && !referralTargetUser.referredUsers.includes(referredId)) {
      setUsers(prevUsers =>
        prevUsers.map(user => {
          if (user.id === referralTargetUser.id) {
            return {
              ...user,
              referredUsers: [...user.referredUsers, referredId],
              referredCount: user.referredCount + 1,
            };
          }
          return user;
        })
      );
      setReferredUserId("");
      setReferralTargetUser(null);
    } else {
      alert("Invalid user ID or user is already a referral.");
    }
  };

  const startAssignReferral = (user: User) => {
    setAssigningUser(user);
    setAssignToUserId(""); // Reset assignment input
  };

  const assignReferral = () => {
    if (!assigningUser || !assignToUserId) return;

    const referrerId = Number(assignToUserId);
    const referrer = users.find(user => user.id === referrerId);

    if (referrer) {
      // 1. Update the referrer's user data
      setUsers(users.map(user =>
        user.id === referrer.id
          ? {
              ...user,
              referredUsers: [...user.referredUsers, assigningUser.id],
              referredCount: user.referredCount + 1,
            }
          : user
      ));

      // 2. Remove the user from the purchased referrals list
      setPurchasedReferrals(purchasedReferrals.filter(u => u.id !== assigningUser.id));

      // 3. Clear state
      setAssigningUser(null);
      setAssignToUserId("");
    } else {
      alert("Referrer not found. Please enter a valid user ID.");
    }
  };

  return (
    <div className="bg-background-900  mt-16 text-primary-100 p-6 min-h-screen font-sans">
      <h3 className="text-3xl font-bold mb-6 text-primary-400">Admin Panel - User Management</h3>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-background-700">
        <button
          onClick={() => setActiveTab('users')}
          className={`py-2 px-4 text-lg font-semibold border-b-2 transition-colors duration-300 ${
            activeTab === 'users' ? 'border-primary-500 text-primary-500' : 'border-transparent text-primary-200 hover:text-primary-400'
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab('market')}
          className={`py-2 px-4 text-lg font-semibold border-b-2 transition-colors duration-300 ${
            activeTab === 'market' ? 'border-primary-500 text-primary-500' : 'border-transparent text-primary-200 hover:text-primary-400'
          }`}
        >
          Referral Market
        </button>
      </div>

      {/* Main Content based on activeTab */}
      {activeTab === 'users' && (
        <>
          {/* Add New User Section */}
          <div className="bg-background-800 p-6 rounded-lg shadow-xl mb-8">
            <h4 className="text-xl font-semibold mb-4 text-primary-300">Add New User</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newUser.name}
                onChange={handleNewUserChange}
                className="border border-background-600 bg-background-700 text-primary-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="text"
                name="referralCode"
                placeholder="Referral Code"
                value={newUser.referralCode}
                onChange={handleNewUserChange}
                className="border border-background-600 bg-background-700 text-primary-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                name="balance"
                placeholder="Balance"
                value={newUser.balance}
                onChange={handleNewUserChange}
                className="border border-background-600 bg-background-700 text-primary-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={handleAddUser}
              className="mt-6 w-full md:w-auto bg-primary-500 text-background-900 font-bold px-6 py-3 rounded-md hover:bg-primary-600 transition duration-300"
            >
              Add User
            </button>
          </div>

          {/* User List Section */}
          <div className="bg-background-800 p-6 rounded-lg shadow-xl mb-8">
            <h4 className="text-xl font-semibold mb-4 text-primary-300">User List</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-background-700 text-primary-200">
                    <th className="p-4 rounded-tl-lg">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Referral Code</th>
                    <th className="p-4">Referred Count</th>
                    <th className="p-4">Balance</th>
                    <th className="p-4 rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-background-700 hover:bg-background-700 transition duration-200">
                      <td className="p-4">{user.id}</td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.referralCode}</td>
                      <td className="p-4">{user.referredCount}</td>
                      <td className="p-4 text-primary-300">${user.balance.toFixed(2)}</td>
                      <td className="p-4 flex flex-wrap gap-2">
                        <button
                          onClick={() => viewDetails(user)}
                          className="bg-primary-500 text-background-900 px-3 py-1 rounded-md text-sm font-semibold hover:bg-primary-600 transition"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => startEdit(user)}
                          className="bg-background-600 text-primary-100 px-3 py-1 rounded-md text-sm font-semibold hover:bg-background-500 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => startAddReferral(user)}
                          className="bg-green-700 text-primary-100 px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-600 transition"
                        >
                          Add Referral
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-700 text-primary-100 px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Edit User Section */}
          {editUser && (
            <div className="bg-background-800 p-6 rounded-lg shadow-xl mb-8">
              <h4 className="text-xl font-semibold mb-4 text-primary-300">Edit User Details</h4>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={editUser.name}
                  onChange={handleEditChange}
                  className="border border-background-600 bg-background-700 text-primary-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow"
                />
                <input
                  type="text"
                  name="referralCode"
                  placeholder="Referral Code"
                  value={editUser.referralCode}
                  onChange={handleEditChange}
                  className="border border-background-600 bg-background-700 text-primary-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow"
                />
                <input
                  type="number"
                  name="balance"
                  placeholder="Balance"
                  value={editUser.balance}
                  onChange={handleEditChange}
                  className="border border-background-600 bg-background-700 text-primary-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow"
                />
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="bg-primary-500 text-background-900 font-bold px-6 py-3 rounded-md hover:bg-primary-600 transition duration-300"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditUser(null)}
                  className="bg-background-600 text-primary-100 font-bold px-6 py-3 rounded-md hover:bg-background-500 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {/* Add Referral Section */}
          {referralTargetUser && (
            <div className="bg-background-800 p-6 rounded-lg shadow-xl mb-8">
              <h4 className="text-xl font-semibold mb-4 text-primary-300">Add Referral to {referralTargetUser.name}</h4>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="number"
                  placeholder="Enter ID of referred user"
                  value={referredUserId}
                  onChange={(e) => setReferredUserId(e.target.value)}
                  className="border border-background-600 bg-background-700 text-primary-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow"
                />
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleAddReferral}
                  className="bg-green-700 text-primary-100 font-bold px-6 py-3 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Confirm Referral
                </button>
                <button
                  onClick={() => setReferralTargetUser(null)}
                  className="bg-background-600 text-primary-100 font-bold px-6 py-3 rounded-md hover:bg-background-500 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* User Details Section */}
          {showUserDetails && (
            <div className="bg-background-800 p-6 rounded-lg shadow-xl">
              <h4 className="text-xl font-semibold mb-4 text-primary-300">User Details</h4>
              <div className="space-y-2">
                <p><strong>ID:</strong> {showUserDetails.id}</p>
                <p><strong>Name:</strong> {showUserDetails.name}</p>
                <p><strong>Referral Code:</strong> {showUserDetails.referralCode}</p>
                <p><strong>Referred Count:</strong> {showUserDetails.referredCount}</p>
                <p><strong>Balance:</strong> <span className="text-primary-300">${showUserDetails.balance.toFixed(2)}</span></p>
                <p><strong>Last Active:</strong> {showUserDetails.lastActive}</p>
                <p><strong>Referred Users (IDs):</strong> <span className="text-primary-300">{showUserDetails.referredUsers.length > 0 ? showUserDetails.referredUsers.join(", ") : "None"}</span></p>
              </div>
              <button
                onClick={() => setShowUserDetails(null)}
                className="mt-6 bg-background-600 text-primary-100 font-bold px-6 py-3 rounded-md hover:bg-background-500 transition duration-300"
              >
                Close Details
              </button>
            </div>
          )}
        </>
      )}

      {activeTab === 'market' && (
        <div className="bg-background-800 p-6 rounded-lg shadow-xl mb-8">
          <h4 className="text-xl font-semibold mb-4 text-primary-300">Referral Market</h4>
          <p className="text-primary-200 mb-4">Users who have bought a referral but are not yet assigned to a referrer.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-background-700 text-primary-200">
                  <th className="p-4 rounded-tl-lg">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Balance</th>
                  <th className="p-4 rounded-tr-lg">Assign to User</th>
                </tr>
              </thead>
              <tbody>
                {purchasedReferrals.map((user) => (
                  <tr key={user.id} className="border-b border-background-700 hover:bg-background-700 transition duration-200">
                    <td className="p-4">{user.id}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4 text-primary-300">${user.balance.toFixed(2)}</td>
                    <td className="p-4 flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Enter referrer ID"
                        value={assigningUser?.id === user.id ? assignToUserId : ""}
                        onChange={(e) => {
                          setAssigningUser(user);
                          setAssignToUserId(e.target.value);
                        }}
                        className="border border-background-600 bg-background-700 text-primary-100 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-32"
                      />
                      <button
                        onClick={assignReferral}
                        className="bg-green-700 text-primary-100 px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-600 transition"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReferringManager;