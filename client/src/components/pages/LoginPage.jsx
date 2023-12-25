import React, { useState } from 'react';
import '../pages/LoginPage.scss';
import Header from '../Header/Header';


const LoginPage = () =>{
    return(
        <div>
            <Header></Header>
            <div className="loginPage">
                <form>
                    <input type="text" id="username" placeholder='Username'/><br/>
                    <input type="text" id="password" placeholder='Password'/><br/>
                    <nav>
                        <ul>
                            <li>
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