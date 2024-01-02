import React, { useState } from 'react';
import '../pages/LoginPage.scss';
import Header from '../Header/Header';

const RegPage = () =>{
    return(
        <div>
            <Header></Header>
            <div className="loginPage">
                <form>
                    <h1>Sign up</h1>
                    <input type="text" id="username" placeholder='Username'/><br/>
                    <input type="text" id="email" placeholder='Email'/><br/>
                    <input type="text" id="password" placeholder='Password'/><br/>
                    <a href='/auth/login'>Already have an account?</a>
                    <nav>
                        <ul>
                            <li>
                            register
                            <span></span><span></span><span></span><span></span>
                            </li>
                        </ul>
                    </nav>
                </form>
            </div>

        </div>
    );
    
}

export default RegPage;