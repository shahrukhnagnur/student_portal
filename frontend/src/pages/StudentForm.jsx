import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentForm = ({ fetchStudents, closeModal, selectedStudent }) => {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Pending",
  });

  useEffect(() => {
    if (selectedStudent) {
      setStudentData({
        name: selectedStudent.name || "",
        email: selectedStudent.email || "",
        phone: selectedStudent.phone || "",
        address: selectedStudent.address || "",
        status: selectedStudent.status || "Pending",
      });
    } else {
      setStudentData({ name: "", email: "", phone: "", address: "", status: "Pending" });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (selectedStudent) {
        await axios.put(
          `http://localhost:5000/api/students/update/${selectedStudent._id}`,
          studentData,
          config
        );
      } else {
        await axios.post("http://localhost:5000/api/students/add", studentData, config);
      }

      fetchStudents();
      closeModal();
      setStudentData({ name: "", email: "", phone: "", address: "", status: "Pending" });
    } catch (error) {
      console.error("Error saving student:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container p-4">
      <div className="card shadow-lg border-0 rounded p-4">
        <h2 className="text-center text-primary mb-4">
          {selectedStudent ? "Edit Student" : "Add Student"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input type="text" name="name" className="form-control" value={studentData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input type="email" name="email" className="form-control" value={studentData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Phone</label>
            <input type="text" name="phone" className="form-control" value={studentData.phone} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Address</label>
            <input type="text" name="address" className="form-control" value={studentData.address} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Application Status</label>
            <select name="status" className="form-select" value={studentData.status} onChange={handleChange} required>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success fw-bold">
              {selectedStudent ? "Update Student" : "Add Student"}
            </button>
            <button type="button" className="btn btn-outline-danger fw-bold" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
