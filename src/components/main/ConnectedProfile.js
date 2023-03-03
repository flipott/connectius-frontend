import { React, useState, useEffect } from "react";
import Post from "../Post";
import Pagination from "../Pagination";

export default function ConnectedProfile() {
    const currentUser = localStorage.getItem("user");

    const hash = window.location.hash;
    const connectionId = hash.substring("#/connections/".length);

    const [isConnected, setIsConnected] = useState(false);
    const [feedPosts, setFeedPosts] = useState();
    const [profileName, setProfileName] = useState();
    const [userLikes, setUserLikes] = useState();
    const [userPosts, setUserPosts] = useState();
    const [userRequests, setUserRequests] = useState();
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState();
    const postsPerPage = 5;


    const isRequested = (userRequests, connectedProfileId) => {
        return userRequests.some(item => item._id === connectedProfileId) ? true : false;
    }
    const getProfileName = async(connectionId) => {
        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${connectionId}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                }
            });
            const json = await response.json();
            if (json[0].firstName && json[0].lastName) {
                setProfileName({"firstName": json[0].firstName, "lastName": json[0].lastName});
                setUserRequests(json[0].requests);
            } else {
                return null;
            }
        } catch(error) {
            console.error(error);
        }
    }

    const getConnectionPosts = async(connectionId) => {
        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${connectionId}/post`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
            });
            const json = await response.json();
            setFeedPosts(json);
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            setCurrentPosts(json.slice(indexOfFirstPost, indexOfLastPost));
            await getProfileName(connectionId);
        } catch(error) {
            console.error(error);
        }
    }

    const getConnectionFeed = async (connectionId, withLoading) => {
        if (withLoading) {
            setLoading(true);
        }
        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${currentUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
            },
            });
            const json = await response.json();
            const connectionList = json[0].connections;
            const likedList = json[0].liked;
            const userPosts = json[0].posts;
            setUserPosts(userPosts);
            setUserLikes(likedList);
    
            // Verify users are connected
            if (connectionList.some(item => item._id === connectionId)) {
                setIsConnected(true);
                await getConnectionPosts(connectionId);
            } else {
                setIsConnected(false);
                await getProfileName(connectionId);
                setLoading(false);
                return null;
            }
        } catch(error) {
            console.error(error);
        }
        if (withLoading) {
            setLoading(false);
        }
    }

    const likePost = async(post, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${post.user}/post/${post._id}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({currentUser})
            });
            getConnectionFeed(connectionId, false);
        } catch(error) {
            console.log(error);
        }    
    }

    const unlikePost = async(post, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${post.user}/post/${post._id}/like`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({currentUser})
            });
            getConnectionFeed(connectionId, false);
        } catch(error) {
            console.log(error);
        }    
    }

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
            getConnectionFeed(connectionId, false)
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
            getConnectionFeed(connectionId, false)

        } catch(error) {
            console.log(error);
        }
    }
  

    useEffect(() => {
        getConnectionFeed(connectionId, true)
        window.scrollTo(0, 0)
    }, [currentPage])

    const paginate = (pageNumber, currentPage, postsPerPage, feedPosts) => {
        setCurrentPage(pageNumber);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentPosts(feedPosts.slice(indexOfFirstPost, indexOfLastPost));
    }

    return (
        <>
            <div className="main-top">Welcome back!</div>
            <div className="posts-container">

                {loading && <div className="loading-icon"></div>}
                {!loading && (profileName && isConnected) && <div className="text-divider">Viewing {profileName.firstName} {profileName.lastName}'s Feed</div>}
                {!loading && (profileName && !isConnected) && 
                    <div className="not-connected">
                        <h2>You are not currently connected with {profileName.firstName} {profileName.lastName}.</h2>
                        {userRequests && (
                        <div>
                            {isRequested(userRequests, currentUser) ? (
                            <form onSubmit={(e) => cancelConnectionRequest(connectionId, e)}>
                                <button>Cancel Connection Request</button>
                            </form>                                      
                            ) : (
                            <form onSubmit={(e) => sendConnectionRequest(connectionId, e)}>
                                <button>Send Connection Request</button>
                            </form>
                            )}
                        </div>
                        )}   
                    </div>
                }

                {!loading && (currentPosts && isConnected) && currentPosts.map((post) =>
                    <Post key={post._id} currentPosts={post} userPosts={userPosts} userLikes={userLikes} likePost={likePost} unlikePost={unlikePost} handlePostDelete={null} />
                )}
                {!loading && currentPosts && <Pagination postsPerPage={postsPerPage} totalPosts={feedPosts.length} paginate={paginate} currentPage={currentPage} feedPosts={feedPosts} /> }

            </div>
        </>
    );
}