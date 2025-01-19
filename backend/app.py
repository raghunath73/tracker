import sqlite3
import json
from flask import Flask, jsonify
from flask_cors import CORS

# Step 1: Create Database and Insert Sample Data
def create_and_insert_data():
    # Connect to SQLite database (it will create the database if it doesn't exist)
    connection = sqlite3.connect('students.db')
    cursor = connection.cursor()

    # Drop the table if it exists to ensure a fresh creation
    cursor.execute('DROP TABLE IF EXISTS students')

    # Create students table with the correct schema
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rollNo TEXT,
        totalProblemsSolved INTEGER,
        section TEXT,
        platform_data TEXT
    )''')

    # Sample student data
    students = [
        {
            "rollNo": "101",
            "totalProblemsSolved": 15,
            "section": "A",
            "platform_data": json.dumps({
                "codeforces": {"rating": 1500, "solved": 50, "username": "raghunath73"},
                "codechef": {"rating": 1200, "solved": 40, "username": "raghunath73"},
                "leetcode": {"rating": 1300, "solved": 30, "username": "raghunath73"}
            })
        },
        {
            "rollNo": "102",
            "totalProblemsSolved": 18,
            "section": "B",
            "platform_data": json.dumps({
                "codeforces": {"rating": 1400, "solved": 45, "username": "john_doe"},
                "codechef": {"rating": 1100, "solved": 35, "username": "john_doe"},
                "leetcode": {"rating": 1250, "solved": 28, "username": "john_doe"}
            })
        }
    ]

    # Insert data into students table
    for student in students:
        cursor.execute('''
        INSERT INTO students (rollNo, totalProblemsSolved, section, platform_data)
        VALUES (?, ?, ?, ?)''', 
        (student['rollNo'], student['totalProblemsSolved'], student['section'], student['platform_data']))

    # Commit changes and close the connection
    connection.commit()
    connection.close()

# Step 2: Set up Flask API to Retrieve Data
app = Flask(__name__)
CORS(app)

@app.route('/api/students', methods=['GET'])
def get_students():
    connection = sqlite3.connect('students.db')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM students")
    rows = cursor.fetchall()

    # Convert rows to a list of dictionaries
    students = []
    for row in rows:
        student = {
            "id": row[0],
            "rollNo": row[1],
            "totalProblemsSolved": row[2],
            "section": row[3],
            "platform_data": json.loads(row[4])  # Load the JSON string into a dictionary
        }
        students.append(student)

    connection.close()
    return jsonify(students)

if __name__ == '__main__':
    # Create database and insert sample data
    create_and_insert_data()

    # Run Flask app
    app.run(debug=True)
