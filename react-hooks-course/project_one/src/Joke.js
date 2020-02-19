import React from 'react';
import {useFetch} from "./hooks/UseFetch";

const Joke = () => {
    const joke = useFetch('https://official-joke-api.appspot.com/jokes/random', []);

    const {setup, punchline} = joke;

    return (
        <div>
            <h3>Joke of the session:</h3>
            <p>{setup}</p>
            <p><em>{punchline}</em></p>
        </div>
    )
};

export default Joke;