import { useState, useEffect } from 'react';

export function Login({setUser, setToken}) {

    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        const endpoint = "http://localhost:4000/user/login";
        const options = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, password: password, userId: "" })
        }
        console.log("options", options);
        asyncRequest(endpoint, options);
    }

    const asyncRequest = (endpoint, options) => {
        fetch(endpoint, options)
        .then(response => response.json())
        .then((data) => {
            console.log("data", data);
            if (data && data.user && data.user.hasOwnProperty("userId")) {
                setUser(data.user);
                setToken(data.token);   
                setUserId(data.userId);
            }
        })
    }

    useEffect(() => {
        console.log("name:", name, "password:", password, "userId:", userId);
    }, [name, password, userId]);

    return (
        <>
            <h1>Login</h1>
            <form action="" method="post" onSubmit={submitForm}>
                <p>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </p>
                <p>
                    <input type="submit" value="Log in" />
                </p>
            </form>
        </>
    )
}