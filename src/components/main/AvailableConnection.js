import React from "react";
import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";

export default function AvailableConnection(props) {
    const { user, isRequested, cancelConnectionRequest, sendConnectionRequest } = props;
    return (
        <div className="user-card" key={user._id}>
            <div className="user-card-top">
                <Link to={`/connections/${user._id}`}> <ProfilePicture image={user.profilePicture} /></Link>
                <p><Link to={`/connections/${user._id}`}>{user.firstName} {user.lastName}</Link></p>
            </div>
            <div className="border-line"></div>
            {
                isRequested(user) ? 
                <form onSubmit={(e) => cancelConnectionRequest(user._id, e)}>
                    <button>Cancel Connection Request</button>
                </form>                                      
                : 
                <form onSubmit={(e) => sendConnectionRequest(user._id, e)}>
                    <button>Send Connection Request</button>
                </form>                            
            }
        </div>
    );
}