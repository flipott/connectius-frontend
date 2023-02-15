import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Feed(props) {

    const navigate = useNavigate();
    const [connectionList, setConnectionList] = React.useState();
    const [feedPosts, setFeedPosts] = React.useState();

    const getFeedPosts = async(userList) => {
        console.log(userList);
        const response = await fetch(`http://localhost:4001/post/?${userList}`, {
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

    const getFeed = async () => {
        const response = await fetch(`http://localhost:4001/user/${localStorage.getItem("user")}`, {
            headers: {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            }
        });
        const json = await response.json();
        const connectionList = json[0].connections;
        const totalList = connectionList.map((user) => user._id)
        totalList.push(json[0]._id);
        const string = "userList=" + totalList.join("&userList=")
        await getFeedPosts(string);
    }

  

    React.useEffect(() => {
        if (!props.loggedIn) {
            navigate("/", { replace: true }); 
        } else {
            getFeed()
        }
    }, [])

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
                                <p className="post-time">{post.time}</p>
                            </div>
                        </div>
                        <div className="post-body">{post.body}</div>
                        <div className="border-line" />
                        <div className="post-stats">
                            <p>{post.likes.length} Likes</p>
                            <p>{post.comments.length} Comments</p>
                        </div>
                        <div className="post-buttons">
                            <button>
                                <img src="/images/like-light.svg" />
                                <p>Like</p>
                            </button>
                            <button>
                                <img src="/images/message-light.svg" />
                                <p>Comment</p>
                            </button>
                        </div>
                    </div>
                )}











            </div>
        </>
    )
}