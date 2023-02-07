import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function IndexLayout(props) {

    return (
        <div className="page-wrap">
            <div className="navbar-wrap">
                <Navbar firstName="Phil" />
            </div>
            <div className="main-wrap">
                <div className="main-main">                  
                </div>
            </div>
        </div>
    )
}