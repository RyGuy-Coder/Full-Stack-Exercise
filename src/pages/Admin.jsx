import React, { useState, useEffect } from "react";
import axios from 'axios';
import { sendText } from '../services';

function AdminPage() {
    const [message, setMessage] = useState('');

    function handleChange(event) {
        setMessage(event.target.value);
    }

    async function handleSubmit(event){
        event.preventDefault();
        await sendText(axios, {message});

    }

    return (
        <div className="container">
            <h1>
                Admin
            </h1>

            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    value={message}
                    name="message"
                />
                <button className="button">Send Text</button>
            </form>
        </div>
    );
}

export default AdminPage;