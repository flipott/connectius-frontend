import { React, useState, useEffect } from "react";
import CurrentConnection from "./CurrentConnection";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

export default function YourConnections(props) {

    const currentUser = localStorage.getItem("user");
    const [connections, setConnections] = React.useState();
    const [loading, setLoading] = React.useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = React.useState(1);
    const [currentConnections, setCurrentConnections] = React.useState();
    const postsPerPage = 10;


    const getConnections = async () => {
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:4001/user/${currentUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              }
            });
            const json = await response.json();
            setConnections(json[0].connections);
            const filteredConnections = json[0].connections;
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            setCurrentConnections(filteredConnections.slice(indexOfFirstPost, indexOfLastPost));
        } catch(error) {
            console.error(error);
        }

        setLoading(false);
    }

    const disconnect = async(recipient, e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:4001/user/${recipient}/connections`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({currentUser})
            });
            const data = await response.json();
            getConnections();
        } catch(error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getConnections();
    }, [])

    const paginate = (pageNumber, currentPage, postsPerPage, feedPosts) => {
        setCurrentPage(pageNumber);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentConnections(feedPosts.slice(indexOfFirstPost, indexOfLastPost));
    }

    return (
        <>
            <div className="main-top">Your Connections</div>
            <div className="posts-container">
                {loading && <div className="loading-icon"></div>}
                {!loading && currentConnections && currentConnections.length === 0 && <div>You are currently not connected with anyone. <Link className="profile-link" to="/find-connections">Find Connections here!</Link></div>}
                {!loading && currentConnections && currentConnections.length > 0 && <div className="text-divider">Viewing Your Connections</div> }
                {!loading && currentConnections && currentConnections.length > 0 && 
                <div className="request-connections">
                    {currentConnections.map((connection) => <CurrentConnection key={connection._id} connection={connection} disconnect={disconnect} /> )}
                </div>    
                }
                {!loading && currentConnections && currentConnections.length > 0 && <Pagination postsPerPage={postsPerPage} totalPosts={connections.length} paginate={paginate} currentPage={currentPage} feedPosts={connections} />}            
            </div>
        </>
    )
}