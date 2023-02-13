import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";

export default function MainLayout(props) {

    const { name } = props;


    return (
        <div className="page-wrap">
            <div className="navbar-wrap">
                <Navbar firstName={name.firstName} />
            </div>
            <div className="main-wrap">
                <div className="main-sidebar">
                    <Sidebar firstName={name.firstName} lastName={name.lastName} /> 
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