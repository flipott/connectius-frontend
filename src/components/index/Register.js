import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register(props) {

    const [formData, setFormData] = React.useState({});
    const [formError, setFormError] = React.useState({});
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