# Nodejs-API-Authentication-Vite

Authentication:
- Backend API server Node.js Express
- User credentials stored in a json file.
- Frontend Rect Vite


This guide uses *nodemon* (installed globally) to automatically restart application. 

## Folder structure
Create folders *backend* and *frontend*.

In project root folder add a *.gitignore* file. Ignore common npm folders in subfolders *frontend* and *backend*:

*.gitignore*

```md
# backend
backend/node_modules

# frontend
frontend/node_modules
```

## Backend server

Navigate to backend folder

`cd backend`

Initiate Node.js project using cmd `npm init`, and choose a script name for main (entry point) - this guide uses *server.js*.


Edit *package.json* and set type to module in order to use import ES modules. Add 

*"type": "module"*

Add to *scripts*

*"dev": "nodemon server"*


```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server"
  },
  "author": "",
  "license": "ISC"
}
```

Create the file *server.js*, and output "Hello World"

```js
console.log("Hello World);
```

Start application (if nodemon global installed):

`npm run dev`;


## Backend: use Express 

Install express

`npm install express`

Edit *server.js* to use express 

```js
import express from 'express';

const PORT = 4444;
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

console.log("Hello World");
```

Running application will display "Hello World" in terminal and the same message in a browser visiting url *http://localhost:4444/*


## Backend: users in json file

Application will use a json file to store data. Create a folder named *backend/data* and add a file named *db.json*

*backend/data/db.json*

```json
[
    {
        "name": "Joe",
        "password": "abc",
        "id": 1,
        "loginCount": 0
    },
    {
        "name": "Mary",
        "password": "def",
        "id": 2,
        "loginCount": 0
    }
]
```

## Backend: user model

In order to read and update data create a model responsible for data access. Create a folder named *models* and a model named *user-model.js*. User model as a JavaScript class using Node.js built-in *fs* and *path* to access file content. 

Every request needs to read file content, method *readData*. Method *getUsers* display all user data (except password). 

*backend/models/user-model.js*

```js
import fs from 'fs';
import path from 'path';

const db = path.normalize(path.resolve('./data/db.json'));

class User {

    constructor() {
    }
    
    readData() {
        const data = fs.readFileSync(db, {encoding: 'utf-8'}); 
        if (!data) {
            return [];
        } else {
            return JSON.parse(data);
        }
    }

    getAll() {
        const users = this.readData();
        if (!users) {
            return;
        }
        return users.map(user => ({name:user.name, id: user.id, loginCount: user.loginCount}));
    }
}

export default User;
```

In *server.js* import model and display content (stringified) from file.

```js
import express from 'express';
import User from './models/user-model.js';

const PORT = 4444;
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/users', (req, res) => {
    const user = new User();
    const data = user.getUsers();
    res.send(`Users: ${JSON.stringify(data)}`);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
```

Browse to url *http://localhost:4444/users*:

```html
Users: [{"name":"Joe","id":1,"loginCount":0},{"name":"Mary","id":2,"loginCount":0}]
```

Handling requests to read and edit information in models using a controller. Create a folder named *controllers* and a file named *user-controller.js*.

The user controller handles logic between a server request and a model. This contoller sends server responses as json content, the method *res.json()*.

*backend/controller/user-controller.js*

```js
import Users from '../models/users-model.js';
const users = new Users();

function handleGetAll(req, res) {
    res.json(users.getAll());    
}

export {handleGetAll}
```

Since an application handles multiple request it's good practice to use backend routes as a module.

Create a folder named *routes* and a file named *user-router.js*.

*backend/routes/user-router.js*

```js
import { Router } from 'express';
const userRouter = Router();

import { handleGetAll } from '../controllers/user-controller.js';

userRouter.get('/users', handleGetAll);

export default userRouter;
```


In *server.js* import *user-router* and make the server repond to thisd request pass the router. The user model is no longer needed in *server.js*.  


```js
import express from 'express';
// import User from './models/user-model.js';
import userRouter from './routes/user-router.js';

const PORT = 4444;
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
```

Browse to url *http://localhost:4444/users* and json formatted content shows up:

```html
[
    {
        "name": "Joe",
        "id": 1,
        "loginCount": 0
    },
    {
        "name": "Mary",
        "id": 2,
        "loginCount": 0
    }
]
```

## Frontend React Vite

Open a new terminal and navigate to folder *frontend*

`cd frontend`

Install a new React Vite project in existing folder (cmd ending dot):

`npm create vite@latest .`

Use *React* and *JavaScript* in template.

After installation you will see what to do next:

```js
npm install
npm run dev
```

Open browser url (typically) http://localhost:5173/ and default content in a React Vite app will be displayed.


### Basic React Vite configurations

Edit *App.jsx* to display Hello World:

```js
function App() {
    return (
        <>
            <h1>Hello World</h1>
        </>
    )
}

export default App;
```

Remove all css content from *frontend/src/index.css*, and you should have a simple "Hello World" in browser. 

The application should handle some frontend routes. In a new terminal navigate to folder *frontend* and install *react-router-dom*.

`cd frontend`

`npm install react-router-dom`

Edit *frontend/main.jsx* to use BrowserRouter - a component that stores the current location in the browser's address bar and navigates using the browser's history stack.

Import the component and wrap the component App inside:

*frontend/main.jsx*

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

Create a folder to React components *frontend/src/components*.

Add a component to display a topvnavigation bar. Create a file named *TopNavigation.jsx*. This file will use Link component wich depends on *react-router-dom*. Return na-ul-li and link to urls **/** and a future **/login**.


*frontend/src/components/TopNavigation.jsx*

```js
import { Link } from 'react-router-dom';

export function TopNavigation() {

    return (
        <nav>
            <ul>
                <li><Link to='/'>Start</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
        </nav>
    )
}
```

In *App.jsx* import *TopNaviation*:


*App.jsx*

```js
import { TopNavigation } from "./components/TopNavigation";

function App() {
    return (
        <>
            <TopNavigation />
            <h1>Hello World</h1>
        </>
    )
}

export default App;
```

Make top navigation to display content in a horiziontal view. 


*index.js*

```css
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul li {
  display: inline-block;
}
ul li a {
  padding: .5rem;
}
```

In browser you should be able to click links and se url changes.

## Frontend: login

Time to display a login form.
Create a folder named *frontend/src/pages* and inside the folder a file named *Login.jsx*. This page uses *useState and useEffect* in order to set values for name and password. In browser console you should see field values when typing.


*frontend/src/pages/Login.jsx*

```js
import { useState, useEffect } from 'react';

export function Login() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log("name:", name, "password:", password);
    }, [name, password]);

    return (
        <>
            <h1>Login</h1>
            <form action="" method="post">
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
```

Using *Login* button and the form will be posted to backend server. The request must be handled server side in order to keep a running server.

The backend server is listening on port 4444. 

Instead of default form action we will use ascynq fetch to send data to backend server. Is server receives a request on a url like http://localhost:4444/user/login the application is supposed to respond.

Create a listener function and check for submit event.

```js

    // ...

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
        })
    }
    // ...

```

Making client send a form requests to another port is not allowed by default. Message will be like:

```js

Access to fetch at 'http://localhost:4444/user/login' from origin 'http://localhost:5173' has been blocked by CORS policy: ...

```
Handle this CORS problem *Cross-origin resource sharing* is a mechanism allowing restricted resources on a web page to be accessed from another domain | port.

## Backend: cors

Switch to backend and install package *cors* in order to handle *Cross-origin resource sharing**

`cd backend`

`npm install cors`


In *server.js* import *cors* and let express handle requests - *app.use(cors());*.

The server should handle post request. Using Express add:

```js
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
```


*server.js*

```js
import express from 'express';
import cors from 'cors';

import userRouter from './routes/user-router.js';

const PORT = 4444;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
```

Handle asynq requests from client in *user-router.js*. For now, just let post request to `/user/login` use the same handler (get all users).

*user-router.js*

```js
import { Router } from 'express';
const userRouter = Router();

import { handleGetAll } from '../controllers/user-controller.js';

userRouter.get('/users', handleGetAll);
userRouter.post('/user/login', handleGetAll);

export default userRouter;
```

If you send the form you will se a result in browser console like

```js
data (2) [{…}, {…}]0: {name: 'Joe', id: 1, loginCount: 0}1: {name: 'Mary', id: 2, loginCount: 0}
```

Time to match user. In *user-model.js* create a function named *login* to match incoming request. 

*user-model.js*

```js
    //...

    login(name, password) {
        const users = this.readData();
        let obj = {};
        users.forEach(user => {
            if (user.name === name && user.password === password) {
                obj = user;
            }
        });
        return obj;
    }

    // ...
```

Create a function handler in *user-controller.js*. Make sure to export the handler *handleGetUserByName*.

```js
import Users from '../models/user-model.js';
const users = new Users();

function handleGetAll(req, res) {
    res.json(users.getAll());    
}

function handleLogin(req, res) {
    const name = req.body.name;
    const password = req.body.password;
    res.json(users.login(name, password));
}

export { handleGetAll, handleLogin }
```

In *user-router.js* import the handler and let current route match.

*user-router.js*

```js
userRouter.post('/user/login', handleLogin);
```

Try to use login form and see if a match returns.

In *user-model.js* add a method to save data. This method should have some logic to prevent important data to be overwritten (check array, object properties ...) 

*user-model.js*

```js


class User {

    constructor() {
    }
    
    readData() {
        const data = fs.readFileSync(db, {encoding: 'utf-8'}); 
        if (!data) {
            return [];
        } else {
            return JSON.parse(data);
        }
    }

    saveData(data) {
        return fs.writeFileSync(db, JSON.stringify(data));
    }

    // ...

}
```

Update *login* method in *user-model.js* to update number of logins. 

This method now: 
- read data
- match user
- increment number of logins
- save data
- return user obj

*user-model.js*

```js
import fs from 'fs';
import path from 'path';

const db = path.normalize(path.resolve('./data/db.json'));

class User {

    constructor() {
    }
    
    readData() {
        const data = fs.readFileSync(db, {encoding: 'utf-8'}); 
        if (!data) {
            return [];
        } else {
            return JSON.parse(data);
        }
    }

    saveData(data) {
        return fs.writeFileSync(db, JSON.stringify(data));
    }


    getAll() {
        const users = this.readData();
        if (!users) {
            return [];
        }
        return users.map(user => ({name:user.name, id: user.id, loginCount: user.loginCount}));
    }


    login(name, password) {

        // read data
        const users = this.readData();
        let obj = {};
        users.forEach(user => {

            // match user
            if (user.name === name && user.password === password) {
                
                // increment number of logins
                user.loginCount += 1;
                obj = user;
            }
        });

        // save data
        this.saveData(users);

        // return user
        return obj;
    }
}
```