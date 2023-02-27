import React from "react";
import { Link } from "react-router-dom";

export default function Rightbar(props) {
    return (
        <div className="rightbar">
            <div className="ad">
                <p>Get in touch with the creator of Connectius.</p>
                <div>
                    <a href="#"><img src="images/linkedin.svg" /></a>
                    <a href="#"><img src="images/github.svg" /></a>
                    <a href="#"><img src="images/email.svg" /></a>
                </div>
                <p>Copyright © 2023 Phillip Ott</p>
            </div>
        </div>
    )
}