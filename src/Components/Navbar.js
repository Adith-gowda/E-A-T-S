import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props){

  const { id, username } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className='container-fluid'>
        <Link to={"/dashboard/"+id} className="navbar-brand">TechTrove</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/dashboard/"+id} className="nav-link text-light">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={"/attendance-summary/"+id} className="nav-link text-light">Attendance Summary</Link>
            </li>
            <li className="nav-item">
              <Link to={"/user-profile/"+id} className="nav-link text-light">{username}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
