import React, { useState } from 'react';
import './HomePage.css';
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // Sorting icons

const HomePage = () => {
  // Static student data
  const [students, setStudents] = useState([
    { rollNo: '101', email: 'student1@example.com', totalProblemsSolved: 15, section: 'A', platform_data: { codeforces: { rating: 1500 }, codechef: { rating: 1200 }, leetcode: { rating: 1300 }, geeksforgeeks: { total_problems_solved: 50 } } },
    { rollNo: '102', email: 'student2@example.com', totalProblemsSolved: 20, section: 'B', platform_data: { codeforces: { rating: 1600 }, codechef: { rating: 1250 }, leetcode: { rating: 1400 }, geeksforgeeks: { total_problems_solved: 55 } } },
    { rollNo: '103', email: 'student3@example.com', totalProblemsSolved: 12, section: 'A', platform_data: { codeforces: { rating: 1450 }, codechef: { rating: 1150 }, leetcode: { rating: 1200 }, geeksforgeeks: { total_problems_solved: 40 } } },
    { rollNo: '104', email: 'student4@example.com', totalProblemsSolved: 30, section: 'B', platform_data: { codeforces: { rating: 1700 }, codechef: { rating: 1350 }, leetcode: { rating: 1500 }, geeksforgeeks: { total_problems_solved: 60 } } },
    { rollNo: '105', email: 'student5@example.com', totalProblemsSolved: 25, section: 'A', platform_data: { codeforces: { rating: 1550 }, codechef: { rating: 1200 }, leetcode: { rating: 1250 }, geeksforgeeks: { total_problems_solved: 55 } } },
    { rollNo: '106', email: 'student6@example.com', totalProblemsSolved: 18, section: 'B', platform_data: { codeforces: { rating: 1450 }, codechef: { rating: 1100 }, leetcode: { rating: 1350 }, geeksforgeeks: { total_problems_solved: 45 } } },
  ]);
  const [section, setSection] = useState('');
  const [sortOrder, setSortOrder] = useState({
    rollNo: 'asc',
    totalProblemsSolved: 'asc',
    codeforcesRating: 'asc',
    codechefRating: 'asc',
    leetcodeRating: 'asc',
    geeksforgeeks: 'asc',
  });

  const handleSort = (column) => {
    const order = sortOrder[column] === 'asc' ? 'desc' : 'asc';
    setSortOrder((prevState) => ({ ...prevState, [column]: order }));

    const sortedStudents = [...students].sort((a, b) => {
      let aValue = a[column] || a.platform_data[column]?.rating || a.platform_data[column]?.total_problems_solved;
      let bValue = b[column] || b.platform_data[column]?.rating || b.platform_data[column]?.total_problems_solved;

      if (typeof aValue === 'string') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setStudents(sortedStudents);
  };

  const fetchStudents = () => {
    const filters = {};
    if (section) filters.section = section;

    // Filter students by section
    if (filters.section) {
      setStudents(students.filter(student => student.section === filters.section));
    } else {
      setStudents([
        { rollNo: '101', email: 'student1@example.com', totalProblemsSolved: 15, section: 'A', platform_data: { codeforces: { rating: 1500 }, codechef: { rating: 1200 }, leetcode: { rating: 1300 }, geeksforgeeks: { total_problems_solved: 50 } } },
        { rollNo: '102', email: 'student2@example.com', totalProblemsSolved: 20, section: 'B', platform_data: { codeforces: { rating: 1600 }, codechef: { rating: 1250 }, leetcode: { rating: 1400 }, geeksforgeeks: { total_problems_solved: 55 } } },
        { rollNo: '103', email: 'student3@example.com', totalProblemsSolved: 12, section: 'A', platform_data: { codeforces: { rating: 1450 }, codechef: { rating: 1150 }, leetcode: { rating: 1200 }, geeksforgeeks: { total_problems_solved: 40 } } },
        { rollNo: '104', email: 'student4@example.com', totalProblemsSolved: 30, section: 'B', platform_data: { codeforces: { rating: 1700 }, codechef: { rating: 1350 }, leetcode: { rating: 1500 }, geeksforgeeks: { total_problems_solved: 60 } } },
      ]);
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-logo">
          <h1>CC Tracker</h1>
        </div>
        <nav className="header-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="LoginPage">Login</a></li>
          </ul>
        </nav>
      </header>

      <main className="home-content">
        <h2>🏆 Leaderboard</h2>

        {/* Filter Section */}
        <div className="filters">
          <select onChange={(e) => setSection(e.target.value)} value={section}>
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
          </select>
          <button onClick={fetchStudents}>Apply Filters</button>
        </div>

        <div className="student-table">
          <table>
            <thead>
              <tr>
                <th>
                  Roll No
                  <button onClick={() => handleSort('rollNo')}>
                    {sortOrder.rollNo === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
                <th>Email</th>
                <th>
                  Total Problems Solved
                  <button onClick={() => handleSort('totalProblemsSolved')}>
                    {sortOrder.totalProblemsSolved === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
                <th>Section</th>
                <th>
                  Codeforces Rating
                  <button onClick={() => handleSort('codeforcesRating')}>
                    {sortOrder.codeforcesRating === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
                <th>
                  Codechef Rating
                  <button onClick={() => handleSort('codechefRating')}>
                    {sortOrder.codechefRating === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
                <th>
                  Leetcode Rating
                  <button onClick={() => handleSort('leetcodeRating')}>
                    {sortOrder.leetcodeRating === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
                <th>
                  GeeksforGeeks
                  <button onClick={() => handleSort('geeksforgeeks')}>
                    {sortOrder.geeksforgeeks === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.rollNo}</td>
                    <td>{student.email || 'N/A'}</td>
                    <td>{student.totalProblemsSolved}</td>
                    <td>{student.section || 'N/A'}</td>
                    <td>{student.platform_data?.codeforces?.rating || 'N/A'}</td>
                    <td>{student.platform_data?.codechef?.rating || 'N/A'}</td>
                    <td>{student.platform_data?.leetcode?.rating || 'N/A'}</td>
                    <td>{student.platform_data?.geeksforgeeks?.total_problems_solved || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No student data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
