import React, { useState, useEffect } from "react";
import axios from 'axios';
import { login } from '../services';
import { useHistory, Link } from "react-router-dom";

function LoginPage() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const history = useHistory();

    function handleChange(event) {
        const { name, value } = event.target;

        setInput({...input, [name]: value});
    }

    async function handleSubmit(event){
        event.preventDefault();

        try {
            const { token } = await login(axios, input)
            if(token) {
                localStorage.setItem('paToken', token);
                history.push('/admin');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container">
            <h1>
                Login
            </h1>

            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    value={input.username}
                    name="username"
                    placeholder="Username"
                />
                <input
                    type="password"
                    onChange={handleChange}
                    value={input.password}
                    name="password"
                    placeholder="Password"
                />
                <button className="button">Submit</button>
            </form>
            <Link to='/register'>Sign Up</Link>
        </div>
    );
}

export default LoginPage;