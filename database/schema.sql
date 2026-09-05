-- Mikono VTC Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS mikono_vtc;

USE mikono_vtc;

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    duration_months INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Students table
CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') DEFAULT 'Other',
    date_of_birth DATE,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (first_name, last_name),
    INDEX idx_phone (phone)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Enrollments table (connects students to courses)
CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    status ENUM(
        'Active',
        'Completed',
        'Dropped',
        'On Hold'
    ) DEFAULT 'Active',
    FOREIGN KEY (student_id) REFERENCES students (student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses (course_id) ON DELETE RESTRICT,
    INDEX idx_student (student_id),
    INDEX idx_course (course_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Insert initial courses
INSERT INTO
    courses (
        course_name,
        description,
        duration_months
    )
VALUES (
        'Tailoring & Dressmaking',
        'Learn garment construction, pattern making, and alterations',
        6
    ),
    (
        'ICT Basic Computer Packages',
        'Microsoft Office, internet, email, and digital literacy',
        3
    ),
    (
        'Beauty Therapy & Salon',
        'Hair styling, skincare, makeup, and beauty treatments',
        6
    ),
    (
        'Welding & Fabrication',
        'Metal joining, cutting, and structural fabrication',
        6
    ),
    (
        'Light Motor Vehicle Mechanics',
        'Automotive repair, maintenance, and diagnostics',
        12
    ),
    (
        'Electrical Wiring',
        'Residential and commercial electrical installations',
        6
    ),
    (
        'Web Development & Design',
        'HTML, CSS, JavaScript, and modern web frameworks',
        6
    ),
    (
        'Database Systems & Management',
        'SQL, database design, administration, and optimization',
        6
    )
ON DUPLICATE KEY UPDATE
    course_name = course_name;