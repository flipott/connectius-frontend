import React from "react";
import IndexFooter from "./IndexFooter";

const animatedText = [
    `<p class="animated-text">Socializing made <span class="animated-orange">simple.</span></p>`,
    `<p class="animated-text"><span class="animated-orange">Connect</span> with friends.</p>`,
    `<p class="animated-text"><span class="animated-orange">Share</span> your thoughts.</p>`,
]

export default function IndexLayout(props) {
    return (
        <div className="page-wrap">
            <div className="index-wrap">
                <div className="index-main">
                    <div class="hero-left">
                        <img src="/images/logo-light.svg" />
                        <div dangerouslySetInnerHTML={{ __html: animatedText[2] }} />
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