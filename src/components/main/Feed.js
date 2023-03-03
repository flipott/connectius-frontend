import { React, useState, useEffect } from "react";
import Post from "../Post";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

export default function Feed() {
    const currentUser = localStorage.getItem("user");

    const [loading, setLoading] = useState(true);

    const [feedPosts, setFeedPosts] = useState();
    const [userLikes, setUserLikes] = useState([]);
    const [userPosts, setUserPosts] = useState();

    // Pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState();
    const postsPerPage = 5;

    const handlePostDelete = async(postId, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${currentUser}/post/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
            });
            getFeed(true);
            window.scrollTo(0, 0);
        } catch(error) {
            console.log(error);
        }
    }

    const getFeedPosts = async(userList) => {
        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/post/?${userList}`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                  },
            });
            const json = await response.json();
            setFeedPosts(json);
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            setCurrentPosts(json.slice(indexOfFirstPost, indexOfLastPost));
        } catch(error) {
            console.error(error);
        }
    }

    const getFeed = async (withLoading) => {
        if (withLoading) {
            setLoading(true);
        }
        
        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${currentUser}`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                  },
            });
            const json = await response.json();
            const connectionList = json[0].connections;
            const likedList = json[0].liked;
            setUserPosts(json[0].posts);
            setUserLikes(likedList);
            const totalList = connectionList.map((user) => user._id)
            totalList.push(json[0]._id);
            const string = "userList=" + totalList.join("&userList=")
            await getFeedPosts(string);
        } catch(error) {
            console.error(error);
        }

        if (withLoading) {
            setLoading(false);
        }
    }

    const likePost = async(post, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${post.user._id}/post/${post._id}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({currentUser})
            });
            getFeed(false);
        } catch(error) {
            console.log(error);
        }    
    }

    const unlikePost = async(post, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${post.user._id}/post/${post._id}/like`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({currentUser})
            });
            getFeed(false);
        } catch(error) {
            console.log(error);
        }    
    }
  

    useEffect(() => {
        getFeed(true)
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
            <div className="main-top">Welcome back!</div>
            <div className="posts-container">
                {loading && <div className="loading-icon"></div>}
                {!loading && currentPosts && currentPosts.length === 0 && <div>There are no posts in your feed. Create a <Link to="/profile" className="profile-link">new post</Link> or <Link to="/find-connections" className="profile-link">find connections!</Link></div>}
                {(!loading && currentPosts && currentPosts.length > 0) && <div className="text-divider">Viewing Your Feed</div> }
                {!loading && currentPosts && currentPosts.length > 0 && currentPosts.map((post) => 
                    <Post key={post._id} currentPosts={post} userPosts={userPosts} userLikes={userLikes} likePost={likePost} unlikePost={unlikePost} handlePostDelete={handlePostDelete} />
                )}
                {!loading && currentPosts && currentPosts.length > 0 && <Pagination postsPerPage={postsPerPage} totalPosts={feedPosts.length} paginate={paginate} currentPage={currentPage} feedPosts={feedPosts} /> }
            </div>
        </>
    );
}