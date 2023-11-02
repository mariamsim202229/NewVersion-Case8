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