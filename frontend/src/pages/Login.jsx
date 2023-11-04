import { useState, useEffect } from 'react';

export function Login({setUser, setToken}) {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        const endpoint = "http://localhost:4444/user/login";
        const options = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, password: password })
        }
        console.log("options", options);
        asynqRequest(endpoint, options);
    }

    const asynqRequest = (endpoint, options) => {
        fetch(endpoint, options)
        .then(response => response.json())
        .then((data) => {
            console.log("data", data);
            if (data.user.hasOwnProperty("id")) {
                setUser(data.user);
                setToken(data.token);    
            }
        })
    }

    useEffect(() => {
        console.log("name:", name, "password:", password);
    }, [name, password]);

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