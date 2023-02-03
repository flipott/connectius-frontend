import React from "react";
import { Link } from "react-router-dom";

export default function IndexFooter() {
    return (
        <div className="index-footer">
            <ul>
                <li><Link to="/register">Sign Up</Link></li>
                <li><Link to="/">Log In</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <p>Copyright © 2023 Phillip Ott</p>
        </div>
    )
}