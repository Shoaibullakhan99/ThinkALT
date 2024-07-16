import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import {jwtDecode} from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);
    setUser(decoded);

    axiosInstance.get("/api/users/fetchAll")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch users. Please try again.");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditedData({
      username: user.username || '',
      phoneNumber: user.phoneNumber || ''
    });
  };

  const handleSave = () => {
    axiosInstance.put(`/api/users/edit/${editingUser._id}`, editedData)
      .then((res) => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u._id === editingUser._id ? { ...u, ...editedData } : u))
        );
        setEditingUser(null);
        toast.success("User updated successfully!");
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err);
        toast.error("Failed to update user");
      });
  };

  const handleDelete = (id) => {
    axiosInstance.delete(`/api/users/remove/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
        toast.success("User deleted successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete user");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <div className="mt-5">
      <h2>Welcome, {user.name}</h2>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
      <h3 className="mt-4">Registered Users</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phoneNumber}</td>
              <td>{u.profession}</td>
              <td>
                <button onClick={() => handleEdit(u)} className="btn btn-warning">
                  Edit
                </button>
                <button onClick={() => handleDelete(u._id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <div className="mt-3">
          <h4>Edit User</h4>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={editedData.username || ''}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={editedData.phoneNumber || ''}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
