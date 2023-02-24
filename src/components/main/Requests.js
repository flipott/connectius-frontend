import React from "react";
import RequestConnection from "./RequestConnection";
import Pagination from "../Pagination";

export default function Requests(props) {

    const currentUser = localStorage.getItem("user");
    
    const [requests, setRequests] = React.useState();
    const [loading, setLoading] = React.useState(true);

    // Pagination states
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage, setPostsPerPage] = React.useState(10);
    const [currentRequests, setCurrentRequests] = React.useState();
    

    const getRequests = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:4001/user/${currentUser}`, {
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
        setLoading(false);
    }

    const acceptConnection = async(recipient, e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:4001/user/${currentUser}/connections`, {
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
            const response = await fetch(`http://localhost:4001/user/${recipient}/request`, {
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

    React.useEffect(() => {
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
                {!loading && currentRequests && currentRequests.length > 0 && currentRequests.map((request) => <RequestConnection key={request._id} request={request} acceptConnection={acceptConnection} declineConnection={declineConnection} /> )}
                {!loading && currentRequests && currentRequests.length > 0 && <Pagination postsPerPage={postsPerPage} totalPosts={requests.length} paginate={paginate} currentPage={currentPage} feedPosts={requests} />}
            </div>
        </>
    )
}