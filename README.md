# 🎓 Mikono VTC Student Registration System

A full-stack **Student Registration and Management System** developed for **Mikono Vocational Training Centre (Mikono VTC)**.

The system is designed to simplify the process of registering, managing, searching, and maintaining student records while providing a practical demonstration of skills in **Web Development, Database Systems, Python, Software Engineering**.

---

## 📌 Project Overview

The Mikono VTC Student Registration System is a web-based application that allows an institution to manage student information digitally instead of relying entirely on manual paperwork.

The project will be developed progressively over a two-week period, starting with a simple frontend and gradually introducing JavaScript, a Python backend, and a relational database.

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

The system will support courses such as:

* Tailoring & Dressmaking
* ICT Basic Computer Packages
* Beauty Therapy & Salon
* Welding & Fabrication
* Light Motor Vehicle Mechanics
* Electrical Wiring

Additional courses can be added in the future.

---

# ✨ Planned Features

## 👨‍🎓 Student Registration

Staff will be able to register students using information such as:

* Student ID
* Full name
* Gender
* Date of birth
* Phone number
* Email
* Address
* Course
* Enrollment date

---

## 👥 Student Management

The system will allow authorized users to:

* View students
* Search students
* Edit student information
* Delete student records
* View individual student profiles

---

## 🔎 Student Search

Users will be able to search for students using information such as:

* Student name
* Student ID
* Course
* Phone number

---

## 📚 Course Management

The system will associate students with their selected vocational courses.

Courses will be stored separately in the database so that the system can maintain proper relationships between students and courses.

---

## 📊 Dashboard

A future dashboard will provide useful statistics such as:

* Total students
* Students per course
* New registrations
* Active students
* Course enrollment statistics

Example:

```text
-----------------------------------------
        MIKONO VTC DASHBOARD
-----------------------------------------

Total Students        150

ICT Students            35
Tailoring Students      28
Beauty Therapy          25
Welding                 22
Motor Vehicle           20
Electrical              20

-----------------------------------------
```

---

# 🛠️ Technology Stack

The project will be developed using the following technologies:

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* Flask or FastAPI

### Database

* MySQL or PostgreSQL

### Development Tools

* Visual Studio Code
* macOS Terminal
* Git
* GitHub

---

# 🏗️ Planned Architecture

The final application will follow a basic three-layer architecture:

```text
             USER
               │
               ▼
        ┌───────────────┐
        │   FRONTEND    │
        │ HTML/CSS/JS   │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │    BACKEND    │
        │    Python     │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │   DATABASE    │
        │ MySQL/Postgres│
        └───────────────┘
```

---

# 📁 Project Structure

The project will initially start with:

```text
mikono-student-registration/
│
├── index.html
├── style.css
├── script.js
├── README.md
```

As the project develops, the structure will expand into something similar to:

```text
mikono-student-registration/
│
├── frontend/
│   ├── index.html
│   ├── students.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── models/
│   └── services/
│
├── database/
│   └── schema.sql
│
├── tests/
│
├── screenshots/
│
├── .gitignore
├── requirements.txt
└── README.md
```

The final structure may change as development progresses.

---

# 🗄️ Database Design

The database will use a relational structure.

The initial database will contain tables such as:

```text
students
courses
enrollments
users
```

### Students

The `students` table will contain information about individual students.

Example fields:

```text
student_id
first_name
last_name
gender
date_of_birth
phone
email
address
created_at
```

### Courses

The `courses` table will contain available vocational programmes.

Example:

```text
course_id
course_name
description
duration
```

### Enrollments

The `enrollments` table will connect students with courses.

Example:

```text
enrollment_id
student_id
course_id
enrollment_date
status
```

This structure allows one student to be associated with a course while keeping student and course information properly organized.

---

# 🔐 Security

Security will be considered as the application develops.

Planned security features include:

* User authentication
* Password hashing
* Role-based access
* Input validation
* Secure database queries
* Protection against SQL injection
* Session management
* Controlled access to student records

---

# 👤 User Roles

The system will eventually support different types of users.

### Administrator

Can:

* Manage users
* Manage courses
* Manage students
* View reports
* Configure the system

### Instructor/Staff

Can:

* Register students
* View students
* Search students
* Update student information
* View course enrollments

### Student

Future functionality may allow students to:

* View their profile
* View their course
* View enrollment information
* Update selected personal information

---

# 🗓️ Development Roadmap

The project will be developed progressively.

## Week 1 — Frontend Development

### Day 1 — Project Planning

* Define project requirements
* Create project folder
* Create README
* Plan application structure

### Day 2 — HTML

* Create registration page
* Add form fields
* Add course selection
* Add navigation

### Day 3 — CSS

* Style registration form
* Create responsive layout
* Create cards and buttons
* Improve typography

### Day 4 — JavaScript

* Form validation
* Capture form data
* Display validation messages
* Handle user interaction

### Day 5 — Student Display

* Display registered students
* Create student cards/table
* Add search functionality

### Day 6 — CRUD Practice

Implement:

* Create
* Read
* Update
* Delete

using frontend JavaScript.

### Day 7 — Frontend Review

* Test application
* Fix bugs
* Improve UI
* Organize code
* Commit work to GitHub

---

# Week 2 — Backend & Database

### Day 8 — Database Design

* Design ER diagram
* Create database
* Create tables
* Define relationships
* Add constraints

### Day 9 — SQL

Practice:

```sql
CREATE
INSERT
SELECT
UPDATE
DELETE
JOIN
WHERE
ORDER BY
GROUP BY
```

### Day 10 — Python Backend

* Set up Python environment
* Install backend framework
* Create application
* Create routes
* Test API

### Day 11 — Database Connection

Connect:

```text
Frontend
   ↓
Python Backend
   ↓
Database
```

### Day 12 — Student CRUD

Implement:

```text
Create student
View students
Update student
Delete student
```

### Day 13 — Testing & Improvements

* Validate input
* Handle errors
* Test database operations
* Test frontend/backend communication
* Improve user experience

### Day 14 — Portfolio Preparation

* Clean project structure
* Write documentation
* Add screenshots
* Create GitHub repository
* Push final project
* Create project presentation
* Document lessons learned

---

# 🧪 Testing Plan

Testing will be performed throughout development.

Examples:

### Registration Testing

* Can a student be registered?
* Are required fields validated?
* Can invalid information be submitted?

### Database Testing

* Can student records be inserted?
* Can records be retrieved?
* Can records be updated?
* Can records be deleted?

### Search Testing

* Can users find students by name?
* Can users find students by ID?
* Can users filter by course?

### Security Testing

* Can unauthorized users access protected pages?
* Are passwords stored securely?
* Is user input validated?

---

# 📸 Screenshots

Screenshots will be added here as development progresses.

Planned screenshots:

# 📸 Screenshots

## Student Registration Form
![Registration Form](screenshots/registration-form.png)

## Registered Students Table
![Students Table](screenshots/students-table.png)


```text
1. Home/Dashboard
2. Student Registration Form
3. Student List
4. Student Profile
5. Search Results
6. Database Tables
7. API Testing
8. Final Application
```

---

# 🚀 Installation

## Prerequisites

Before running the final application, install:

* Python 3
* MySQL or PostgreSQL
* Git
* Visual Studio Code
* A modern web browser

---

## Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Enter the project:

```bash
cd mikono-student-registration
```

---

## Frontend

Open `index.html` in a browser during the initial frontend development stage.

Later, the frontend will communicate with the Python backend.

---

## Python Environment

Create a virtual environment:

```bash
python3 -m venv venv
```

Activate it on macOS/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# 🗃️ Database Setup

Create the database:

```sql
CREATE DATABASE mikono_vtc;
```

Select it:

```sql
USE mikono_vtc;
```

The complete database schema will eventually be provided in:

```text
database/schema.sql
```

Run the schema to create the required tables.

---

# ▶️ Running the Application

The exact command will depend on the backend framework selected.

For example, with Flask:

```bash
python3 app.py
```

The application may then be accessible at:

```text
http://127.0.0.1:5000
```

---

# 🔄 Git Workflow

Git will be used throughout development.

Basic workflow:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Add student registration form"
```

Push:

```bash
git push
```

Development will use meaningful commits so that the project history demonstrates how the application was built.

---

# 📋 Example Git Commit Messages

```text
Initial project setup
Add student registration form
Add responsive CSS styling
Add JavaScript form validation
Add student list
Implement search functionality
Create database schema
Add Python backend
Connect backend to database
Implement student CRUD operations
Add authentication
Add dashboard statistics
Improve error handling
Add project documentation
Prepare final portfolio release
```

---

# 🎓 Learning Outcomes

By completing this project, I expect to demonstrate practical skills in:

### Web Development

* HTML5
* CSS3
* JavaScript
* Forms
* DOM manipulation
* Responsive design

### Database Systems

* Relational databases
* SQL
* Database design
* Primary keys
* Foreign keys
* Relationships
* CRUD operations
* Data validation

### Python

* Python programming
* Backend development
* APIs
* Database connectivity
* Error handling

### Software Engineering

* Requirements analysis
* Project planning
* Version control
* Git/GitHub
* Testing
* Debugging
* Documentation
* Software architecture

### Entrepreneurship

The project also demonstrates how technology can be used to solve a real institutional problem by digitizing student registration and management.

---

# 🌱 Future Improvements

Possible future features include:

* Student login
* Instructor login
* Administrator dashboard
* Student attendance
* Fee/payment tracking
* Examination results
* Course completion tracking
* Certificate generation
* SMS/email notifications
* Student ID card generation
* PDF reports
* Excel/CSV export
* Advanced analytics
* Cloud deployment
* Mobile application
* Role-based permissions

---

# 🏆 Portfolio Value

This project demonstrates the complete software development lifecycle:

```text
PROBLEM
   ↓
REQUIREMENTS
   ↓
PLANNING
   ↓
UI DESIGN
   ↓
FRONTEND
   ↓
DATABASE
   ↓
BACKEND
   ↓
INTEGRATION
   ↓
TESTING
   ↓
DOCUMENTATION
   ↓
DEPLOYMENT
```

Rather than presenting only a piece of code, this project demonstrates the ability to take a real-world problem and develop a working technology solution.

---

# 📚 Project Status

**Current Status:** 🟡 In Development

### Completed
* [x] Project idea defined
* [x] Requirements identified
* [x] Initial project structure planned
* [x] README created
* [x] HTML registration form ✅
* [x] CSS styling ✅
* [x] JavaScript form handling ✅
* [x] Student display table ✅
* [x] LocalStorage persistence ✅
* [x] CSV export functionality ✅
* [x] Delete student functionality ✅
* [x] Search functionality ✅
* [x] Edit student feature ✅
* [x] Course filter dropdown ✅
* [x] Student count statistics ✅
* [x] Screenshots added ✅

### In Progress
* [ ] Search functionality
* [ ] Edit student feature
* [ ] Project restructuring (frontend/ folder)

### Upcoming
* [ ] Database design (Week 2, Day 8)
* [ ] Python backend (Week 2, Day 10)
* [ ] CRUD API endpoints
* [ ] Authentication system
* [ ] Dashboard statistics
* [ ] Testing
* [ ] Deployment

---

# 👨‍💻 Developer

**Farah Salat**

This project is being developed as part of my ongoing software development and digital skills learning journey.

---

# 📄 License

This project is intended primarily for educational and portfolio purposes.

A formal open-source license can be added if the project is later released publicly for reuse.

---

# ⭐ Final Goal

The ultimate goal is to transform this project from a simple student registration form into a functional **Student Management System for Mikono Vocational Training Centre**.

The finished application should demonstrate that I can independently:

> **Plan → Design → Code → Test → Document → Deploy**

a real-world software solution.
