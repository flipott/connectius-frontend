import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <form action="" method="">
            <div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="last-option" />
                </div>
                <button type="submit">Log In</button>
            </div>
            <span class="border-line" />
            <p>Don't have an account?</p>
            <Link to="register"><button type="button">Register</button></Link>
        </form>
    )
}