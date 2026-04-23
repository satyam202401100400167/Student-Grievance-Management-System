import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const initialForm = {
  title: "",
  description: "",
  category: "Academic"
};

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);

  const [formData, setFormData] = useState(initialForm);
  const [grievances, setGrievances] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [statusValue, setStatusValue] = useState("Pending");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchGrievances = async () => {
    try {
      const response = await api.get("/api/grievances");
      setGrievances(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch grievances");
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitGrievance = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await api.post("/api/grievances", formData);
      setFormData(initialForm);
      setMessage("Grievance submitted successfully");
      fetchGrievances();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit grievance");
    }
  };

  const handleSearch = async () => {
    setError("");
    try {
      if (!search.trim()) {
        fetchGrievances();
        return;
      }
      const response = await api.get(`/api/grievances/search?title=${encodeURIComponent(search)}`);
      setGrievances(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    setMessage("");
    try {
      await api.delete(`/api/grievances/${id}`);
      setMessage("Grievance deleted successfully");
      fetchGrievances();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const startEdit = (grievance) => {
    setEditId(grievance._id);
    setStatusValue(grievance.status);
  };

  const saveEdit = async (id) => {
    setError("");
    setMessage("");
    try {
      await api.put(`/api/grievances/${id}`, { status: statusValue });
      setEditId(null);
      setMessage("Status updated successfully");
      fetchGrievances();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>Student Grievance Dashboard</h1>
        <div>
          <span className="welcome">Welcome, {user.name || "Student"}</span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <div className="grid">
        <section className="card">
          <h2>Submit Grievance</h2>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmitGrievance} className="form-grid">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" value={formData.title} onChange={handleFormChange} required />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleFormChange}>
              <option value="Academic">Academic</option>
              <option value="Hostel">Hostel</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>

            <button type="submit">Submit</button>
          </form>
        </section>

        <section className="card">
          <h2>Your Grievances</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {grievances.length === 0 ? (
                  <tr>
                    <td colSpan="5">No grievances found</td>
                  </tr>
                ) : (
                  grievances.map((item) => (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>
                        {editId === item._id ? (
                          <select value={statusValue} onChange={(e) => setStatusValue(e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        ) : (
                          item.status
                        )}
                      </td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                      <td className="actions">
                        {editId === item._id ? (
                          <button onClick={() => saveEdit(item._id)}>Save</button>
                        ) : (
                          <button onClick={() => startEdit(item)}>Update</button>
                        )}
                        <button className="danger" onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
