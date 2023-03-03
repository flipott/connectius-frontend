import { React, useState, useEffect } from "react";
import RequestConnection from "./RequestConnection";
import Pagination from "../Pagination";

export default function Requests(props) {

    const currentUser = localStorage.getItem("user");
    
    const [requests, setRequests] = useState();
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [currentRequests, setCurrentRequests] = useState();
    const postsPerPage = 10;
    

    const getRequests = async () => {
        setLoading(true);

        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${currentUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
            },
            });
            const json = await response.json();
            setRequests(json[0].requests);
            const filteredRequests = json[0].requests;
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            setCurrentRequests(filteredRequests.slice(indexOfFirstPost, indexOfLastPost));
        } catch(error) {
            console.error(error);
        }

        setLoading(false);
    }

    const acceptConnection = async(recipient, e) => {
        e.preventDefault()

        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${currentUser}/connections`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,

                },
                body: JSON.stringify({recipient})
            });
            const data = await response.json();
            getRequests();
        } catch(error) {
            console.log(error);
        }
    }

    const declineConnection = async(recipient, e) => {
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
            getRequests();
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRequests();
    }, [])

    const paginate = (pageNumber, currentPage, postsPerPage, feedPosts) => {
        setCurrentPage(pageNumber);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentRequests(feedPosts.slice(indexOfFirstPost, indexOfLastPost));
    }

    return (
        <>
            <div className="main-top">Your Requests</div>
            <div className="posts-container">
                {loading && <div className="loading-icon"></div>}
                {!loading && currentRequests && currentRequests.length === 0 && <div>You do not have any requests.</div>}
                {!loading && currentRequests && currentRequests.length > 0 && <div className="text-divider">Viewing Your Requests</div>}
                <div className="request-connections">
                    {!loading && currentRequests && currentRequests.length > 0 && currentRequests.map((request) => <RequestConnection key={request._id} request={request} acceptConnection={acceptConnection} declineConnection={declineConnection} /> )}
                </div>
                {!loading && currentRequests && currentRequests.length > 0 && <Pagination postsPerPage={postsPerPage} totalPosts={requests.length} paginate={paginate} currentPage={currentPage} feedPosts={requests} />}
            </div>
        </>
    )
}