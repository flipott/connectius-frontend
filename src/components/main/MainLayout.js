import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";

export default function IndexLayout(props) {

    return (
        <div className="page-wrap">
            <div className="navbar-wrap">
                <Navbar firstName="Phil" />
            </div>
            <div className="main-wrap">
                <div className="main-sidebar">
                    <Sidebar firstName="Phil" lastName="Ott" /> 
                </div>
                <div className="main-main">
                    {props.component}
                </div>
                <div className="main-rightbar">
                    <Rightbar firstName="Phil" lastName="Ott" />
                </div>
            </div>
        </div>
    )
}