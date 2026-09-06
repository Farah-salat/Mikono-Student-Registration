from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Database connection helper


def get_db_connection():
    try:
        connection = mysql.connector.connect(**Config.get_db_config())
        return connection
    except Error as e:
        print(f"Database connection error: {e}")
        return None

# ============== COURSES API ==============


@app.route('/api/courses', methods=['GET'])
def get_courses():
    """Get all available courses"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            'SELECT course_id, course_name FROM courses ORDER BY course_name')
        courses = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(courses), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500

# ============== STUDENTS API ==============


@app.route('/api/students', methods=['GET'])
def get_students():
    """Get all students with their course information"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT
                s.student_id,
                s.first_name,
                s.last_name,
                s.phone,
                s.email,
                c.course_name as course,
                e.enrollment_date
            FROM students s
            INNER JOIN enrollments e ON s.student_id = e.student_id
            INNER JOIN courses c ON e.course_id = c.course_id
            ORDER BY s.created_at DESC
        """
        cursor.execute(query)
        students = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(students), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/students', methods=['POST'])
def create_student():
    """Create a new student with enrollment"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['firstName', 'lastName',
                           'phone', 'course', 'enrollmentDate']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        cursor = connection.cursor()

        # Insert student
        student_query = """
            INSERT INTO students (first_name, last_name, phone, email)
            VALUES (%s, %s, %s, %s)
        """
        student_data = (
            data['firstName'],
            data['lastName'],
            data['phone'],
            data.get('email', '')
        )
        cursor.execute(student_query, student_data)
        student_id = cursor.lastrowid

        # Get course_id from course_name
        cursor.execute(
            'SELECT course_id FROM courses WHERE course_name = %s', (data['course'],))
        course_result = cursor.fetchone()

        if not course_result:
            connection.rollback()
            cursor.close()
            connection.close()
            return jsonify({'error': 'Invalid course selected'}), 400

        course_id = course_result[0]

        # Insert enrollment
        enrollment_query = """
            INSERT INTO enrollments (student_id, course_id, enrollment_date)
            VALUES (%s, %s, %s)
        """
        enrollment_data = (student_id, course_id, data['enrollmentDate'])
        cursor.execute(enrollment_query, enrollment_data)

        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({
            'message': 'Student registered successfully',
            'student_id': student_id
        }), 201

    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """Update student information"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        data = request.get_json()
        cursor = connection.cursor()

        # Update student
        update_query = """
            UPDATE students
            SET first_name = %s, last_name = %s, phone = %s, email = %s
            WHERE student_id = %s
        """
        update_data = (
            data['firstName'],
            data['lastName'],
            data['phone'],
            data.get('email', ''),
            student_id
        )
        cursor.execute(update_query, update_data)

        # Update enrollment if course changed
        if 'course' in data and 'enrollmentDate' in data:
            cursor.execute(
                'SELECT course_id FROM courses WHERE course_name = %s', (data['course'],))
            course_result = cursor.fetchone()

            if course_result:
                course_id = course_result[0]
                enrollment_update = """
                    UPDATE enrollments
                    SET course_id = %s, enrollment_date = %s
                    WHERE student_id = %s
                """
                cursor.execute(enrollment_update, (course_id,
                               data['enrollmentDate'], student_id))

        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({'message': 'Student updated successfully'}), 200

    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """Delete a student (enrollment will be deleted automatically via CASCADE)"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        cursor = connection.cursor()
        cursor.execute(
            'DELETE FROM students WHERE student_id = %s', (student_id,))
        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({'message': 'Student deleted successfully'}), 200

    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/students/search', methods=['GET'])
def search_students():
    """Search students by name, course, or phone"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        search_term = request.args.get('q', '')
        course_filter = request.args.get('course', '')

        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT
                s.student_id,
                s.first_name,
                s.last_name,
                s.phone,
                s.email,
                c.course_name as course,
                e.enrollment_date
            FROM students s
            INNER JOIN enrollments e ON s.student_id = e.student_id
            INNER JOIN courses c ON e.course_id = c.course_id
            WHERE 1=1
        """
        params = []

        if search_term:
            query += """ AND (
                s.first_name LIKE %s OR
                s.last_name LIKE %s OR
                s.phone LIKE %s OR
                c.course_name LIKE %s
            )"""
            search_pattern = f'%{search_term}%'
            params.extend([search_pattern, search_pattern,
                          search_pattern, search_pattern])

        if course_filter:
            query += ' AND c.course_name = %s'
            params.append(course_filter)

        query += ' ORDER BY s.created_at DESC'

        cursor.execute(query, params)
        students = cursor.fetchall()
        cursor.close()
        connection.close()

        return jsonify(students), 200

    except Error as e:
        return jsonify({'error': str(e)}), 500

# ============== HEALTH CHECK ==============


@app.route('/api/health', methods=['GET'])
def health_check():
    """API health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Mikono VTC API is running',
        'timestamp': __import__('datetime').datetime.now().isoformat()
    }), 200


@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    """Get dashboard statistics"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        cursor = connection.cursor(dictionary=True)

        # Total students
        cursor.execute('SELECT COUNT(*) as total FROM students')
        total_students = cursor.fetchone()['total']

        # Students per course
        cursor.execute("""
            SELECT c.course_name, COUNT(e.student_id) as student_count
            FROM courses c
            LEFT JOIN enrollments e ON c.course_id = e.course_id
            GROUP BY c.course_id, c.course_name
            ORDER BY student_count DESC
        """)
        students_per_course = cursor.fetchall()

        # New registrations this month
        cursor.execute("""
            SELECT COUNT(*) as new_this_month
            FROM enrollments e
            WHERE MONTH(e.enrollment_date) = MONTH(CURRENT_DATE())
            AND YEAR(e.enrollment_date) = YEAR(CURRENT_DATE())
        """)
        new_this_month = cursor.fetchone()['new_this_month']

        # Recent registrations (this month)
        cursor.execute("""
            SELECT 
                s.first_name,
                s.last_name,
                s.phone,
                c.course_name as course,
                e.enrollment_date
            FROM students s
            INNER JOIN enrollments e ON s.student_id = e.student_id
            INNER JOIN courses c ON e.course_id = c.course_id
            WHERE MONTH(e.enrollment_date) = MONTH(CURRENT_DATE())
            AND YEAR(e.enrollment_date) = YEAR(CURRENT_DATE())
            ORDER BY e.enrollment_date DESC
        """)
        recent_registrations = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify({
            'total_students': total_students,
            'students_per_course': students_per_course,
            'new_this_month': new_this_month,
            'recent_registrations': recent_registrations
        }), 200

    except Error as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print(f"🚀 Starting Mikono VTC API server...")
    print(f"📍 Server running on http://localhost:{Config.FLASK_PORT}")
    print(f"💾 Connected to database: {Config.DB_NAME}")
    app.run(debug=True, port=Config.FLASK_PORT)


if __name__ == '__main__':
    print(f"🚀 Starting Mikono VTC API server...")
    # ... rest stays the same

if __name__ == '__main__':
    print(f"🚀 Starting Mikono VTC API server...")
    print(f"📍 Server running on http://localhost:{Config.FLASK_PORT}")
    print(f"💾 Connected to database: {Config.DB_NAME}")
    app.run(debug=True, port=Config.FLASK_PORT)
