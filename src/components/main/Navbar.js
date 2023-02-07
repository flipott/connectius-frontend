import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <div className="navbar">
            <div>
                <img src="/images/logo-light-alternate.svg" />
                <Link to="/feed"><p>Current Feed</p></Link>
            </div>
            <div>
                <div className="navbar-profile">
                    <img src="/images/profile-temp.svg" />
                    <p>{props.firstName}</p>
                </div>
                <img src="/images/cogs-light.svg" />
            </div>
        </div>   
    )
}