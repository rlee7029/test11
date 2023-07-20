import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../graphql/mutations';
import { setToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import TaskList from '../Task/TaskList';
import CreateTaskForm from '../Task/CreateTaskForm';
import './RegisterForm.css'; 

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, { loading, error }] = useMutation(REGISTER);
  const navigate = useNavigate();
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await register({
        variables: { input: { username, password } },
      });

      const { token, user } = data.register;

      
      setToken(token, user.id);

     
      setRegisteredUser(user);

      
      navigate('/tasks');
    } catch (error) {
      console.log(error);
    }
  };

  if (registeredUser) {
    return (
      <div>
        <TaskList />
        <CreateTaskForm />
      </div>
    );
  }

  return (
    <div>
  <h2 class="title">Register</h2>
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p className="error-message">{error.message}</p>}
    </form></div>
  );
};

export default RegisterForm;
