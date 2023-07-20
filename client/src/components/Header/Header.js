import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../../utils/auth';
import './Header.css'; 

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Task Manager App
          </Link>
         
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="btn btn-primary" to="/createTask">
                  Create Task
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary" to="/tasks">
                  All Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary" to="/completedTasks">
                  Completed Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary" to="/incompleteTasks">
                  Incomplete Tasks
                </Link>
              </li>
              {isAuthenticated() ? (
                <li className="nav-item display-right">
                  <Link className="nav-link login-register" to="/logout" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link login-register" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
