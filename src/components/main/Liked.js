import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Liked(props) {

    const navigate = useNavigate();
    const currentUser = localStorage.getItem("user");

    const [likedPosts, setLikedPosts] = React.useState();
    const [userLikes, setUserLikes] = React.useState();
    const [userPosts, setUserPosts] = React.useState();

    const getLikedPosts = async(postList) => {
        const response = await fetch(`http://localhost:4001/post/?${postList}`, {
            headers: {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            }
        });
        const json = await response.json();
        console.log(json);
        setLikedPosts(json);
    }

    const getPosts = async () => {
        const response = await fetch(`http://localhost:4001/user/${currentUser}`, {
            headers: {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            }
        });
        const json = await response.json();
        // const connectionList = json[0].connections;
        const likedList = json[0].liked;
        setUserPosts(json[0].posts);
        setUserLikes(likedList);
        const string = "postList=" + likedList.join("&postList=")
        await getLikedPosts(string);
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
  
    console.log(props.loggedIn);

    React.useEffect(() => {
        if (!props.loggedIn) {
            navigate("/", { replace: true }); 
        } else {
            getPosts()
        }
    }, [])

    return (
        <>
            <div className="main-top">Welcome back!</div>
            <div className="posts-container">
                <div className="text-divider">Viewing Your Feed</div>

                {!likedPosts && <h2>Loading...</h2>}


                {likedPosts && likedPosts.map((post) => 
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