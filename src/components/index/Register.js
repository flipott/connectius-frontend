import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <form action="" method="">
            <div>
                <label htmlFor="first-name">First Name</label>
                <input type="text" name="first-name" minLength="2" maxLength="35" />

                <label htmlFor="last-name">Last Name</label>
                <input type="text" name="last-name" minLength="2" maxLength="35" />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" minLength="3" maxLength="254"  />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" minLength="3" />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" name="confirm-password" minLength="3" className="last-option" />

                <button type="submit">Register</button>
            </div>
            <span class="border-line" />
            <p>Already have an account?</p>
            <Link to="/"><button type="button">Log In</button></Link>
        </form>
    )
}