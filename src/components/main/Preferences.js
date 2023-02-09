import React from "react";

export default function Preferences(props) {

    return (
        <>
            <div className="main-top">Your Preferences</div>
            <div className="posts-container preferences">
                <form action="" method="">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" name="first-name" minLength="2" maxLength="35" />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" name="last-name" minLength="2" maxLength="35" />

                    <button>Update Name</button>
                </form>
                <form action="" method="">
                    <label htmlFor="current-password">Current Password</label>
                    <input type="password" name="current-password" minLength="3" />

                    <label htmlFor="new-password">New Password</label>
                    <input type="password" name="new-password" minLength="3" />

                    <label htmlFor="confirm-new-password">Confirm New Password</label>
                    <input type="password" name="confirm-new-password" minLength="3" />

                    <button>Update Password</button>
                </form>
                <form action="" method="" className="preferences-delete">
                    <button>Delete Account</button>
                </form>
            </div>
        </>
    )
}