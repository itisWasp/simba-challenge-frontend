import { Link } from "react-router-dom";
import React from 'react';

const LinkPage = () => {
    return (
        <section>
            <h3>Your Transaction History :)</h3>
            <br />
            <p>Your History Here, Still Under Development!</p>

            <br />

            <Link to="/">Home</Link>

        </section>
    )
}

export default LinkPage