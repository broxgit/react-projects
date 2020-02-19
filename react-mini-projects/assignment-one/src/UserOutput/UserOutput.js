import React from 'react';

const userOutput = (props) => {
    return (
        <div>
            <p>Your username is {props.username}</p>
            <p>This is a second paragraph!</p>
        </div>
    );
}

export default userOutput