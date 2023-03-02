import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import ProfilePicture from "./ProfilePicture";
import checkLoginStatus from "../checkLoginStatus";

export default function MainLayout(props) {

    const { name, profilePicture } = props;
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const checkStatus = async() => {
        const loggedIn = await checkLoginStatus();
        if (loggedIn) {
            return null;
        } else {
            navigate("/");
            window.location.reload();
        }
    }

    useEffect(() => {
        checkStatus();
    }, [props.component])


    return name === undefined ? null :  (
        <div className="page-wrap">
            <div className="navbar-wrap">
                <Navbar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} firstName={name.firstName} profilePicture={<ProfilePicture image={profilePicture} />} />
            </div>
            <div className="main-wrap">
                <div className="main-sidebar">
                    <Sidebar firstName={name.firstName} lastName={name.lastName} profilePicture={<ProfilePicture image={profilePicture} />} /> 
                </div>
                <div className="main-main">
                    {props.component}
                </div>
                <div className="main-rightbar">
                    <Rightbar />
                </div>
            </div>
        </div>
    )
}