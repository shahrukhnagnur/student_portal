import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import StudentForm from "../pages/StudentForm"; 
import "bootstrap/dist/css/bootstrap.min.css";
import '../pages/main.css'

Modal.setAppElement("#root");

const Home = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/students/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error.response?.data || error.message);
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setViewModalIsOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setFormModalIsOpen(true);
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/students/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-primary text-center">Student Management</h1>
      
      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <button className="btn btn-danger w-100 shadow-lg" onClick={() => localStorage.removeItem("token") || (window.location.href = "/login")}>
            Logout
          </button>
        </div>
        <div className="col-12 col-md-6">
          <button className="btn btn-primary w-100 shadow-lg" onClick={() => { setSelectedStudent(null); setFormModalIsOpen(true); }}>
            + Add Student
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone || "N/A"}</td>
                <td>{student.address || "N/A"}</td>
                <td className="d-flex flex-wrap gap-2">
                  <button className="btn btn-info btn-sm" onClick={() => handleViewStudent(student)}>View</button>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEditStudent(student)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student View Modal */}
      <Modal isOpen={viewModalIsOpen} onRequestClose={() => setViewModalIsOpen(false)} className="modal-content p-4">
        {selectedStudent && (
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center text-primary">{selectedStudent.name}</h2>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Phone:</strong> {selectedStudent.phone || "N/A"}</p>
              <p><strong>Address:</strong> {selectedStudent.address || "N/A"}</p>
              <button className="btn btn-secondary w-100 mt-3" onClick={() => setViewModalIsOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Student Form Modal */}
      <Modal isOpen={formModalIsOpen} onRequestClose={() => setFormModalIsOpen(false)} className="modal-content p-4">
        <StudentForm fetchStudents={fetchStudents} closeModal={() => setFormModalIsOpen(false)} selectedStudent={selectedStudent} />
      </Modal>
    </div>
  );
};

export default Home;
