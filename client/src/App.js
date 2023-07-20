import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import TaskList from './components/Task/TaskList';
import CompletedTaskList from './components/Task/CompletedTaskList';
import IncompleteTaskList from './components/Task/IncompleteTaskList';
import CreateTaskForm from './components/Task/CreateTaskForm';
import UpdateTaskForm from './components/Task/UpdateTaskForm';
import { isAuthenticated } from './utils/auth';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated() ? (
                  <Navigate to="/tasks" replace />
                ) : (
                  <LoginForm />
                )
              }
            />
            <Route
              path="/login"
              element={
                  <LoginForm />
              
              }
            />
            <Route
              path="/register"
              element={
                  <RegisterForm />
              
              }
            />
            <Route
              path="/createTask"
              element={isAuthenticated() ? <CreateTaskForm /> : <LoginForm />}
            />
            <Route
              path="/tasks"
              element={
                isAuthenticated() ? (
                  <>
                    <TaskList />
                    {/* <CreateTaskForm /> */}
                  </>
                ) : (
                  <LoginForm />
                )
              }
            />
            <Route
              path="/completedTasks"
              element={
                isAuthenticated() ? (
                  <>
                    <CompletedTaskList />
                    {/* <CreateTaskForm /> */}
                  </>
                ) : (
                  <LoginForm />
                )
              }
            />
            <Route
              path="/incompleteTasks"
              element={
                isAuthenticated() ? (
                  <>
                    <IncompleteTaskList />
                    {/* <CreateTaskForm /> */}
                  </>
                ) : (
                  <LoginForm />
                )
              }
            />
            <Route path="/tasks/:id" element={<UpdateTaskForm />} />
          </Routes>
        </div>
        {isAuthenticated() && <Footer />}
      </div>
    </Router>
  );
};

export default App;
