import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <form action="" method="">
            <div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" minLength="3" maxLength="254" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" minLength="3" className="last-option" />
                </div>
                <button type="submit">Log In</button>
            </div>
            <span className="border-line" />
            <p>Don't have an account?</p>
            <Link to="register"><button type="button">Register</button></Link>
        </form>
    )
}