import React from "react";
import { Link } from "react-router-dom";

export default function Feed(props) {

    const { post } = props;

    return (
        <>
            <div className="main-top">Welcome back!</div>
            <div className="posts-container">
                <div className="text-divider">Viewing Your Feed</div>
                <div className="post">
                    <div className="post-top">
                        <img src="/images/profile-temp.svg" />
                        <div className="post-top-right">
                            <p className="post-name">{post.firstName} {post.lastName}</p>
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
            </div>
        </>
    )
}