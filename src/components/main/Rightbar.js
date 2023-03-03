import React from "react";

export default function Rightbar() {
    return (
        <div className="rightbar">
            <div className="ad">
                <p>Get in touch with Connectius.</p>
                <div>
                    <a href="#"><img src={process.env.PUBLIC_URL + "/images/linkedin.svg"} /></a>
                    <a href="#"><img src={process.env.PUBLIC_URL + "/images/github.svg"} /></a>
                    <a href="#"><img src={process.env.PUBLIC_URL + "/images/email.svg"}/></a>
                </div>
                <p>Copyright © 2023 Phillip Ott</p>
            </div>
        </div>
    )
}