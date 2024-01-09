import React, { useState, useContext } from 'react';
import '../pages/LoginPage.scss';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserRoleContext } from '../../context/UserContext';

const LoginPage = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUserRole } = useContext(UserRoleContext);

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:3002/user/login', {
            username,
            password,
          });
    
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;

          localStorage.setItem('accessToken', response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("username", response.data.username);
          setUserRole('user');
          navigate("/main");
          
        } catch (error) {
          console.error('Error during registration:', error);
          alert("Incorrect password or username")
        }
      };


    return(
        <div>
            <div className="loginPage">
                <form>
                    <h1>Log in</h1>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br/>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br/>
                    <a href='/auth/reg'>Haven`t registed yet?</a>
                    <nav>
                        <ul>
                            <li onClick={handleLogin}>
                            sign in
                            <span></span><span></span><span></span><span></span>
                            </li>
                        </ul>
                    </nav>
                </form>
            </div>

        </div>
    );
    
}

export default LoginPage;