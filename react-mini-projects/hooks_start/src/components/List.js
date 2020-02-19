import React from 'react';

const List = (props) => {
    console.log('Render');

    return(
        <ul>
            {props.items.map(item => <li key={item.id} onClick={() => props.onClick(item.id)}>{item.name}</li>)}
        </ul>
    );
};

export default List;