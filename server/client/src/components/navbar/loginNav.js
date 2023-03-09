import React, { useState, useEffect } from 'react';
import './navi.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import { ContactForm } from '../contact/contact';
import { LoginDocDisplay } from '../Documents/LoginDocDisplay';


export function LoginNavi() {
    // For the Responsiveness toggling
    const [toggleMenu, setToggleMenu] = useState(false)
    const[screenWidth, setScreenWidth] = useState(window.innerWidth)

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])

    return(
        <nav className="navi-container">
            <div className="brand-container">
                <div className="navi-brand">
                    <h1 className="navi-name">
                        CedarFallsRanch
                    </h1>
                    <div className="brand-details">
                        <div></div>
                        <a href="https://instagram.com/cedarfallsranch" className="ig-link">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="links-container">
                <div className="navi-links">
                    {(toggleMenu || screenWidth > 920) && (
                    <ul className="navi-btns">
                        <li className="btns"><LoginDocDisplay /></li>
                        <li className="btns"><ContactForm /></li>
                    </ul>
                    )}
                </div>
            </div>
            <button className="login-icon" onClick={toggleNav}>Help</button>
        </nav>
    );
}
