import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <div className="sidebar">
            <div className="sidebar-profile">
                <Link to="/profile">{props.profilePicture}</Link>
                <Link to="/profile"><p>{props.firstName} {props.lastName}</p></Link>
            </div>
            <ul>
                <li>
                    <div>
                        <img src="/images/newspaper-dark.svg" />
                        <Link to="/feed">Current Feed</Link>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="/images/user-dark.svg" />
                        <Link to="/profile">Your Profile</Link>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="/images/user-dark.svg" />
                        <Link to="/connections">Your Connections</Link>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="/images/like-dark.svg" />
                        <Link to="/liked">Liked Posts</Link>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                        <div>
                            <img src="/images/cogs-dark.svg" />
                            <Link to="/preferences">Preferences</Link>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src="/images/door-dark.svg" />
                            <Link to="/logout">Log Out</Link>
                        </div>
                    </li>
            </ul>
        </div> 
    )
}