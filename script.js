/* ==============================
   Student Registration Logic
   (Backend-connected version)
   ============================== */

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Get form and table elements
const studentForm = document.getElementById('studentForm');
const studentsTableBody = document.querySelector('#studentsTable tbody');
const noStudentsMsg = document.getElementById('noStudentsMsg');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const searchInput = document.getElementById('searchInput');
const courseFilter = document.getElementById('courseFilter');

// Array to store registered students
let students = [];
let allCourses = [];

// ============== API FUNCTIONS ==============

// Fetch all students from API
async function fetchStudents() {
    try {
        const response = await fetch(`${API_BASE_URL}/students`);
        if (!response.ok) throw new Error('Failed to fetch students');
        students = await response.json();
        renderStudentsTable();
    } catch (error) {
        console.error('Error fetching students:', error);
        alert('❌ Failed to load students from server');
    }
}

// Fetch all courses from API
async function fetchCourses() {
    try {
        const response = await fetch(`${API_BASE_URL}/courses`);
        if (!response.ok) throw new Error('Failed to fetch courses');
        allCourses = await response.json();
        populateCourseDropdowns();
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

// Register a new student
async function registerStudent(studentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Registration failed');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error registering student:', error);
        throw error;
    }
}

// Update a student
async function updateStudent(studentId, studentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Update failed');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
}

// Delete a student
async function deleteStudentFromAPI(studentId) {
    try {
        const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Delete failed');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
}

// ============== UI FUNCTIONS ==============

// Populate course dropdowns dynamically
function populateCourseDropdowns() {
    const courseSelect = document.getElementById('course');
    const courseFilterSelect = document.getElementById('courseFilter');

    // Clear existing options except first
    courseSelect.innerHTML = '<option value="">-- Select a Course --</option>';
    courseFilterSelect.innerHTML = '<option value="">All Courses</option>';

    // Add courses to both dropdowns
    allCourses.forEach(course => {
        // Registration form
        const option1 = document.createElement('option');
        option1.value = course.course_name;
        option1.textContent = course.course_name;
        courseSelect.appendChild(option1);

        // Filter dropdown
        const option2 = document.createElement('option');
        option2.value = course.course_name;
        option2.textContent = course.course_name;
        courseFilterSelect.appendChild(option2);
    });
}

// Combined filter function (search + course)
function filterStudents() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCourse = courseFilter.value;

    let filtered = students;

    // Filter by course if selected
    if (selectedCourse) {
        filtered = filtered.filter(student => student.course === selectedCourse);
    }

    // Filter by search term if entered
    if (searchTerm) {
        filtered = filtered.filter(student =>
            student.first_name.toLowerCase().includes(searchTerm) ||
            student.last_name.toLowerCase().includes(searchTerm) ||
            student.course.toLowerCase().includes(searchTerm) ||
            student.phone.includes(searchTerm)
        );
    }

    renderStudentsTable(filtered);
}

// Search functionality
searchInput.addEventListener('input', function () {
    filterStudents();
});

// Course filter functionality
courseFilter.addEventListener('change', function () {
    filterStudents();
});

// Cancel edit button
cancelEditBtn.addEventListener('click', function () {
    studentForm.reset();
    delete studentForm.dataset.editId;

    const submitBtn = studentForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Register Student';
    submitBtn.style.backgroundColor = '';

    cancelEditBtn.style.display = 'none';
});

// Handle form submission
studentForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const editId = studentForm.dataset.editId;

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;
    const enrollmentDate = document.getElementById('enrollmentDate').value;

    const studentData = {
        firstName,
        lastName,
        phone,
        email,
        course,
        enrollmentDate
    };

    try {
        if (editId) {
            // UPDATE existing student
            await updateStudent(editId, studentData);

            // Reset form state
            studentForm.reset();
            delete studentForm.dataset.editId;

            const submitBtn = studentForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Register Student';
            submitBtn.style.backgroundColor = '';
            cancelEditBtn.style.display = 'none';

            alert(`✅ ${firstName} ${lastName} updated successfully!`);
        } else {
            // CREATE new student
            await registerStudent(studentData);
            studentForm.reset();
            alert(`✅ ${firstName} ${lastName} registered successfully!`);
        }

        // Refresh student list
        await fetchStudents();

    } catch (error) {
        alert(`❌ ${error.message}`);
    }
});

// Delete a student by ID
async function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            await deleteStudentFromAPI(studentId);
            alert('✅ Student deleted successfully!');
            await fetchStudents();
        } catch (error) {
            alert(`❌ ${error.message}`);
        }
    }
}

// Edit a student by ID
function editStudent(studentId) {
    const student = students.find(s => s.student_id === studentId);

    if (!student) return;

    // Populate form with student data
    document.getElementById('firstName').value = student.first_name;
    document.getElementById('lastName').value = student.last_name;
    document.getElementById('phone').value = student.phone;
    document.getElementById('email').value = student.email || '';
    document.getElementById('course').value = student.course;
    document.getElementById('enrollmentDate').value = student.enrollment_date;

    // Store the ID being edited
    studentForm.dataset.editId = studentId;

    // Change submit button text
    const submitBtn = studentForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Update Student';
    submitBtn.style.backgroundColor = '#ffc107';

    // Show cancel button
    cancelEditBtn.style.display = 'inline-block';

    // Scroll to form
    studentForm.scrollIntoView({ behavior: 'smooth' });
}

// Render students table
function renderStudentsTable(data = students) {
    // Clear current table
    studentsTableBody.innerHTML = '';

    // Update student counts
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('showingStudents').textContent = data.length;

    // Show/hide "no students" message
    if (data.length === 0) {
        noStudentsMsg.style.display = 'block';
        noStudentsMsg.textContent = students.length === 0
            ? 'No students registered yet.'
            : 'No matching students found.';
    } else {
        noStudentsMsg.style.display = 'none';

        // Add each student to the table
        data.forEach(student => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${student.first_name} ${student.last_name}</td>
                <td>${student.phone}</td>
                <td>${student.course}</td>
                <td>${formatDate(student.enrollment_date)}</td>
                <td>
                    <button type="button" onclick="editStudent(${student.student_id})" 
                            style="background-color: #ffc107; color: #000; padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; margin-right: 5px;">
                        Edit
                    </button>
                    <button type="button" onclick="deleteStudent(${student.student_id})" 
                            style="background-color: #dc3545; color: white; padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 13px;">
                        Delete
                    </button>
                </td>
            `;

            studentsTableBody.appendChild(row);
        });
    }
}

// Format date for display (YYYY-MM-DD → DD/MM/YYYY)
function formatDate(dateString) {
    if (!dateString) return '';

    // Handle different date formats
    try {
        // If it's already a date object or ISO string
        const date = new Date(dateString);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            return dateString; // Return as-is if invalid
        }

        // Format as DD/MM/YYYY
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    } catch (error) {
        console.error('Date formatting error:', error);
        return dateString;
    }
}

// Export students to CSV file
document.getElementById('exportBtn').addEventListener('click', function () {
    if (students.length === 0) {
        alert('❌ No students to export. Register at least one student first.');
        return;
    }

    // CSV header
    let csvContent = 'ID,First Name,Last Name,Phone,Email,Course,Enrollment Date\n';

    // Add each student as a row
    students.forEach(student => {
        const row = [
            student.student_id,
            `"${student.first_name}"`,
            `"${student.last_name}"`,
            `"${student.phone}"`,
            `"${student.email || ''}"`,
            `"${student.course}"`,
            student.enrollment_date
        ].join(',');
        csvContent += row + '\n';
    });

    // Create a downloadable blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `mikono_vtc_students_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// ============== INITIALIZE ==============

// Load data when page loads
async function initialize() {
    await fetchCourses();
    await fetchStudents();
}

initialize();