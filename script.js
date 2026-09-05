/* ==============================
   Student Registration Logic
   ============================== */

// Get form and table elements
const studentForm = document.getElementById('studentForm');
const studentsTableBody = document.querySelector('#studentsTable tbody');
const noStudentsMsg = document.getElementById('noStudentsMsg');

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

// Handle form submission
// Handle form submission
studentForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;
    const enrollmentDate = document.getElementById('enrollmentDate').value;

    // Create student object
    const student = {
        id: Date.now(),
        firstName,
        lastName,
        phone,
        email,
        course,
        enrollmentDate
    };

    // Add to students array
    students.push(student);

    // Save to localStorage
    saveStudents();

    // Update the table
    renderStudentsTable();

    // Reset form
    studentForm.reset();

    // Show success message
    alert(`✅ ${firstName} ${lastName} registered successfully!`);
});

// Delete a student by ID
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(student => student.id !== id);
        saveStudents();
        renderStudentsTable();
    }
}

// Render students table
// Render students table
function renderStudentsTable() {
    // Clear current table
    studentsTableBody.innerHTML = '';

    // Show/hide "no students" message
    if (students.length === 0) {
        noStudentsMsg.style.display = 'block';
    } else {
        noStudentsMsg.style.display = 'none';

        // Add each student to the table
        students.forEach(student => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.phone}</td>
                <td>${student.course}</td>
                <td>${formatDate(student.enrollmentDate)}</td>
                <td>
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