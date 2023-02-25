import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Post from "../Post";
import Pagination from "../Pagination";
import ProfilePicture from "./ProfilePicture";

export default function Profile(props) {

    const [formData, setFormData] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [uploadedPhoto, setUploadedPhoto] = React.useState();
    const [showPictureUpdate, setShowPictureUpdate] = React.useState(false);

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
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
            });
            getPosts();
            window.scrollTo(0, 0);
        } catch(error) {
            console.log(error);
        }
    }

    const getPosts = async() => {
        setLoading(true);
        const response = await fetch(`http://localhost:4001/user/${localStorage.getItem("user")}/post`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
        }
        });
        const json = await response.json();
        const likedList = json.likes;
        setPosts(json);
        setUserPosts(json);
        setUserLikes(likedList);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentPosts(json.slice(indexOfFirstPost, indexOfLastPost));
        setLoading(false);
    }

    React.useEffect(() => {
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
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ body: formData })
            });
            const data = await response;
            setFormData("");
            getPosts();
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
    
    const updateProfilePicture = async(e) => {
        e.preventDefault();

        const fileInput = document.querySelector("#file");
        const file = fileInput.files[0];

        const imageData = new FormData();
        imageData.append("file", file);

        console.log(imageData)

        try {
            const response = await fetch(`http://localhost:4001/user/${localStorage.getItem("user")}/photo`, {
                method: "POST",
                body: imageData
            });
            const data = await response.json();
            console.log(data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    function checkFileSize(e) {
        const currentSize = e.target.files[0].size;

        if (currentSize > 1048576) {
            alert("File size must be 1mb or less.")
            e.target.value = "";
        }
    }

    return (
        <>
            <div className="main-top">Your Profile</div>
            <div className="posts-container">
                {loading && <div className="loading-icon"></div>}
                {!loading && 
                    <div className="picture-update">
                        {props.profilePicture && <ProfilePicture image={props.profilePicture} />}
                        <a href="#" onClick={() => setShowPictureUpdate(true)} style={{display: showPictureUpdate ? 'none' : 'flex'}}>Update Profile Picture</a>
                        <form style={{display: showPictureUpdate ? 'flex' : 'none'}} onSubmit={updateProfilePicture}>
                            <p>Photo must be 1mb or less.</p>
                            <input type="file" id="file" name="file" accept="image/*" onChange={(e) => checkFileSize(e)} required />
                            <div>
                                <button type="button" onClick={() => setShowPictureUpdate(false)}>Cancel</button>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                }
                {!loading &&
                    <form method="" action="" className="new-post" onSubmit={handlePostSubmit}>
                        <p>Create a new post</p>
                        <textarea placeholder="Write your post here..." onChange={handleInput} value={formData} minLength={1} maxLength={150} required></textarea>
                        <button>Post</button>
                    </form>
                }
                {!loading && currentPosts && currentPosts.length === 0 && <div>You have not posted anything yet.</div>}
                {!loading && currentPosts && currentPosts.length > 0 && <div className="text-divider">Your Posts</div>}
                {!loading && currentPosts && currentPosts.length > 0 && currentPosts.map((post) => <Post key={post._id} currentPosts={post} userPosts={userPosts} userLikes={userLikes} likePost={likePost} unlikePost={unlikePost} handlePostDelete={handlePostDelete} />)}
                {!loading && currentPosts && currentPosts.length > 0 && <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} feedPosts={posts} /> }
            </div>
        </>
    )
}