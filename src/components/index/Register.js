import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const [formData, setFormData] = React.useState({});
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4001/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data) {
                navigate("/");
            }
        } catch(error) {
            console.error(error);
        }
    };

    const handleInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="first-name">First Name</label>
                <input type="text" name="first-name" minLength="2" maxLength="35" onChange={handleInput} />

                <label htmlFor="last-name">Last Name</label>
                <input type="text" name="last-name" minLength="2" maxLength="35" onChange={handleInput} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" minLength="3" maxLength="254" onChange={handleInput}  />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" minLength="3" onChange={handleInput} />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" name="confirm-password" minLength="3" onChange={handleInput} className="last-option" />

                <button type="submit">Register</button>
            </div>
            <span className="border-line" />
            <p>Already have an account?</p>
            <Link to="/"><button type="button">Log In</button></Link>
        </form>
    )
}