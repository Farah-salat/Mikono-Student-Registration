/* ==============================
   Student Registration Logic
   ============================== */

// Get form and table elements
const studentForm = document.getElementById('studentForm');
const studentsTableBody = document.querySelector('#studentsTable tbody');
const noStudentsMsg = document.getElementById('noStudentsMsg');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const searchInput = document.getElementById('searchInput');
const courseFilter = document.getElementById('courseFilter');

// Array to store registered students
let students = [];

// Load students from localStorage on page load
function loadStudents() {
    const stored = localStorage.getItem('mikonoVTC_students');
    if (stored) {
        students = JSON.parse(stored);
    }
    renderStudentsTable();
}

// Save students to localStorage
function saveStudents() {
    localStorage.setItem('mikonoVTC_students', JSON.stringify(students));
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
            student.firstName.toLowerCase().includes(searchTerm) ||
            student.lastName.toLowerCase().includes(searchTerm) ||
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
studentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Check if we're editing an existing student
    const editId = studentForm.dataset.editId;

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;
    const enrollmentDate = document.getElementById('enrollmentDate').value;

    if (editId) {
        // UPDATE existing student
        const studentIndex = students.findIndex(s => s.id == editId);

        if (studentIndex !== -1) {
            students[studentIndex] = {
                ...students[studentIndex],
                firstName,
                lastName,
                phone,
                email,
                course,
                enrollmentDate
            };

            saveStudents();
            renderStudentsTable();

            // Reset form state
            studentForm.reset();
            delete studentForm.dataset.editId;

            const submitBtn = studentForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Register Student';
            submitBtn.style.backgroundColor = '';

            cancelEditBtn.style.display = 'none';

            alert(`✅ ${firstName} ${lastName} updated successfully!`);
        }
    } else {
        // CREATE new student
        const student = {
            id: Date.now(),
            firstName,
            lastName,
            phone,
            email,
            course,
            enrollmentDate
        };

        students.push(student);
        saveStudents();
        renderStudentsTable();
        studentForm.reset();
        alert(`✅ ${firstName} ${lastName} registered successfully!`);
    }
});

// Delete a student by ID
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(student => student.id !== id);
        saveStudents();
        renderStudentsTable();
    }
}

// Edit a student by ID
function editStudent(id) {
    const student = students.find(s => s.id === id);

    if (!student) return;

    // Populate form with student data
    document.getElementById('firstName').value = student.firstName;
    document.getElementById('lastName').value = student.lastName;
    document.getElementById('phone').value = student.phone;
    document.getElementById('email').value = student.email;
    document.getElementById('course').value = student.course;
    document.getElementById('enrollmentDate').value = student.enrollmentDate;

    // Store the ID being edited
    studentForm.dataset.editId = id;

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
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.phone}</td>
                <td>${student.course}</td>
                <td>${formatDate(student.enrollmentDate)}</td>
                <td>
                    <button type="button" onclick="editStudent(${student.id})" 
                            style="background-color: #ffc107; color: #000; padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; margin-right: 5px;">
                        Edit
                    </button>
                    <button type="button" onclick="deleteStudent(${student.id})" 
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
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
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
            student.id,
            `"${student.firstName}"`,
            `"${student.lastName}"`,
            `"${student.phone}"`,
            `"${student.email}"`,
            `"${student.course}"`,
            student.enrollmentDate
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

// Initialize: load students when page loads
loadStudents();