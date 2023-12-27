import React from "react";
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons';

const Footer = () =>{
    return(
        <div className="footer">
                <ul>
                    <p>Winter, 2023</p>
                    <h2>Author contacts</h2>
                    <li>
                        <a href="https://github.com/anastasiamorozz">
                        <FontAwesomeIcon icon={faGithub} />
                        <p>GitHub</p>
                        </a>
                    </li>
                    <li>
                        <a href="https://t.me/pollodrax">
                        <FontAwesomeIcon icon={faTelegram} />
                        <p>Telegram</p>
                        </a>
                    </li>
                </ul>
                <h3>
                "Create your own tasks and organize them by categories."
                </h3>
        </div>
    );
}

export default Footer;