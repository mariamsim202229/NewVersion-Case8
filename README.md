# Getting Started with Fullstack application
 
 Create folders *backend* and *frontend*.
 In project root folder add a *.gitignore* file. Ignore common npm folders in subfolders *frontend* and *backend*:
 Add *"type": "module"* in package.json file. 
Add to *scripts*
*"dev": "nodemon server"*

# Backend
The backend server is created with
-install Node.js
-npm init -y
-npm install express    
-touch server.js
-npm start
In order to run the server type;
-cd backend
-node server.js
 
For automatic server restart
-npm install nodemon

Browse to url *http://localhost:4000/movies* and json formatted content shows up:
 
# Frontend
To create a React frontend project do these steps
 
-install Node.js 
-clone the project from github
-npm install
-npx create-react-app "my-react-app" in terminal
-a src map is created with app.js file where project changes are made
-cd frontend
-npm run dev to start the app in the browser

Open browser url (typically) http://localhost:5173/ and default content in a React Vite app will be displayed.


---