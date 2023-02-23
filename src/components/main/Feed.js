import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Post from "../Post";
import Pagination from "../Pagination";

export default function Feed(props) {

    const navigate = useNavigate();
    const currentUser = localStorage.getItem("user");

    const [feedPosts, setFeedPosts] = React.useState();
    const [userLikes, setUserLikes] = React.useState([]);
    const [userPosts, setUserPosts] = React.useState();

    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage, setPostsPerPage] = React.useState(5);
    const [currentPosts, setCurrentPosts] = React.useState();

    const handlePostDelete = async(postId, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4001/user/${currentUser}/post/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            getFeed();
            window.scrollTo(0, 0);
        } catch(error) {
            console.log(error);
        }
    }

    const getFeedPosts = async(userList) => {
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
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentPosts(json.slice(indexOfFirstPost, indexOfLastPost));
    }

    const getFeed = async () => {
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
        console.log(json);
        setUserPosts(json[0].posts);
        setUserLikes(likedList);
        console.log(likedList);
        const totalList = connectionList.map((user) => user._id)
        totalList.push(json[0]._id);
        const string = "userList=" + totalList.join("&userList=")
        await getFeedPosts(string);
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
            getFeed();
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
            getFeed();
        } catch(error) {
            console.log(error);
        }    
    }
  

    React.useEffect(() => {
        if (!props.loggedIn) {
            navigate("/", { replace: true }); 
        } else {
            getFeed()
            console.log("running");
            window.scrollTo(0, 0)
        }
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
                <div className="text-divider">Viewing Your Feed</div>
                {currentPosts && currentPosts.map((post) => 
                    <Post key={post._id} currentPosts={post} userPosts={userPosts} userLikes={userLikes} likePost={likePost} unlikePost={unlikePost} handlePostDelete={handlePostDelete} />
                )}
                {!currentPosts && <h2>Loading...</h2>}
                {currentPosts && <Pagination postsPerPage={postsPerPage} totalPosts={feedPosts.length} paginate={paginate} currentPage={currentPage} feedPosts={feedPosts} /> }
            </div>
        </>
    );
}