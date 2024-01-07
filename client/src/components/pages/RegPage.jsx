// RegPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../pages/LoginPage.scss';
import Header from '../Header/Header';

const RegPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3002/user/reg', {
        username,
        email,
        password,
      });

      console.log(response.data);
      
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="loginPage">
        <form>
          <h1>Sign up</h1>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <a href="/auth/login">Already have an account?</a>
          <nav>
            <ul>
              <li onClick={handleRegister}>
                register
                <span></span><span></span><span></span><span></span>
              </li>
            </ul>
          </nav>
        </form>
      </div>
    </div>
  );
};

export default RegPage;
