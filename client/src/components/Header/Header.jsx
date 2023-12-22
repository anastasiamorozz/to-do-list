import React from 'react';
import './Header.scss';

function Header(){
    return (
        <header>
            <div className="logo">
                <img src='/IconYellow.png'></img>
                <h1>ToDo List</h1>
            </div>
        </header>
    );
}

export default Header;