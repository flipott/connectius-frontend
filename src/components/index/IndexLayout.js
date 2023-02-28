import React from "react";
import IndexFooter from "./IndexFooter";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function IndexLayout(props) {

    const navigate = useNavigate();

    const animatedText = [
        `<p class="animated-text">Socializing made <span class="animated-orange">simple.</span></p>`,
        `<p class="animated-text"><span class="animated-orange">Connect</span> with friends.</p>`,
        `<p class="animated-text"><span class="animated-orange">Share</span> your thoughts.</p>`,
    ]

    const [text, setText] = useState(animatedText[0]);
    const [textIndex, setTextIndex] = useState(1)

    useEffect(() => {
        if (props.loggedIn) {
            navigate("/feed", {replace: true});
        }
    }, [props.loggedIn]);

    useEffect(() => {
        const interval = setInterval(() => {
            setText(animatedText[textIndex]);
            if (textIndex + 1 >= animatedText.length) {
                setTextIndex(0);
            } else {
                setTextIndex((prev) => prev + 1);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [textIndex])

    return (
        <div className="page-wrap">
            <div className="index-wrap">
                <div className="index-main">
                    <div className="hero-left">
                        <Link to="/"><img src="/images/logo-light.svg" /></Link>
                        <div dangerouslySetInnerHTML={{ __html: text }} />
                    </div>
                    {props.component}
                </div>
            </div>
            <div className="footer-wrap">
                <IndexFooter />
            </div>
        </div>
    )
}