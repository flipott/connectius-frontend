import React from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

export default function RequestConnection(props) {
    const { request, acceptConnection, declineConnection } = props;
    return (
        <div className="user-card" key={request._id}>
            <div className="user-card-top">
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
}