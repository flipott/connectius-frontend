import React from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "./main/ProfilePicture";

export default function Post({currentPosts, userPosts, userLikes, likePost, unlikePost, handlePostDelete}) {
    const currentUser = localStorage.getItem("user");
    const [showDeleteButton, setShowDeleteButton] = React.useState(true);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);


    const post = currentPosts;
    
    console.log(post.user.profilePicture);


    return (
        <div className="post" key={post._id}>
            <div className="post-top">
                    {
                        currentUser === post.user._id ?
                        <Link to={`/profile`}><ProfilePicture image={post.user.profilePicture} /></Link>
                        :
                        <Link to={`/connections/${post.user._id}`}><ProfilePicture image={post.user.profilePicture} /></Link>
                    }                
                    <div className="post-top-right">
                    {
                        currentUser === post.user._id ?
                        <p className="post-name"><Link to={`/profile`}>{post.user.firstName} {post.user.lastName}</Link></p>
                        :
                        <p className="post-name"><Link to={`/connections/${post.user._id}`}>{post.user.firstName} {post.user.lastName}</Link></p>
                    }
                    <p className="post-time">{new Date(post.time).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
                </div>
                { currentUser === post.user._id && 
                <>
                <button onClick={() => {setShowDeleteModal(true); setShowDeleteButton(false)}} style={{display: showDeleteButton ? 'block' : 'none'}}>Delete</button>
                <div className="delete-modal" style={{display: showDeleteModal ? 'block' : 'none'}}>
                    <p>Are you sure you wish to delete the post?</p>
                    <form onSubmit={(e) => handlePostDelete(post._id, e)}>
                        <button type="submit" onClick={() => {setShowDeleteButton(true); setShowDeleteModal(false)}}>Delete</button>
                        <button type="button" onClick={() => {setShowDeleteButton(true); setShowDeleteModal(false)}}>Cancel</button>
                    </form>
                </div>
                </>
                }
            </div>
            <div className="post-body">{post.body}</div>
            <div className="border-line" />
            <div className="post-stats">
                {
                    post.likes.length === 1 ?
                    <p>{post.likes.length} Like</p>
                    :
                    <p>{post.likes.length} Likes</p>
                }
                <p>{post.comments.length} Comments</p>
            </div>
            {
                !userPosts.some(item => item._id === post._id) && userLikes && (
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
    )
}

