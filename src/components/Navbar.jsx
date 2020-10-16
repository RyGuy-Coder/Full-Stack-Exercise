import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <Link to="/">App </Link>
            <Link to="/Form">Form</Link>
            <Link to="/error">Error </Link>
        </div>
    );
};

export default Navbar;