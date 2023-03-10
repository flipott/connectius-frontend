import { React, useState, useEffect } from "react";
import AvailableConnection from "./AvailableConnection";
import Pagination from "../Pagination";

export default function FindConnections(props) {

    const [filteredConnections, setFilteredConnections] = useState();

    const currentUser = localStorage.getItem("user");
    const [requestData, setRequestData] = useState();
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentConnections, setCurrentConnections] = useState();
    const postsPerPage = 10;

    const getAllUsers = async () => {
        setLoading(true);

        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
            });
            const json = await response.json();
            const filteredUsers = json.filter(user => user._id !== currentUser);
            const filteredConnectionsTest = filteredUsers.filter(user => isConnected(user) === false)
            setFilteredConnections(filteredUsers.filter(user => isConnected(user) === false));
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            setCurrentConnections(filteredConnectionsTest.slice(indexOfFirstPost, indexOfLastPost));
        } catch(error) {
            console.error(error);
        }

        setLoading(false);
    }

    const isConnected = (user) => {
        const connectedArray = user.connections;
        return connectedArray.includes(currentUser) ? true : false;
    }

    const isRequested = (user) => {
        const requestsArray = user.requests;
        return requestsArray.includes(currentUser) ? true : false;
    }

    useEffect(() => {
        getAllUsers();
        window.scrollTo(0, 0)
    }, [requestData, currentPage])

    const sendConnectionRequest = async(recipient, e) => {
        e.preventDefault()

        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${recipient}/request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({currentUser})
            });
            const data = await response.json();
            setRequestData(data);
            getAllUsers();
        } catch(error) {
            console.log(error);
        }
    }

    const cancelConnectionRequest = async(recipient, e) => {
        e.preventDefault()

        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${recipient}/request`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({currentUser})
            });
            const data = await response.json();
            setRequestData(data);
            getAllUsers();
        } catch(error) {
            console.log(error);
        }
    }

    const paginate = (pageNumber, currentPage, postsPerPage, feedPosts) => {
        setCurrentPage(pageNumber);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentConnections(feedPosts.slice(indexOfFirstPost, indexOfLastPost));
    }

    return (
        <>
            <div className="main-top">Find Connections</div>
            <div className="posts-container">
                {loading && <div className="loading-icon"></div>}
                {!loading && currentConnections && currentConnections.length === 0 && <div>There are no connections available.</div>}
                {!loading && currentConnections && currentConnections.length > 0 && <div className="text-divider">Viewing All Available Connections</div> }
                {!loading && currentConnections && currentConnections.length > 0 && 
                <div className="request-connections">
                    {currentConnections.map((user) =>
                    <AvailableConnection key={user._id} user={user} isRequested={isRequested} cancelConnectionRequest={cancelConnectionRequest} sendConnectionRequest={sendConnectionRequest} />
                )}
                </div> 
                }
                {!loading && currentConnections && currentConnections.length > 0 && <Pagination postsPerPage={postsPerPage} totalPosts={filteredConnections.length} paginate={paginate} currentPage={currentPage} feedPosts={filteredConnections} />}
            </div>
        </>
    )
}