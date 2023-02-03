import React from "react";
import IndexFooter from "./IndexFooter";

export default function IndexLayout(props) {
    return (
        <div className="index">
            <div className="index-main">
                <p>LOGO</p>
                {props.component}
            </div>
            <IndexFooter />
        </div>
    )
}