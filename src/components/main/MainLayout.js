import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function IndexLayout(props) {

    return (
        <div className="page-wrap">
            <Navbar firstName="Phil" />
            <div className="main-wrap">
                <div className="main-main">                  
                </div>
            </div>
        </div>
    )
}