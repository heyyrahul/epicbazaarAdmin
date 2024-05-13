import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      toast.success('Login Successful');
      console.log('Login successful');
      navigate('/dashboard');
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div id='mainContainer'>
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1><i className="fas fa-user"></i></h1>
          <br />
          <h1>  Admin Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className='bx bxs-lock-alt' ></i>
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
