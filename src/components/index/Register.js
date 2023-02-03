import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <form action="" method="">
            <div>
                <label htmlFor="first-name">First Name</label>
                <input type="text" name="first-name" />

                <label htmlFor="last-name">Last Name</label>
                <input type="text" name="last-name" />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" name="confirm-password" />

                <button type="submit">Register</button>
            </div>
            <p>Already have an account?</p>
            <Link to="/"><button type="button">Log In</button></Link>
        </form>
    )
}