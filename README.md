# 🎓 Mikono VTC Student Registration System

A full-stack **Student Registration and Management System** developed for **Mikono Vocational Training Centre (Mikono VTC)**.

The system is designed to simplify the process of registering, managing, searching, and maintaining student records while providing a practical demonstration of skills in **Web Development, Database Systems, Python, Software Engineering**.

---

## 📌 Project Overview

The Mikono VTC Student Registration System is a web-based application that allows an institution to manage student information digitally instead of relying entirely on manual paperwork.

The project is developed progressively, starting with a simple frontend and gradually introducing JavaScript, a Python backend, and a relational database.

The project is also part of my personal **software development portfolio** and demonstrates my ability to plan, develop, test, document, and deploy a complete application.

---

## 🎯 Project Objectives

The main objectives of this project are to:

* Create a digital student registration system.
* Replace manual student registration with a computerized system.
* Store student information in a structured database.
* Allow staff to view registered students.
* Allow staff to search for students.
* Allow staff to edit student information.
* Allow staff to delete student records.
* Associate students with vocational courses.
* Track student enrollment dates.
* Practice frontend web development.
* Practice backend development using Python.
* Practice relational database management.
* Apply software engineering principles.
* Practice Git and GitHub version control.
* Build a professional portfolio project.

---

# 🏫 Institution

**Mikono Vocational Training Centre**

The system is designed around the needs of a vocational training centre offering practical and technical training programmes.

### Initial Courses

The system supports courses such as:

* Tailoring & Dressmaking
* ICT Basic Computer Packages
* Beauty Therapy & Salon
* Welding & Fabrication
* Light Motor Vehicle Mechanics
* Electrical Wiring
* Web Development & Design
* Database Systems & Management

---

# ✨ Features

## 👨‍🎓 Student Registration

Staff can register students using information such as:

* First Name
* Last Name
* Phone Number
* Email Address
* Course Selection
* Enrollment Date

---

## 👥 Student Management

The system allows authorized users to:

* ✅ View all registered students
* ✅ Search students by name, course, or phone
* ✅ Filter students by course
* ✅ Edit student information
* ✅ Delete student records
* ✅ Export student data to CSV

---

## 🔎 Student Search

Users can search for students using:

* Student name (first or last)
* Course name
* Phone number

Real-time filtering with combined search and course filter.

---

## 📊 Student Statistics

Live statistics showing:

* Total registered students
* Currently displayed students (after filtering)

---

# 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)
* Fetch API

### Backend

* Python 3
* Flask (Web Framework)
* Flask-CORS

### Database

* MySQL
* Relational database design with 3 tables: `students`, `courses`, `enrollments`

### Development Tools

* Visual Studio Code
* Git & GitHub
* MySQL Workbench
* macOS Terminal

---

# 🏗️ Architecture

The application follows a three-layer architecture:

```text
             USER
               │
               ▼
        ┌───────────────┐
        │   FRONTEND    │
        │ HTML/CSS/JS   │
        └───────┬───────┘
                │ HTTP/JSON
                ▼
        ┌───────────────┐
        │    BACKEND    │
        │  Python Flask │
        └───────┬───────┘
                │ SQL
                ▼
        ┌───────────────┐
        │   DATABASE    │
        │     MySQL     │
        └───────────────┘
```

---

# 📁 Project Structure

```text
mikono-student-registration/
│
├── frontend/
│   ├── index.html          # Main registration page
│   ├── style.css           # Styling
│   └── script.js           # Frontend logic & API calls
│
├── backend/
│   ├── app.py              # Flask application
│   ├── config.py           # Database configuration
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Environment variables (not committed)
│
├── database/
│   └── schema.sql          # MySQL database schema
│
├── screenshots/
│   ├── registration-form.png
│   ├── students-table.png
│   └── backend-connected.png
│
├── .gitignore
├── README.md
└── requirements.txt
```

---

# 🗄️ Database Design

The database uses a relational structure with three tables:

### Students Table

Stores student personal information:

```text
student_id (PRIMARY KEY)
first_name
last_name
phone
email
created_at
updated_at
```

### Courses Table

Stores available vocational courses:

```text
course_id (PRIMARY KEY)
course_name (UNIQUE)
description
duration_months
```

### Enrollments Table

Connects students to courses:

```text
enrollment_id (PRIMARY KEY)
student_id (FOREIGN KEY → students)
course_id (FOREIGN KEY → courses)
enrollment_date
status (Active, Completed, Dropped, On Hold)
```

---

# 🚀 Installation

## Prerequisites

Before running the application, ensure you have:

* **Python 3.8+** installed
* **MySQL** installed and running
* **Git** installed
* **Visual Studio Code** (recommended)
* A modern web browser (Chrome, Firefox, Safari)

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/mikono-student-registration.git
```

Enter the project directory:

```bash
cd mikono-student-registration
```

---

## 2. Set Up MySQL Database

Open MySQL and run the schema file:

```bash
mysql -u root -p < database/schema.sql
```

Enter your MySQL password when prompted.

This creates:
- Database: `mikono_vtc`
- Tables: `students`, `courses`, `enrollments`
- Initial data: 8 vocational courses

---

## 3. Set Up Python Backend

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create a `.env` file in the `backend/` folder:

```bash
nano .env
```

Add your database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=mikono_vtc
FLASK_ENV=development
FLASK_PORT=5000
```

Replace `your_mysql_password` with your actual MySQL password.

---

## 5. Run the Backend Server

With the virtual environment activated:

```bash
python app.py
```

You should see:
🚀 Starting Mikono VTC API server...
📍 Server running on http://localhost:5000
💾 Connected to database: mikono_vtc

---

## 6. Open the Frontend

Open `frontend/index.html` in your browser:

**Option A:** Double-click the file in your file explorer

**Option B:** Use VS Code Live Server extension

**Option C:** Open directly in browser

---

## 7. Test the Application

1. Fill in the registration form
2. Click "Register Student"
3. View the student in the table below
4. Test search, filter, edit, and delete features

---

# 🧪 API Endpoints

### Health Check
GET /api/courses

Returns list of available courses.

---

### Get All Students
GET /api/students

Returns all registered students with their course information.

---

### Register New Student
POST /api/students

Request body:

```json
{
  "firstName": "John",
  "lastName": "Kamau",
  "phone": "0712345678",
  "email": "john@example.com",
  "course": "ICT Basic Computer Packages",
  "enrollmentDate": "2026-09-05"
}
```

---

### Update Student
PUT /api/students/<student_id>

---

### Delete Student
DELETE /api/students/<student_id>

---

# 🔄 Git Workflow

Basic workflow used during development:

```bash
git status
git add .
git commit -m "Descriptive commit message"
git push
```

---

# 📋 Example Git Commit Messages

```text
Initial project setup
Add student registration form
Add responsive CSS styling
Add JavaScript form validation
Add student list with search and filter
Implement CRUD operations
Create database schema
Add Python Flask backend
Connect frontend to backend API
Implement student CRUD via API
Add course filter dropdown
Export to CSV functionality
Prepare final portfolio release
```

---

# 🎓 Learning Outcomes

By completing this project, I demonstrated practical skills in:

### Web Development

* HTML5 semantic structure
* CSS3 styling and responsive design
* JavaScript DOM manipulation
* Fetch API for HTTP requests
* Async/await patterns
* Form validation

### Database Systems

* Relational database design
* SQL (CREATE, INSERT, SELECT, UPDATE, DELETE)
* Primary and foreign keys
* Table relationships (one-to-many)
* Indexes for performance
* Data normalization

### Python

* Python 3 programming
* Flask web framework
* RESTful API design
* Database connectivity (mysql-connector)
* Environment variables
* Error handling
* JSON serialization

### Software Engineering

* Requirements analysis
* Project planning and documentation
* Version control with Git/GitHub
* Testing and debugging
* README documentation
* Software architecture (3-tier)

### Entrepreneurship

The project demonstrates how technology can solve real institutional problems by digitizing student registration and management processes.

---

# 🌱 Future Improvements

Possible future features include:

* Student login portal
* Instructor/admin authentication
* Dashboard with statistics and charts
* Student attendance tracking
* Fee/payment tracking
* Examination results management
* Course completion tracking
* Certificate generation
* SMS/email notifications
* Student ID card generation
* PDF report generation
* Advanced analytics
* Cloud deployment (AWS, Heroku, Railway)
* Mobile application (Flutter)
* Role-based permissions
* Bulk student import (Excel/CSV)
* Student profile photos
* Email verification
* Password reset functionality

---

# 🏆 Portfolio Value

This project demonstrates the complete software development lifecycle:

```text
PROBLEM IDENTIFICATION
   ↓
REQUIREMENTS ANALYSIS
   ↓
PROJECT PLANNING
   ↓
UI/UX DESIGN
   ↓
FRONTEND DEVELOPMENT
   ↓
DATABASE DESIGN
   ↓
BACKEND DEVELOPMENT
   ↓
API INTEGRATION
   ↓
TESTING & DEBUGGING
   ↓
DOCUMENTATION
   ↓
VERSION CONTROL
   ↓
DEPLOYMENT PREPARATION
```

Rather than presenting only a piece of code, this project demonstrates the ability to take a real-world problem and develop a working technology solution from start to finish.

---

# 📚 Project Status

**Current Status:** 🟢 Fully Functional (MVP Complete)

### Completed ✅

* [x] Project idea defined
* [x] Requirements identified
* [x] Initial project structure planned
* [x] README created
* [x] HTML registration form
* [x] CSS styling
* [x] JavaScript form handling
* [x] Student display table
* [x] Search functionality
* [x] Edit student feature
* [x] Delete student feature
* [x] Course filter dropdown
* [x] Student count statistics
* [x] CSV export functionality
* [x] MySQL database created
* [x] Database schema with 3 tables
* [x] Python Flask backend
* [x] RESTful API endpoints (GET, POST, PUT, DELETE)
* [x] Frontend-backend integration
* [x] Error handling
* [x] Screenshots added
* [x] GitHub repository

### In Progress 🟡

* [ ] Student detail view modal
* [ ] Dashboard statistics page
* [ ] User authentication system
* [ ] Responsive mobile improvements

### Upcoming 🔵

* [ ] Cloud deployment
* [ ] Advanced reporting features
* [ ] Student attendance module
* [ ] Fee tracking system
* [ ] Certificate generation

---

# 👨‍💻 Developer

**Farah Salat**

This project was developed as part of my ongoing software development and digital skills learning journey.

📍 Mombasa, Kenya

---

# 📄 License

This project is intended primarily for educational and portfolio purposes.

---

# ⭐ Acknowledgments

* Mikono Vocational Training Centre for the inspiration
* Open-source community for tools and libraries
* MySQL, Flask, and JavaScript documentation

---

# 📞 Contact

For questions or collaboration opportunities, connect via GitHub or LinkedIn.

---

# 🎯 Final Goal

The ultimate goal is to transform this project from a student registration prototype into a fully functional **Student Management System for Mikono Vocational Training Centre**.

The finished application demonstrates that I can independently:

> **Plan → Design → Code → Test → Document → Deploy**

a real-world software solution.

---

**Last Updated:** September 2026