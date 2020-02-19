import {useEffect, useState} from "react";

export const useFetch = (url, initialValue) => {
    const [result, setResult] = useState(initialValue);

    useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then(json => {
                setResult(json);
            });
    }, []);

    return result;
};
