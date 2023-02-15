import React from "react";
import { Link } from "react-router-dom";

export default function YourConnections(props) {

    const { connections } = props;
    console.log(connections);

    return (
        <>
            <div className="main-top">Hello.</div>
            <div className="posts-container">
                <div className="text-divider">Viewing Your Connections</div>
                { connections && connections.map((connection) => {
                    return (
                        <div className="connection-card" key={connection._id}>
                            <div className="sidebar-profile">
                                <img src="/images/profile-temp.svg" />
                                <p>{connection.firstName} {connection.lastName}</p>
                            </div>
                            <div className="border-line"></div>
                        </div>

                    );
                })}                
            </div>
        </>
    )
}