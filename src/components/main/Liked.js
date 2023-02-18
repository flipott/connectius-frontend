import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import Post from "../Post";

export default function Liked(props) {

    const navigate = useNavigate();
    const currentUser = localStorage.getItem("user");

    const [likedPosts, setLikedPosts] = React.useState();
    const [userLikes, setUserLikes] = React.useState();
    const [userPosts, setUserPosts] = React.useState();

    const [currentPosts, setCurrentPosts] = React.useState();
    const [currentPage, setCurrentPage] = React.useState(1);
    const postsPerPage = 5;


    const getLikedPosts = async(postList) => {
        const response = await fetch(`http://localhost:4001/post/?${postList}`, {
            headers: {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            }
        });
        const json = await response.json();
        setLikedPosts(json);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentPosts(json.slice(indexOfFirstPost, indexOfLastPost));
    }

    const getPosts = async () => {
        const response = await fetch(`http://localhost:4001/user/${currentUser}`, {
            headers: {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            }
        });
        const json = await response.json();
        const likedList = json[0].liked;
        setUserPosts(json[0].posts);
        setUserLikes(likedList);
        const string = "postList=" + likedList.join("&postList=")
        await getLikedPosts(string);
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
            window.location.reload();
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
            window.location.reload();
        } catch(error) {
            console.log(error);
        }    
    }
  
    React.useEffect(() => {
        if (!props.loggedIn) {
            navigate("/", { replace: true }); 
        } else {
            getPosts()
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

                {!likedPosts && <h2>Loading...</h2>}


                { currentPosts && <Post currentPosts={currentPosts} userPosts={userPosts} userLikes={userLikes} likePost={likePost} unlikePost={unlikePost} /> }
                { currentPosts && <Pagination postsPerPage={postsPerPage} totalPosts={likedPosts.length} paginate={paginate} currentPage={currentPage} feedPosts={likedPosts} /> }

            </div>
        </>
    );
}