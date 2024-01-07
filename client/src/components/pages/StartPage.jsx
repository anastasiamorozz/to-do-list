import React, { useState } from 'react';
import '../pages/StartPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faNode, faJs, faSass, faNpm, faGithub } from '@fortawesome/free-brands-svg-icons';


const StartPage = () => {
    return(
        <div>
            
            <div className="startPage">
                <div className='banner'>
                    <div className="bannerLeft">
                        <h1>Wellcome to best ToDoList!</h1>
                        <p>Create your own tasks and organize them by categories.</p>
                        <a href="#">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Start it for free
                        </a>
                    </div>
                    <img src='/cosmos.svg'></img>
                </div>

                <div className="stack">
                    {/* <h2>Technology stack</h2> */}
                    <ul>
                        <li className='logoReact'><FontAwesomeIcon icon={faReact} /></li>
                        <li className='logoNode'><FontAwesomeIcon icon={faNode} /></li>
                        <li className='logoJS'><FontAwesomeIcon icon={faJs} /></li>
                        <li className='logoSass'><FontAwesomeIcon icon={faSass} /></li>
                        <li className='logoNPM'><FontAwesomeIcon icon={faNpm} /></li>
                    </ul>
                </div>

                <div >
                    <a className="codeLink" href='https://github.com/anastasiamorozz/to-do-list'> 
                        <div className="leftSide">
                            <FontAwesomeIcon icon={faGithub} />
                        </div>
                        <div className="rightSide">
                            <h1>This project is open source</h1>
                            <p>You can find all code by one click</p>
                        </div>
                    </a>
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
}

export default StartPage;