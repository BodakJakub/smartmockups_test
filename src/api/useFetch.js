import { useEffect, useState } from "react";

export const useFetch = (query) => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('idle');
    
    useEffect(() => {
        if (!query) return;
        const fetchData = async () => {
            const response = await fetch(query);
            const data = await response.json();
            setData(data);
            setStatus('fetched');
        }
    
        fetchData();
    }, [query]);

    return { data, status };
};