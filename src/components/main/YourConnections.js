import React from "react";
import CurrentConnection from "./CurrentConnection";
import Pagination from "../Pagination";

export default function YourConnections(props) {

    const currentUser = localStorage.getItem("user");
    const [connections, setConnections] = React.useState();

    // Pagination states
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage, setPostsPerPage] = React.useState(10);
    const [currentConnections, setCurrentConnections] = React.useState();


    const getConnections = async () => {
        const response = await fetch(`http://localhost:4001/user/${currentUser}`, {
          headers: {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
          }
        });
        const json = await response.json();
        setConnections(json[0].connections);
        const filteredConnections = json[0].connections;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentConnections(filteredConnections.slice(indexOfFirstPost, indexOfLastPost));
    }

    const disconnect = async(recipient, e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:4001/user/${recipient}/connections`, {
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

    React.useEffect(() => {
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
            <div className="main-top">Hello.</div>
            <div className="posts-container">
                <div className="text-divider">Viewing Your Connections</div>
                { currentConnections && currentConnections.map((connection) => <CurrentConnection key={connection._id} connection={connection} disconnect={disconnect} /> )}
                { currentConnections && <Pagination postsPerPage={postsPerPage} totalPosts={connections.length} paginate={paginate} currentPage={currentPage} feedPosts={connections} />}            
            </div>
        </>
    )
}