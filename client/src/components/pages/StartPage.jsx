import React, { useState } from 'react';
import '../pages/StartPage.scss';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faNode, faJs, faSass, faNpm } from '@fortawesome/free-brands-svg-icons';


const StartPage = () => {
    return(
        <div>
            <Header />
            <div className="startPage">
                <div className='banner'>
                    <div className="bannerLeft">
                        <h1>Wellcome to best ToDoList!</h1>
                        <p>Create your own tasks and organize them by categories.</p>
                        <button className='custom-btn btn-5'>Start it for free</button>
                    </div>
                    <img src='/cosmos.svg'></img>
                </div>

                <div className="stack">
                    {/* <h2>Technology stack</h2> */}
                    <ul>
                        <li><FontAwesomeIcon icon={faReact} /></li>
                        <li><FontAwesomeIcon icon={faNode} /></li>
                        <li><FontAwesomeIcon icon={faJs} /></li>
                        <li><FontAwesomeIcon icon={faSass} /></li>
                        <li><FontAwesomeIcon icon={faNpm} /></li>
                    </ul>
                </div>
            </div>
            
        </div>
    );
}

export default StartPage;