import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        navigate("/");
        window.location.reload();
    }

    return (
        <div className="sidebar">
            <div className="sidebar-profile">
                <div>
                    <Link to="/profile">{props.profilePicture}</Link>
                </div>
                <div>
                    <Link to="/profile"><p>{props.firstName} {props.lastName}</p></Link>
                </div>
            </div>
            <ul>
                <li>
                    <div>
                        <img src="/images/icons-dark/newspaper-dark.svg" />
                        <Link to="/feed">Current Feed</Link>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="/images/icons-dark/user-dark.svg" />
                        <Link to="/profile">Profile</Link>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="/images/icons-dark/connections-dark.svg" />
                        <Link to="/connections">Connections</Link>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="/images/icons-dark/bell-dark.svg" />
                        <Link to="/requests">Requests</Link>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="/images/icons-dark/like-dark.svg" />
                        <Link to="/liked">Liked Posts</Link>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                        <div>
                            <img src="/images/icons-dark/cogs-dark.svg" />
                            <Link to="/preferences">Preferences</Link>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src="/images/icons-dark/door-dark.svg" />
                            <a href="#" onClick={logOut}>Log Out</a>
                        </div>
                    </li>
            </ul>
        </div> 
    )
}