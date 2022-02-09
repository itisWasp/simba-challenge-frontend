import PropTypes from 'prop-types';
import React from 'react';
// import './currencyInput.css';

function AllUsersInput(props){
    return (
        <div className="flexGrow">
            
            <select value={props.user} onChange={ev => props.onUserChange(ev.target.value)}>

                {props.users.map((user => 
                    <option value={user}>{user}</option>
                ))}

            </select>
        </div>
    )
}

AllUsersInput.propTypes = {
    user: PropTypes.string,
    users: PropTypes.array,
    onUserChange : PropTypes.func,
}

export default AllUsersInput;