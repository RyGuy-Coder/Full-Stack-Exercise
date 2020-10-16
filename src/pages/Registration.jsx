import React, { useState, useEffect } from "react";
import axios from 'axios';
import { register } from '../services';
import { useHistory, Link } from "react-router-dom";

function RegistrationPage() {
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
            await register(axios, input)
            history.push('/login');

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container">
            <h1>
                Register
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
            <Link to='/login'>Login</Link>
        </div>
    );
}

export default RegistrationPage;