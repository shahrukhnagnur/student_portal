# student portal
Overview

This is a full-stack Student Management System built using React.js, Node.js, Express.js, and MongoDB. It allows users to manage student records with features like adding, viewing, editing, and deleting students. The application includes JWT authentication, a responsive design using Bootstrap, and modals for seamless user interactions.

Features

User Authentication (JWT-based login/logout)

CRUD Operations (Add, Edit, Delete, View students)

Responsive UI (Bootstrap-powered styling)

Secure API (Protected routes with JWT authentication)

Modals for Details (Smooth user experience)

RESTful API (Built with Express.js & MongoDB)

Tech Stack

Frontend: React.js, Bootstrap, Axios

Backend: Node.js, Express.js

Database: MongoDB (Mongoose for schema management)

Authentication: JSON Web Token (JWT)

Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/yourusername/student_portal.git
cd student_portal

2️⃣ Backend Setup

cd backend
npm install

Create a .env file in the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the backend server:

npm start

3️⃣ Frontend Setup

cd ../frontend
npm install

Start the React app:

npm start

The application will run at http://localhost:3000/.

API Endpoints

Method

Endpoint

Description

GET

/api/students/all

Fetch all students

POST

/api/students/add

Add a new student

PUT

/api/students/edit/:id

Edit student details

DELETE

/api/students/delete/:id

Remove a student

Deployment

Frontend: Deployed on Vercel/Netlify

Backend: Hosted on Render/Heroku
