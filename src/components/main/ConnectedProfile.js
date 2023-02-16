import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ConnectedProfile(props) {

    const navigate = useNavigate();
    const currentUser = localStorage.getItem("user");

    const [feedPosts, setFeedPosts] = React.useState();
    const [userLikes, setUserLikes] = React.useState();
    const [userPosts, setUserPosts] = React.useState();

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
    }

    const getConnectionFeed = async () => {
        const path = window.location.pathname;
        const connectionId = path.substring("/connections/".length);

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
            await getConnectionPosts(connectionId);
        } else {
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
  

    React.useEffect(() => {
        if (!props.loggedIn) {
            navigate("/", { replace: true }); 
        } else {
            getConnectionFeed()
        }
    }, [], console.log(feedPosts))

    return (
        <>
            <div className="main-top">Welcome back!</div>
            <div className="posts-container">
                <div className="text-divider">Viewing Your Feed</div>

                {!feedPosts && <h2>Loading...</h2>}


                {feedPosts && feedPosts.map((post) => 
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