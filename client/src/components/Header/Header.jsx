
import React from "react";
import './Header.scss';
import { useContext } from "react";
import { UserRoleContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

function Header(){
    const navigate = useNavigate();
    const { userRole } = useContext(UserRoleContext);
    const username = localStorage.getItem("username");
    return (
        <header>
            <div className="header">
                <div></div>
                    <button onClick={()=>{navigate("/")}}>
                        <div className="logo">
                            <img src='/IconYellow.png'></img>
                            <h1>ToDo List</h1>
                        </div>
                        
                    </button>

                    {userRole!='user'&& (<button onClick={()=>{navigate("/auth/reg")}}> <FontAwesomeIcon icon={faArrowRightToBracket} /> </button>)}
                    {userRole == 'user' && (<a onClick={()=>{navigate("/profile")}}>{username}`s profile</a>)}
                    
            </div>

        </header>
    );
}

export default Header;