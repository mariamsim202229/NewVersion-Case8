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


## 3 Backend: use Express 

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
