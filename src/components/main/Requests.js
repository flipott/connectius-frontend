import React from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

export default function Requests(props) {

    const { requests } = props;
    const currentUser = localStorage.getItem("user");
    console.log(requests);


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
                        <div className="request-card" key={request._id}>
                            <div className="sidebar-profile">
                            <Link to={`/connections/${request._id}`}> <ProfilePicture image={request.profilePicture} /></Link>
                            <p><Link to={`/connections/${request._id}`}>{request.firstName} {request.lastName}</Link></p>
                            </div>
                            <div className="border-line"></div>
                            <div className="request-buttons">
                                <form onSubmit={(e) => acceptConnection(request._id, e)}>
                                    <button>Accept</button>
                                </form>                            
                                <form onSubmit={(e) => declineConnection(request._id, e)}>
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