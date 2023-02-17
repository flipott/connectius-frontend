import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FindConnections from "./FindConnections";

export default function ConnectedProfile(props) {

    const navigate = useNavigate();
    const currentUser = localStorage.getItem("user");

    const path = window.location.pathname;
    const connectionId = path.substring("/connections/".length);

    const [isConnected, setIsConnected] = React.useState(false);
    const [feedPosts, setFeedPosts] = React.useState();
    const [profileName, setProfileName] = React.useState();
    const [userLikes, setUserLikes] = React.useState();
    const [userPosts, setUserPosts] = React.useState();
    const [userRequests, setUserRequests] = React.useState();

    const isRequested = (userRequests, connectedProfileId) => {
        return userRequests.some(item => item._id === connectedProfileId) ? true : false;
    }

    const getProfileName = async(connectionId) => {
        const response = await fetch(`http://localhost:4001/user/${connectionId}/`, {
            headers: {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            }
        });
        const json = await response.json();
        if (json[0].firstName && json[0].lastName) {
            setProfileName({"firstName": json[0].firstName, "lastName": json[0].lastName});
            setUserRequests(json[0].requests);
        } else {
            return null;
        }
    }

    const getConnectionPosts = async(connectionId) => {
        const response = await fetch(`http://localhost:4001/user/${connectionId}/post`, {
            headers: {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            }
        });
        const json = await response.json();
        setFeedPosts(json);
        await getProfileName(connectionId);
    }

    const getConnectionFeed = async (connectionId) => {

        const response = await fetch(`http://localhost:4001/user/${currentUser}`, {
            headers: {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            }
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
            getProfileName(connectionId);
            return null;
        }
    }

    const likePost = async(post, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4001/user/${post.user}/post/${post._id}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({currentUser})
            });
            window.location.reload();
        } catch(error) {
            console.log(error);
        }    
    }

    const unlikePost = async(post, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4001/user/${post.user}/post/${post._id}/like`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({currentUser})
            });
            window.location.reload();
        } catch(error) {
            console.log(error);
        }    
    }

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
            window.location.reload();
        } catch(error) {
            console.log(error);
        }
    }
  

    React.useEffect(() => {
        if (!props.loggedIn) {
            navigate("/", { replace: true }); 
        } else {
            getConnectionFeed(connectionId)
        }
    }, [])

    return (
        <>
            <div className="main-top">Welcome back!</div>
            <div className="posts-container">

                {((!feedPosts || !profileName) && isConnected) && <h2>Loading...</h2>}

                {(profileName && isConnected) && <div className="text-divider">Viewing {profileName.firstName} {profileName.lastName}'s Feed</div>}
                {(profileName && !isConnected) && 
                    <div>
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


                {(feedPosts && isConnected) && feedPosts.map((post) => 
                    <div className="post" key={post._id}>
                        <div className="post-top">
                            <img src="/images/profile-temp.svg" />
                            <div className="post-top-right">
                                <p className="post-name">{post.user.firstName} {post.user.lastName}</p>
                                <p className="post-time">{new Date(post.time).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
                            </div>
                        </div>
                        <div className="post-body">{post.body}</div>
                        <div className="border-line" />
                        <div className="post-stats">
                            <p>{post.likes.length} Likes</p>
                            <p>{post.comments.length} Comments</p>
                        </div>
                        {
                            !userPosts.some(item => item._id === post._id) && (
                                <div className="post-buttons">
                                {
                                    userLikes.includes(post._id) ?
                                    <button onClick={(e) => unlikePost(post, e) }>
                                        <img src="/images/like-light.svg" />
                                    <p>Unlike</p>
                                    </button>
                                    :
                                    <button onClick={(e) => likePost(post, e) }>
                                        <img src="/images/like-light.svg" />
                                    <p>Like</p>
                                    </button>                            
                                }
                                </div>
                            )
                        }
                    </div>
                )}
            </div>
        </>
    );
}