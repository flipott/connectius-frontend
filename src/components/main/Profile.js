import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile(props) {

    const { posts } = props;
    const [formData, setFormData] = React.useState();
    const navigate = useNavigate();

  

    React.useEffect(() => {
        if (!props.loggedIn) {
            navigate("/", { replace: true }); }
    }, [])


    const handlePostSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4001/user/${localStorage.getItem("user")}/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ body: formData })
            });
            const data = await response;
            window.location.reload();
        } catch(error) {
            console.error(error);
        }
    };

    const handleInput = (e) => {
        setFormData(e.target.value);
    };

    return (
        <>
            <div className="main-top">Your Profile</div>
            <div className="posts-container">
                <div className="picture-update">
                    <img src="/images/profile-temp.svg" />
                    <a href="">Update Profile Picture</a>
                </div>

                <form method="" action="" className="new-post" onSubmit={handlePostSubmit}>
                    <p>Create a new post</p>
                    <textarea placeholder="Write your post here..." onChange={handleInput} required></textarea>
                    <button>Post</button>
                </form>

                <div className="text-divider">Your Posts</div>
                { posts && posts.map((post) => {
                    return (
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
                    );
                })}

            </div>
        </>
    )
}