import { useState } from 'react';

export function Api({ token }) {

    const [data, setData] = useState("");

    const handleRequest = (e) => {
        e.preventDefault();
        const endpoint = "http://localhost:4444/users";

        const option = {
            method: "GET",
            mode: "cors",
            headers: { "Authorization": token, "Content-Type": "application/json" },
        }

        asynqRequest(endpoint, option);
    }

    const asynqRequest = (endpoint, option) => {
        fetch(endpoint, option)
        .then(response => response.json())
        .then((data) => {
            console.log("data", data);
            setData(data.result);
        });
    }

    return (
        <>
            <h3>API request</h3>
            <form action="/api/resource" method="get" onSubmit={handleRequest}>
                <button type="submit">Make API request</button>
            </form>
        </>
    )
}