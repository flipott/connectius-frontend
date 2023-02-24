import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import ProfilePicture from "./ProfilePicture";
import checkLoginStatus from "../checkLoginStatus";

export default function MainLayout(props) {

    const { name, profilePicture } = props;
    const navigate = useNavigate();

    const check = async() => {
        const loggedIn = await checkLoginStatus();
        if (loggedIn) {
            return null;
        } else {
            navigate("/");
            window.location.reload();
        }
    }

    React.useEffect(() => {
        check();
    }, [props.component])


    return name === undefined ? null :  (
        <div className="page-wrap">
            <div className="navbar-wrap">
                <Navbar firstName={name.firstName} profilePicture={<ProfilePicture image={profilePicture} />} />
            </div>
            <div className="main-wrap">
                <div className="main-sidebar">
                    <Sidebar firstName={name.firstName} lastName={name.lastName} profilePicture={<ProfilePicture image={profilePicture} />} /> 
                </div>
                <div className="main-main">
                    {props.component}
                </div>
                <div className="main-rightbar">
                    <Rightbar firstName={name.firstName} lastName={name.lastName} />
                </div>
            </div>
        </div>
    )
}