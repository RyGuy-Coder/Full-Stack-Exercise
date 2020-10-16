import React from "react"
import { Button } from "@material-ui/core"
import { useHistory } from "react-router-dom";

function HomePage() {
    let history = useHistory();
    return (
        <div className="container">
            <h1>
                Hello
            </h1>
            <button className="button" onClick={() => history.push('/login')}>Admin</button>
            <button className="button" onClick={() => history.push('/form')}>Form</button>
        </div>
    )
    
}

export default HomePage
