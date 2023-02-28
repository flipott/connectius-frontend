import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register(props) {

    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const navigate = useNavigate();

    if (props.loggedIn) {
        navigate("/feed");
    }

    const handleRegister = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4001/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.errors) {
                console.log(data.errors[0])
                setFormError(data.errors[0].msg);

            }
            if (!data.errors) {
                navigate("/");
            }
        } catch(error) {
            console.error(error);
        }
    };

    const handleInput = (e) => {
        if (e.target.name === "first-name" || e.target.name === "last-name") {
            const val = e.target.value;
            const regex = /^[a-zA-Z-]+$/;
            if (!regex.test(val)) {
                return e.target.value = e.target.value.slice(0,-1 );
            }
        }
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <form onSubmit={handleRegister}>
            <div>
                { formError.length && <div className="form-error">{formError}</div>}
                <label htmlFor="first-name">First Name</label>
                <input type="text" name="first-name" minLength="2" maxLength="35" onChange={handleInput} required />

                <label htmlFor="last-name">Last Name</label>
                <input type="text" name="last-name" minLength="2" maxLength="35" onChange={handleInput} required />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" minLength="3" maxLength="254" onChange={handleInput} required  />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" minLength="3" onChange={handleInput} required />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" name="confirm-password" minLength="3" onChange={handleInput} required className="last-option" />

                <button type="submit">Register</button>
            </div>
            <span className="border-line" />
            <p>Already have an account?</p>
            <Link to="/"><button type="button">Log In</button></Link>
        </form>
    )
}