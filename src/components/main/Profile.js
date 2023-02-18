import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Post from "../Post";
import Pagination from "../Pagination";

export default function Profile(props) {

    const [formData, setFormData] = React.useState();
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("user");

    const [posts, setPosts] = React.useState();
    const [userPosts, setUserPosts] = React.useState();
    const [userLikes, setUserLikes] = React.useState();
    const [currentPosts, setCurrentPosts] = React.useState();
    const [currentPage, setCurrentPage] = React.useState(1);
    const postsPerPage = 5;

    const likePost = async(post, e) => { 
        return null;
    }

    const unlikePost = async(post, e) => {
        return null;
    }

    const handlePostDelete = async(postId, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4001/user/${currentUser}/post/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            getPosts();
            window.scrollTo(0, 0);
        } catch(error) {
            console.log(error);
        }
    }

    const getPosts = async() => {
        const response = await fetch(`http://localhost:4001/user/${localStorage.getItem("user")}/post`, {
            headers: {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            }
        });
        const json = await response.json();
        const likedList = json[0].liked;
        setPosts(json);
        setUserPosts(json);
        setUserLikes(likedList);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentPosts(json.slice(indexOfFirstPost, indexOfLastPost));
    }

    React.useEffect(() => {
        if (!props.loggedIn) {
            navigate("/", { replace: true });
        }
        getPosts()
        window.scrollTo(0, 0)
    }, [currentPage])


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

    const paginate = (pageNumber, currentPage, postsPerPage, feedPosts) => {
        setCurrentPage(pageNumber);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentPosts(feedPosts.slice(indexOfFirstPost, indexOfLastPost));
    }

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
                {currentPosts && currentPosts.map((post) => 
                    <Post currentPosts={post} userPosts={userPosts} userLikes={userLikes} likePost={likePost} unlikePost={unlikePost} handlePostDelete={handlePostDelete} />
                )}
                {currentPosts && <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} feedPosts={posts} /> }

            </div>
        </>
    )
}