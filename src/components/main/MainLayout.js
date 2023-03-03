import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import ProfilePicture from "./ProfilePicture";
import checkLoginStatus from "../checkLoginStatus";

export default function MainLayout(props) {

    const [name, setName] = useState();
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [profilePicture, setProfilePicture] = useState();

    const checkStatus = async() => {
        const loggedIn = await checkLoginStatus();
        if (loggedIn) {
            getLoginItems();
        } else {
            navigate("/");
            window.location.reload();
        }
    }

    const getLoginItems = async () => {
        try {
          const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${localStorage.getItem("user")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
            },
          });
          const json = await response.json();
          setName({ "firstName": json[0].firstName, "lastName": json[0].lastName });
          setProfilePicture(json[0].profilePicture);
        } catch(error) {
          console.error(error);
        }
      }

    useEffect(() => {
        checkStatus();
    }, [props.component])

    return name === undefined ? <div className="loading-icon"></div> :  (
        <div className="page-wrap">
            <div className="navbar-wrap">
                <Navbar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} firstName={name.firstName} profilePicture={<ProfilePicture image={profilePicture} />} />
            </div>
            <div className="main-wrap">
                <div className="main-sidebar">
                    <Sidebar firstName={name.firstName} lastName={name.lastName} profilePicture={<ProfilePicture image={profilePicture} />} /> 
                </div>
                <div className="main-main">
                    {React.cloneElement(props.component,{ profilePicture: profilePicture })}
                </div>
                <div className="main-rightbar">
                    <Rightbar />
                </div>
            </div>
        </div>
    )
}