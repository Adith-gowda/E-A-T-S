import React from 'react';
import { Link } from 'react-router-dom';

function AdminNav(props){

  const { id, adminname } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <div className='container-fluid'>
        <Link to={"/AdminHome/"+id} className="navbar-brand">TechTrove</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/AdminHome/"+id} className="nav-link text-light">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={"/AdminProfile/"+id} className="nav-link text-light">{adminname}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
