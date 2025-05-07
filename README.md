FULL STACK USER DETAILS FORM APP (REACT + NODE + MONGODB):


This is a simple full-stack application to manage user information. Users can:
-	Add details via a form  
-	View all users in a table  
-	Edit existing user info  
-	Delete user records


TECH STACK:
-	Frontend: React, Axios
-	Backend: Node.js, Express.js
-	Database: MongoDB (Mongoose for schema modeling)


FEATURES:
-	Form with fields: First Name, Last Name, Phone, Address, Gender, Interests, Country
-	Handles input types: text, radio buttons, checkboxes, dropdown
-	REST API with CRUD operations:  
  -	`POST /users` → Add new user
  -	`GET /users` → Get all users
  -	`PUT /users/:id` → Update user by ID
  -	`DELETE /users/:id` → Delete user by ID
-	Conditional rendering for Add vs Update
-	Basic CSS for layout and spacing


HOW TO RUN:

STEP 1: CLONE THE REPO

git clone <repo-url>;
cd project;


STEP 2: SETUP BACKEND (Update MongoDB connection string in server/index.js)

cd server;
npm install;
node index.js;


STEP 3: SETUP FRONTEND

cd client;
npm install;
npm start;


CODE EXPLANATION:

Backend (Express + MongoDB)
-	Created a Mongoose model for the user with fields like name, gender, etc.
-	Created REST API routes:
  -	POST to add data to DB
  -	GET to fetch all users
  -	PUT to edit by ID
  -	DELETE to remove by ID

Frontend (React)
-	Used useState() to handle form and user list
-	Used useEffect() to fetch users on page load
-	Handled checkboxes, radio buttons, and dropdowns in a clean way
-	map() is used to show users in a table
-	Conditional rendering for Submit vs Update buttons
-	axios is used to make REST API calls
