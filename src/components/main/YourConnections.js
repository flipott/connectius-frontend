import React from "react";
import { Link } from "react-router-dom";

export default function YourConnections(props) {

    const { connections } = props;

    return (
        <>
            <div className="main-top">Hello.</div>
            <div className="posts-container">
                <div className="text-divider">Viewing Your Connections</div>
                { connections && connections.map((connections) => {
                    return (
                        <div className="user-card">

                        </div>
                    );
                })}                
            </div>
        </>
    )
}