import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import Post from "../Post";

export default function Liked(props) {

    const navigate = useNavigate();
    const currentUser = localStorage.getItem("user");

    const [loading, setLoading] = React.useState(true);
    const [likedPosts, setLikedPosts] = React.useState();
    const [userLikes, setUserLikes] = React.useState();
    const [userPosts, setUserPosts] = React.useState();

    const [currentPosts, setCurrentPosts] = React.useState();
    const [currentPage, setCurrentPage] = React.useState(1);
    const postsPerPage = 5;


    const getLikedPosts = async(postList) => {
        const response = await fetch(`http://localhost:4001/post/?${postList}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
            },
        });
        const json = await response.json();
        setLikedPosts(json);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentPosts(json.slice(indexOfFirstPost, indexOfLastPost));
    }

    const getPosts = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:4001/user/${currentUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
            },
        });
        const json = await response.json();
        const likedList = json[0].liked;
        setUserPosts(json[0].posts);
        setUserLikes(likedList);
        const string = "postList=" + likedList.join("&postList=")
        // No likes
        if (string === "postList=") {
            setLikedPosts([]);
            setCurrentPosts([]);
        } else {
            await getLikedPosts(string);
        }
        setLoading(false);
    }

    const likePost = async(post, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4001/user/${post.user}/post/${post._id}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({currentUser})
            });
            getPosts();
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
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({currentUser})
            });
            getPosts();
        } catch(error) {
            console.log(error);
        }    
    }
  
    React.useEffect(() => {
        getPosts()
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
            <div className="main-top">Liked Posts</div>
            <div className="posts-container">
                {loading && <div className="loading-icon"></div>}
                {!loading && currentPosts && currentPosts.length === 0 && <div>You do not have any liked posts.</div>}
                {!loading && currentPosts && currentPosts.length > 0 && <div className="text-divider">Viewing Your Liked Posts</div>}
                {!loading && currentPosts && currentPosts.length > 0 && currentPosts.map((post) => 
                    <Post key={post._id} currentPosts={post} userPosts={userPosts} userLikes={userLikes} likePost={likePost} unlikePost={unlikePost} handlePostDelete={null} />
                )}
                {!loading && currentPosts && currentPosts.length > 0 && <Pagination postsPerPage={postsPerPage} totalPosts={likedPosts.length} paginate={paginate} currentPage={currentPage} feedPosts={likedPosts} /> }
            </div>
        </>
    );
}