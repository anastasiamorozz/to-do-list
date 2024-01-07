import React, { useState } from 'react';
import '../pages/LoginPage.scss';
import Header from '../Header/Header';
import axios from 'axios';

const LoginPage = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:3002/user/login', {
            username,
            password,
          });
    
          console.log(response.data);
          
        } catch (error) {
          console.error('Error during registration:', error);
        }
      };


    return(
        <div>
            <Header></Header>
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