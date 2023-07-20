import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';
import { setToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import TaskList from '../Task/TaskList';
import CreateTaskForm from '../Task/CreateTaskForm';
import './LoginForm.css'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { input: { username, password } },
      });

      const { token, user } = data.login;

   
      setToken(token, user.id);

    
      setLoggedIn(true);

     
      navigate('/tasks');
    } catch (error) {
      console.log(error);
    }
  };

  if (loggedIn) {
    return (
      <div>
        <TaskList />

      </div>
    );
  }

  return (

<div>
  <h2 class="title">Login</h2>
<form onSubmit={handleLogin}>
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
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="error-message">{error.message}</p>}
    </form>
    </div>
  );
};

export default LoginForm;
