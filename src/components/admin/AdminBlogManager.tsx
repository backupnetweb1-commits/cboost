import React, { useState } from "react";

type BlogPost = {
  id: number;
  title: string;
  content: string;
};

const initialPosts: BlogPost[] = [
  { id: 1, title: "Welcome to the Blog", content: "This is the first post." },
  { id: 2, title: "Investment Tips", content: "How to boost your investments." },
];

const AdminBlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Create
  const handleAdd = () => {
    if (!newTitle || !newContent) return;
    setPosts([
      ...posts,
      { id: Date.now(), title: newTitle, content: newContent },
    ]);
    setNewTitle("");
    setNewContent("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Edit
  const startEdit = (post: BlogPost) => {
    setEditId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };
  const handleUpdate = () => {
    if (editId === null || !editTitle || !editContent) return;
    setPosts(posts.map(post => post.id === editId ? { ...post, title: editTitle, content: editContent } : post));
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div>
      <h3 className="text-xl bg-background font-bold mb-2">Manage Blog Screen</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add New Blog Post</h4>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Content"
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
      </div>
      <h4 className="font-semibold mb-2">Blog Posts</h4>
      <table className="w-full mb-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Content</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td className="p-2">{post.title}</td>
              <td className="p-2">{post.content}</td>
              <td className="p-2">
                <button onClick={() => startEdit(post)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId !== null && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Edit Blog Post</h4>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="text"
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
          <button onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminBlogManager;
