import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../pages/ProfilePage.scss';

const ProfilePage = () =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, seCurrentPassword] = useState("");
    const [password, setPassword] = useState("");

    const token = localStorage.getItem('accessToken');

    const updateUsername = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
    
        const response = await axios.post(
          `http://localhost:3002/user/updateUsername/${userId}`,
          { username },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        navigate("/main");
      } catch (error) {
        console.error('Error during username update:', error);
      }
    };

    return(
        <div className="profile">
            <h1>Username</h1>
            <input
                        type="text"
                        id="username"
                        placeholder="New username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
            /><br></br>
            <button onClick={()=>updateUsername()} >Update Username</button>

            <h1>Email</h1>
            <input
                        type="email"
                        id="email"
                        placeholder="New email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
            /><br></br>
            <button onClick={()=>updateUsername()} >Update Email</button>

            <h1>Password</h1>
            <input
                        type="password"
                        id="currentPassword"
                        placeholder="Current password..."
                        value={currentPassword}
                        onChange={(e) => seCurrentPassword(e.target.value)}
            /><br></br>
                        <input
                        type="password"
                        id="password"
                        placeholder="New password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
            /><br></br>
            <button onClick={()=>updateUsername()} >Update Password</button>
        </div>
    )
}

export default ProfilePage;