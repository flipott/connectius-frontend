import React from "react";
import { Link } from "react-router-dom";

export default function YourConnections(props) {

    const { connections } = props;
    const currentUser = localStorage.getItem("user");

    const disconnect = async(recipient, e) => {
        console.log(recipient);
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:4001/user/${recipient}/connections`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({currentUser})
            });
            const data = await response.json();
            window.location.reload();
        } catch(error) {
            console.log(error);
        }
    }

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
                            <form onSubmit={(e) => disconnect(connection._id, e)}>
                                <button>Disconnect</button>
                            </form>
                        </div>

                    );
                })}                
            </div>
        </>
    )
}