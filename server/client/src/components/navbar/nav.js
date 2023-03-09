import React, { useState, useEffect } from 'react';
import './navi.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import { ResForm } from '../calendar/Reservation';
import { ProfileView } from '../profile/Profile';
//import { EventForm } from '../calendar/Event';
import { DocDisplay } from '../Documents/DocDisplay';

export function Navi({ calData, fetchCalData, users }) {
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
    }, [window.innerWidth])

    const handleLogout = () => {
        sessionStorage.setItem("userAuth", 0);
        sessionStorage.removeItem("userData");
        window.location.reload();
    }

    return(
        <nav>
            <div className="brand-container">
                <div className="navi-brand">
                    <h1 className="navi-name">
                        CedarFallsRanch
                    </h1>
                    <div className="brand-details">
                        <p className="navi-user">
                            {sessionStorage.getItem("name")}
                        </p>
                        <a href="https://instagram.com/cedarfallsranch" className="ig-link">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="links-container">
                <div className="navi-links">
                    {(toggleMenu || screenWidth > 950) && (
                    <ul className="navi-btns">
                        <li className="btns"><DocDisplay users={users} /></li>
                        <li className="btns"><ResForm calData={calData} fetchCalData={fetchCalData} users={users}/></li>
                        <li className="btns"><ProfileView/></li>
                        <li className="btns"><Button className="navBtn" onClick={handleLogout}>Logout</Button></li>
                    </ul>
                    )}
                </div>
            </div>
            <button className="icon" onClick={toggleNav}>&#9776;</button>
        </nav>
    );
}
