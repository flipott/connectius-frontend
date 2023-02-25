import React from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

export default function CurrentConnection(props) {
    const { connection, disconnect } = props;

    return (
        <div className="user-card" key={connection._id}>
            <div className="user-card-top">
            <Link to={`/connections/${connection._id}`}> <ProfilePicture image={connection.profilePicture} /></Link>
            <p><Link to={`${connection._id}`}>{connection.firstName} {connection.lastName}</Link></p>
            </div>
            <div className="border-line"></div>
            <form onSubmit={(e) => disconnect(connection._id, e)}>
                <button>Disconnect</button>
            </form>
        </div>
    );
}