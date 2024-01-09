import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../pages/ProfilePage.scss';

const ProfilePage = () =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");

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
    
        localStorage.setItem("username", response.data.username);
        alert(response.data.message);
        navigate("/main");
      } catch (error) {
        console.error('Error during username update:', error);
      }
    };

    const updatePassword = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
    
        const response = await axios.post(
          `http://localhost:3002/user/updatePassword/${userId}`,
          { currentPassword, password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(response.data.message);
        navigate("/main");
      } catch (error) {
        console.error('Error during password update:', error);
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

            <h1>Password</h1>
            <input
                        type="password"
                        id="currentPassword"
                        placeholder="Current password..."
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
            /><br></br>
                        <input
                        type="password"
                        id="password"
                        placeholder="New password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
            /><br></br>
            <button onClick={()=>updatePassword()} >Update Password</button>
        </div>
    )
}

export default ProfilePage;