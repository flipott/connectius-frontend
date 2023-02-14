import React from "react";
import { Link } from "react-router-dom";

export default function FindConnections(props) {

    const { allUsers } = props;
    const currentUser = localStorage.getItem("user");
    const [requestData, setRequestData] = React.useState();

    const isConnected = (user) => {
        const connectedArray = user.connections;
        return connectedArray.includes(currentUser) ? true : false;
    }

    const isRequested = (user) => {
        const requestsArray = user.requests;
        return requestsArray.includes(currentUser) ? true : false;
    }

    const filteredUsers = allUsers.filter(user => user._id !== currentUser);
    const filterConnections = filteredUsers.filter(user => isConnected(user) === false);


    React.useEffect(() => {
        console.log("WHAT");
    }, [requestData])




    const sendConnectionRequest = async(recipient, e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:4001/user/${recipient}/request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({currentUser})
            });
            const data = await response.json();
            setRequestData(data);
            window.location.reload();
        } catch(error) {
            console.log(error);
        }
    }

    const cancelConnectionRequest = async(recipient, e) => {
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
            setRequestData(data);
            window.location.reload();
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="main-top">Hello.</div>
            <div className="posts-container">
                <div className="text-divider">Viewing All Available Connections</div>
                { filterConnections && filterConnections.map((user) => {
                    return (
                        <div className="user-card" key={user._id}>
                            <div className="sidebar-profile">
                                <img src="/images/profile-temp.svg" />
                                <p>{user.firstName} {user.lastName}</p>
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
                })}                
            </div>
        </>
    )
}