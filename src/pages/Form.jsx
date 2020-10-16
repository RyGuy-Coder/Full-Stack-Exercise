import React, { useState, useEffect } from "react";
import axios from 'axios';
import { saveForms } from '../services';


function FormPage() {
    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        // setContact({...input, [name]: value});

        setContact(prevValue => {
            if (name === "name") {
                return {
                    name: value,
                    phone: prevValue.phone,
                    email: prevValue.email
                };
            } else if (name === "phone") {
                return {
                    name: prevValue.name,
                    phone: value,
                    email: prevValue.email
                };
            } else if (name === "email") {
                return {
                    name: prevValue.name,
                    phone: prevValue.phone,
                    email: value
                };
            }
        });
    }

    async function handleSubmit(event){
        event.preventDefault();
        await saveForms(axios, contact);

    }

    return (
        <div className="container">
            <h1>
                Hello {contact.name} 
            </h1>

            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    value={contact.name}
                    name="name"
                    placeholder="Name"
                />
                <input
                    onChange={handleChange}
                    value={contact.phone}
                    name="phone"
                    placeholder="Phone Number"
                />
                <input
                    onChange={handleChange}
                    value={contact.email}
                    name="email"
                    placeholder="Email"
                />
                <button className="button">Submit</button>
            </form>
        </div>
    );
}

export default FormPage;