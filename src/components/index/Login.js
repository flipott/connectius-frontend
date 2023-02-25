import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {

    const [formData, setFormData] = React.useState({});
    const [formError, setFormError] = React.useState({});
    const navigate = useNavigate();
  
    React.useEffect(() => {
        if (props.loggedIn) {
            navigate("/feed", {replace: true});
        }
    }, [props.loggedIn]);

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4001/login', {
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
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.user)
                navigate("/feed");
                window.location.reload();
            }
        } catch(error) {
            console.error(error);
        }
    };

    const handleInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <form onSubmit={handleLogin}>
            { formError.length && <div className="form-error">{formError}</div>}
            <div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" minLength="3" maxLength="254" required onChange={handleInput} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" minLength="3" required className="last-option" onChange={handleInput} />
                </div>
                <button type="submit">Log In</button>
            </div>
            <span className="border-line" />
            <p>Don't have an account?</p>
            <Link to="register"><button type="button">Register</button></Link>
        </form>
    )
}