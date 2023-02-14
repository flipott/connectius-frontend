import React from "react";
import { Link } from "react-router-dom";

export default function Requests(props) {

    const { requests } = props;
    const currentUser = localStorage.getItem("user");


    const acceptConnection = async(recipient, e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:4001/user/${currentUser}/connections`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({recipient})
            });
            const data = await response.json();
            window.location.reload();
        } catch(error) {
            console.log(error);
        }
    }

    const declineConnection = async(recipient, e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:4001/user/${recipient}/request`, {
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
                { requests && requests.map((request) => {
                    return (
                        <div className="request-card" key={request.user._id}>
                            <div className="sidebar-profile">
                                <img src="/images/profile-temp.svg" />
                                <p>{request.user.firstName} {request.user.lastName}</p>
                            </div>
                            <div className="border-line"></div>
                            <div className="request-buttons">
                                <form onSubmit={(e) => acceptConnection(request.user._id, e)}>
                                    <button>Accept</button>
                                </form>                            
                                <form onSubmit={(e) => declineConnection(request.user._id, e)}>
                                    <button>Decline</button>
                                </form>     
                            </div>
                        </div>
                    );
                })}                  
            </div>
        </>
    )
}