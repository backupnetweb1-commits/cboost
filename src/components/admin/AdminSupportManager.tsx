// import React, { useState } from "react";

// type Ticket = {
//   id: number;
//   subject: string;
//   status: string;
// };

// const initialTickets: Ticket[] = [
//   { id: 1, subject: "Login Issue", status: "Open" },
//   { id: 2, subject: "Payment Failed", status: "Closed" },
// ];

// const AdminSupportManager: React.FC = () => {
//   const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
//   const [newSubject, setNewSubject] = useState("");
//   const [newStatus, setNewStatus] = useState("");
//   const [editId, setEditId] = useState<number | null>(null);
//   const [editSubject, setEditSubject] = useState("");
//   const [editStatus, setEditStatus] = useState("");

//   // Create
//   const handleAdd = () => {
//     if (!newSubject || !newStatus) return;
//     setTickets([
//       ...tickets,
//       { id: Date.now(), subject: newSubject, status: newStatus },
//     ]);
//     setNewSubject("");
//     setNewStatus("");
//   };

//   // Delete
//   const handleDelete = (id: number) => {
//     setTickets(tickets.filter((ticket) => ticket.id !== id));
//   };

//   // Edit
//   const startEdit = (ticket: Ticket) => {
//     setEditId(ticket.id);
//     setEditSubject(ticket.subject);
//     setEditStatus(ticket.status);
//   };
//   const handleUpdate = () => {
//     if (editId === null || !editSubject || !editStatus) return;
//     setTickets(tickets.map(ticket => ticket.id === editId ? { ...ticket, subject: editSubject, status: editStatus } : ticket));
//     setEditId(null);
//     setEditSubject("");
//     setEditStatus("");
//   };

//   return (
//     <div>
//       <h3 className="text-xl font-bold mb-2">Manage Support Screen</h3>
//       <div className="mb-4">
//         <h4 className="font-semibold mb-2">Add New Ticket</h4>
//         <input
//           type="text"
//           placeholder="Subject"
//           value={newSubject}
//           onChange={e => setNewSubject(e.target.value)}
//           className="border px-2 py-1 mr-2"
//         />
//         <input
//           type="text"
//           placeholder="Status"
//           value={newStatus}
//           onChange={e => setNewStatus(e.target.value)}
//           className="border px-2 py-1 mr-2"
//         />
//         <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
//       </div>
//       <h4 className="font-semibold mb-2">Support Tickets</h4>
//       <table className="w-full mb-4 border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">Subject</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tickets.map(ticket => (
//             <tr key={ticket.id}>
//               <td className="p-2">{ticket.subject}</td>
//               <td className="p-2">{ticket.status}</td>
//               <td className="p-2">
//                 <button onClick={() => startEdit(ticket)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
//                 <button onClick={() => handleDelete(ticket.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {editId !== null && (
//         <div className="mb-4">
//           <h4 className="font-semibold mb-2">Edit Ticket</h4>
//           <input
//             type="text"
//             value={editSubject}
//             onChange={e => setEditSubject(e.target.value)}
//             className="border px-2 py-1 mr-2"
//           />
//           <input
//             type="text"
//             value={editStatus}
//             onChange={e => setEditStatus(e.target.value)}
//             className="border px-2 py-1 mr-2"
//           />
//           <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
//           <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminSupportManager;



import React, { useState } from "react";

interface ContactPayload {
  fullName: string;
  email: string;
  whatsappNumber: string;
  subject: string;
  message: string;
}

type Contact = ContactPayload & { id: number };

const initialContacts: Contact[] = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    whatsappNumber: "+1234567890",
    subject: "Partnership Inquiry",
    message: "I’d like to discuss potential collaboration.",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane@example.com",
    whatsappNumber: "+9876543210",
    subject: "Support Needed",
    message: "Having issues with account login.",
  },
];

const AdminSupportManager: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  // New form state
  const [newContact, setNewContact] = useState<ContactPayload>({
    fullName: "",
    email: "",
    whatsappNumber: "",
    subject: "",
    message: "",
  });

  // Edit state
  const [editId, setEditId] = useState<number | null>(null);
  const [editContact, setEditContact] = useState<ContactPayload>({
    fullName: "",
    email: "",
    whatsappNumber: "",
    subject: "",
    message: "",
  });

  // Add contact
  const handleAdd = () => {
    if (
      !newContact.fullName ||
      !newContact.email ||
      !newContact.whatsappNumber ||
      !newContact.subject ||
      !newContact.message
    )
      return;

    setContacts([...contacts, { ...newContact, id: Date.now() }]);
    setNewContact({
      fullName: "",
      email: "",
      whatsappNumber: "",
      subject: "",
      message: "",
    });
  };

  // Delete contact
  const handleDelete = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  // Start edit
  const startEdit = (contact: Contact) => {
    setEditId(contact.id);
    setEditContact({
      fullName: contact.fullName,
      email: contact.email,
      whatsappNumber: contact.whatsappNumber,
      subject: contact.subject,
      message: contact.message,
    });
  };

  // Update contact
  const handleUpdate = () => {
    if (editId === null) return;

    setContacts(
      contacts.map((c) =>
        c.id === editId ? { ...c, ...editContact } : c
      )
    );

    setEditId(null);
    setEditContact({
      fullName: "",
      email: "",
      whatsappNumber: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className=" mt-16">
      <h3 className="text-xl font-bold mb-2">Manage Contact Messages</h3>

      {/* Add New Contact */}
      {/* <div className="mb-6">
        <h4 className="font-semibold mb-2">Add New Contact</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            placeholder="Full Name"
            value={newContact.fullName}
            onChange={(e) =>
              setNewContact({ ...newContact, fullName: e.target.value })
            }
            className="border px-2 py-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
            className="border px-2 py-1"
          />
          <input
            type="text"
            placeholder="WhatsApp Number"
            value={newContact.whatsappNumber}
            onChange={(e) =>
              setNewContact({
                ...newContact,
                whatsappNumber: e.target.value,
              })
            }
            className="border px-2 py-1"
          />
          <input
            type="text"
            placeholder="Subject"
            value={newContact.subject}
            onChange={(e) =>
              setNewContact({ ...newContact, subject: e.target.value })
            }
            className="border px-2 py-1"
          />
        </div>
        <textarea
          placeholder="Message"
          value={newContact.message}
          onChange={(e) =>
            setNewContact({ ...newContact, message: e.target.value })
          }
          className="border px-2 py-1 w-full mb-2"
          rows={3}
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add Contact
        </button>
      </div> */}

      {/* Contact List */}
      <h4 className="font-semibold mb-2">Contact Messages</h4>
      <table className="w-full mb-4 rounded bg-muted border">
        <thead>
          <tr className="bg">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">WhatsApp</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Message</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td className="p-2">{c.fullName}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.whatsappNumber}</td>
              <td className="p-2">{c.subject}</td>
              <td className="p-2">{c.message}</td>
              <td className="p-2">
                <button
                  onClick={() => startEdit(c)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Contact</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Full Name"
              value={editContact.fullName}
              onChange={(e) =>
                setEditContact({ ...editContact, fullName: e.target.value })
              }
              className="border px-2 py-1"
            />
            <input
              type="email"
              placeholder="Email"
              value={editContact.email}
              onChange={(e) =>
                setEditContact({ ...editContact, email: e.target.value })
              }
              className="border px-2 py-1"
            />
            <input
              type="text"
              placeholder="WhatsApp Number"
              value={editContact.whatsappNumber}
              onChange={(e) =>
                setEditContact({
                  ...editContact,
                  whatsappNumber: e.target.value,
                })
              }
              className="border px-2 py-1"
            />
            <input
              type="text"
              placeholder="Subject"
              value={editContact.subject}
              onChange={(e) =>
                setEditContact({
                  ...editContact,
                  subject: e.target.value,
                })
              }
              className="border px-2 py-1"
            />
          </div>
          <textarea
            placeholder="Message"
            value={editContact.message}
            onChange={(e) =>
              setEditContact({ ...editContact, message: e.target.value })
            }
            className="border px-2 py-1 w-full mb-2"
            rows={3}
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Update
          </button>
          <button
            onClick={() => setEditId(null)}
            className="ml-2 px-3 py-1 rounded border"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSupportManager;
