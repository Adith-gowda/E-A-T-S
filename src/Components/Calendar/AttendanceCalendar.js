// AttendanceCalendar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AttendanceCalendar = ({ year, month, onPrevMonth, onNextMonth }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const calendar = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
          week.push(<td key={j}></td>);
        } else {
          week.push(<td key={j}>{dayCounter}</td>);
          dayCounter++;
        }
      }

      calendar.push(<tr key={i}>{week}</tr>);
    }

    return calendar;
  };

  return (
    <center>
    <div className="container1 mt-4">
      <div className="calendar">
        <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-secondary" onClick={onPrevMonth}>
            &lt;
          </button>
          <h2>
            {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button className="btn btn-secondary" onClick={onNextMonth}>
            &gt;
          </button>
        </div>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Sun</th>
              <th scope="col">Mon</th>
              <th scope="col">Tue</th>
              <th scope="col">Wed</th>
              <th scope="col">Thu</th>
              <th scope="col">Fri</th>
              <th scope="col">Sat</th>
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody>
        </table>
      </div>
    </div>
    </center>
  );
};

export default AttendanceCalendar;
