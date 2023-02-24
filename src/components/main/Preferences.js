import React from "react";
import { useNavigate } from "react-router-dom";

export default function Preferences(props) {

    const currentUser = localStorage.getItem("user");

    const [loading, setLoading] = React.useState(true);

    const [nameFormData, setNameFormData] = React.useState({firstName: "", lastName: ""});
    const [emailFormData, setEmailFormData] = React.useState({email: ""});
    const [passwordFormData, setPasswordFormData] = React.useState({currentPassword: "", newPassword: "", confirmNewPassword: ""});
    
    const [nameFormError, setNameFormError] = React.useState({});
    const [emailFormError, setEmailFormError] = React.useState({});
    const [passwordFormError, setPasswordFormError] = React.useState({});

    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    
    const navigate = useNavigate();

    const updateName = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4001/user/${currentUser}/name`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify(nameFormData),
            });
            const data = await response.json();
            if (data.errors) {
                setNameFormError(data.errors[0].msg);
            }
            if (!data.errors) {
                window.location.reload();
            }
        } catch(error) {
            console.error(error);
        }
    }

    const updateEmail = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4001/user/${currentUser}/email`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify(emailFormData),
            });
            const data = await response.json();
            if (data.errors) {
                setEmailFormError(data.errors[0].msg);
            }
            if (!data.errors) {
                window.location.reload();
            }
        } catch(error) {
            console.error(error);
        }
    }

    const updatePassword = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4001/user/${currentUser}/password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify(passwordFormData),
            });
            const data = await response.json();
            if (data.errors) {
                setPasswordFormError(data.errors[0].msg);
            }
            if (!data.errors) {
                window.location.reload();
            }
        } catch(error) {
            console.error(error);
        }

    }

    const getName = async() => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4001/user/${currentUser}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                }
            });
            const data = await response.json();
            setNameFormData({firstName: data[0].firstName, lastName: data[0].lastName});
            setEmailFormData({email: data[0].email});
        } catch(error) {
            console.error(error);
        }
        setLoading(false);
    };

    const deleteAccount = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4001/user/${currentUser}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        } catch(error) {
            console.error(error);
        }
    }


    const handleInput = (e) => {
        setNameFormData({...nameFormData, [e.target.name]: e.target.value});
        setEmailFormData({...emailFormData, [e.target.name]: e.target.value});
        setPasswordFormData({...passwordFormData, [e.target.name]: e.target.value});
    };

    React.useEffect(() => {
        getName();
    }, [])

    return (
        <>
            <div className="main-top">Your Preferences</div>
            {loading && <div className="loading-icon"></div>}
            {!loading && 
            <div className="posts-container preferences">
                <form onSubmit={updateName}>
                    {nameFormError.length && <div className="form-error">{nameFormError}</div> }
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" minLength="2" maxLength="35" onChange={handleInput} value={nameFormData.firstName} required />

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" minLength="2" maxLength="35" onChange={handleInput} value={nameFormData.lastName} required />

                    <button>Update Name</button>
                </form>
                <form onSubmit={updateEmail}>
                    {emailFormError.length && <div className="form-error">{emailFormError}</div> }
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" minLength="3" maxLength="254" onChange={handleInput} value={emailFormData.email} required />
                    <button>Update Email</button>
                </form>
                <form onSubmit={updatePassword}>
                    {passwordFormError.length && <div className="form-error">{passwordFormError}</div> }
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" name="currentPassword" minLength="3" onChange={handleInput} value={passwordFormData.currentPassword} required/>

                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" name="newPassword" minLength="3" onChange={handleInput} value={passwordFormData.newPassword} required />

                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input type="password" name="confirmNewPassword" minLength="3" onChange={handleInput} value={passwordFormData.confirmNewPassword} required />

                    <button>Update Password</button>
                </form>
                <form className="preferences-delete" onSubmit={(e) => {e.preventDefault(); setShowDeleteModal(true)}}>
                    <button>Delete Account</button>
                </form>
                <div className="delete-modal" style={{display: showDeleteModal ? 'block' : 'none'}}>
                    <form onSubmit={deleteAccount}>
                        <p>Are you sure you wish to permanently delete your account?</p>
                        <p><strong>This action cannot be undone.</strong></p>
                        <button type="button" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        <button type="submit">Delete</button>
                    </form>
                </div>
            </div>
}
        </>
    )
}