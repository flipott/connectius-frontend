import { React, useState, useEffect } from "react";
import Pagination from "../Pagination";
import Post from "../Post";

export default function Liked(props) {

    const currentUser = localStorage.getItem("user");

    const [loading, setLoading] = useState(true);
    const [likedPosts, setLikedPosts] = useState();
    const [userLikes, setUserLikes] = useState();
    const [userPosts, setUserPosts] = useState();

    // Pagination
    const [currentPosts, setCurrentPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;


    const getLikedPosts = async(postList) => {
        try {
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
        } catch(error) {
            console.error(error);
        }
    }

    const getPosts = async () => {
        setLoading(true);

        try {
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
        } catch(error) {
            console.error(error);
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
  
    useEffect(() => {
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