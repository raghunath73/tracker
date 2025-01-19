from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/students', methods=['GET'])
def get_students():
    students = [
        {
            "rollNo": "101",
            "totalProblemsSolved": 15,
            "section": "A",
            "platform_data": {
                "codeforces": {"rating": 1500, "solved": 50, "username": "raghunath73"},
                "codechef": {"rating": 1200, "solved": 40, "username": "raghunath73"},
                "leetcode": {"rating": 1300, "solved": 30, "username": "raghunath73"},
            },
        },
    ]
    return jsonify(students)

if __name__ == '__main__':
    app.run(debug=True)
