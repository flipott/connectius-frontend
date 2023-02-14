import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <div className="navbar">
            <div>
                <img src="/images/logo-light-alternate.svg" id="main-logo" />
                <Link to="/feed"><p>Current Feed</p></Link>
                <Link to="/find-connections"><p>Find Connections</p></Link>
            </div>
            <div>
                <div className="navbar-profile">
                    <Link to="/profile"><img src="/images/profile-temp.svg" /></Link>
                    <Link to="/profile"><p>{props.firstName}</p></Link>
                </div>
                <Link to="/preferences"><img src="/images/cogs-light.svg" /></Link>
            </div>
        </div>   
    )
}