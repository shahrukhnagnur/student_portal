const express = require('express');
const Student = require('../modals/studentModel'); // Fixed path
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, address, status } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newStudent = new Student({
      name,
      email,
      phone,
      address,
      status,
      userId: req.user.id, // Associate student with logged-in user
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error adding student:", error); // Log the actual error
    res.status(500).json({ error: error.message || "Error adding student" });
  }
});


// Get all students
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find({ userId: req.user.id });  // Fetch only user's students
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error fetching students" });
  }
});
// Get a single student by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student details
router.put('/update/:id', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a student
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
});

// Apply for a program
router.post('/:id/apply', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.applications = student.applications || [];
    student.applications.push(req.body);
    await student.save();

    res.json({ message: 'Application submitted', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get student applications
router.get('/:id/applications', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    res.json(student.applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
