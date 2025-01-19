import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const HomePage = () => {
  const [students, setStudents] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    rollNo: 'asc',
    totalProblemsSolved: 'asc',
    codeforcesRating: 'asc',
    codeforcesSolved: 'asc',
    codechefRating: 'asc',
    codechefSolved: 'asc',
    leetcodeRating: 'asc',
    leetcodeSolved: 'asc',
  });

  // Fetch data from Flask API
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/students') // Flask API endpoint
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSort = (column) => {
    const order = sortOrder[column] === 'asc' ? 'desc' : 'asc';
    setSortOrder((prevState) => ({ ...prevState, [column]: order }));

    const sortedStudents = [...students].sort((a, b) => {
      const platformKey = column.replace('Rating', '').replace('Solved', '').toLowerCase();
      const isSolved = column.endsWith('Solved');
      const aValue = isSolved
        ? a.platform_data[platformKey]?.solved || 0
        : column.endsWith('Rating')
        ? a.platform_data[platformKey]?.rating || 0
        : a[column];
      const bValue = isSolved
        ? b.platform_data[platformKey]?.solved || 0
        : column.endsWith('Rating')
        ? b.platform_data[platformKey]?.rating || 0
        : b[column];

      return order === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setStudents(sortedStudents);
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
            <li><a href="/LoginPage">Login</a></li>
          </ul>
        </nav>
      </header>

      <main className="home-content">
        <h2>🏆 Leaderboard</h2>
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
                  Codeforces Solved
                  <button onClick={() => handleSort('codeforcesSolved')}>
                    {sortOrder.codeforcesSolved === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
                <th>
                  CodeChef Rating
                  <button onClick={() => handleSort('codechefRating')}>
                    {sortOrder.codechefRating === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
                <th>
                  CodeChef Solved
                  <button onClick={() => handleSort('codechefSolved')}>
                    {sortOrder.codechefSolved === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
                <th>
                  LeetCode Rating
                  <button onClick={() => handleSort('leetcodeRating')}>
                    {sortOrder.leetcodeRating === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
                <th>
                  LeetCode Solved
                  <button onClick={() => handleSort('leetcodeSolved')}>
                    {sortOrder.leetcodeSolved === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.rollNo}</td>
                  <td>{student.totalProblemsSolved}</td>
                  <td>{student.section}</td>
                  <td>{student.platform_data.codeforces?.rating || 'N/A'}</td>
                  <td>{student.platform_data.codeforces?.solved || 'N/A'}</td>
                  <td>{student.platform_data.codechef?.rating || 'N/A'}</td>
                  <td>{student.platform_data.codechef?.solved || 'N/A'}</td>
                  <td>{student.platform_data.leetcode?.rating || 'N/A'}</td>
                  <td>{student.platform_data.leetcode?.solved || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
