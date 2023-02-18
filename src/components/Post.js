import React from "react";
import { Link } from "react-router-dom";

export default function Post({currentPosts, userPosts, userLikes, likePost, unlikePost}) {
    const currentUser = localStorage.getItem("user");

    return (
        currentPosts.map((post) => 
        <div className="post" key={post._id}>
            <div className="post-top">
                <img src="/images/profile-temp.svg" />
                <div className="post-top-right">
                    {
                        currentUser === post.user._id ?
                        <p className="post-name"><Link to={`/profile`}>{post.user.firstName} {post.user.lastName}</Link></p>
                        :
                        <p className="post-name"><Link to={`/connections/${post.user._id}`}>{post.user.firstName} {post.user.lastName}</Link></p>
                    }
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
    ))
}

