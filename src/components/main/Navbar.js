import { React } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
    const { showMobileMenu, setShowMobileMenu } = props;
    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        navigate("/");
        window.location.reload();
    }

    return (
        <div className="navbar">
            <Link to="/feed"><img src="/images/icons-light/logo-light-alternate.svg" id="main-logo" /></Link>
            <div className="navbar-links">
                <Link to="/feed"><p>Current Feed</p></Link>
                <Link to="/find-connections"><p>Find Connections</p></Link>
            </div>
            <div>
                <div className="navbar-profile">
                    <Link to="/profile">{props.profilePicture}</Link>
                    <Link to="/profile"><p>{props.firstName}</p></Link>
                </div>
            </div>
            <div className="navbar-mobile">
                <a className={showMobileMenu ? "hamburger-icon show-mobile-menu" : "hamburger-icon"} onClick={() => setShowMobileMenu(prevValue => !prevValue)}><span></span></a>
                <ul id="mobile-menu" className={showMobileMenu ? "show-mobile-menu" : ""}>
                    <li onClick={() => setShowMobileMenu(false)}><Link to="/feed"><img src="/images/icons-light/newspaper-light.svg" />Current Feed</Link></li>
                    <li onClick={() => setShowMobileMenu(false)}><Link to="/profile"><img src="/images/icons-light/user-light.svg" />Profile</Link></li>
                    <li onClick={() => setShowMobileMenu(false)}><Link to="/connections"><img src="/images/icons-light/connections-light.svg" />Connections</Link></li>
                    <li onClick={() => setShowMobileMenu(false)}><Link to="/requests"><img src="/images/icons-light/bell-light.svg" />Requests</Link></li>
                    <li onClick={() => setShowMobileMenu(false)}><Link to="/liked"><img src="/images/icons-light/like-light.svg" />Liked Posts</Link></li>
                    <li onClick={() => setShowMobileMenu(false)}><Link to="/preferences"><img src="/images/icons-light/cogs-light.svg" />Preferences</Link></li>
                    <li onClick={() => setShowMobileMenu(false)}><a href="#" onClick={(e) => logOut(e)}><img src="/images/icons-light/door-light.svg" />Log Out</a></li>
                </ul>
            </div>
        </div>   
    )
}    