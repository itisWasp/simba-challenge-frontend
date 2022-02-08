import { Link } from "react-router-dom";
import React from 'react';

const LinkPage = () => {
    return (
        <section>
            <h1>Welcome :)</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Home</Link>
            <Link to="/transactions">Create A New Transaction</Link>
            <Link to="/admin">History</Link>
        </section>
    )
}

export default LinkPage