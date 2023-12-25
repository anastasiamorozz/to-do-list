
import React from "react";
import './Header.scss';
import { useState } from "react";
import { useContext } from "react";
import { UserRoleContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

function Header(){
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [isAccountExist, setIsAccountExist] = useState(true);
    const { userRole } = useContext(UserRoleContext);
    return (
        <header>
            <div className="header">
                <div></div>
                <div className="logo">
                    <img src='/IconYellow.png'></img>
                    <h1>ToDo List</h1>
                </div>
                <div>
                    <button onClick={()=>{navigate("/auth/login")}}> <FontAwesomeIcon icon={faArrowRightToBracket} /> </button>
                </div>
            </div>

        </header>
    );
}

export default Header;