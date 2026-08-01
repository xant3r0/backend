# Notes App (Backend)

## Notes App Backend with Session authentication and basic functionality

## Tech Stack
- Node.js
- Express.js;
- Postgree SQL;

## Used libraries
- bcrypt;
- nodemon;
- connect-pg-simple;
- express;
- express-session;
- pg;

## Installation & Setup
1. Make sure that you have installed node.js on your system. You can install it from [here](https://nodejs.org/en);
2. Use `git clone https://github.com/username/repo.git` to install the repo;
3. Use `npm install ` to install all dependencies;
4. Configure the .env file so the server starts correctly and it can connect with DB;

## Running the Server
- To start server in dev, use `npm run dev`;
- To start server in prod, user `npm start`;

# API Endpoints

- POST /auth/login -> login;
- POST /auth/register -> register;
- PUT /auth/change-password -> change password;
- DELETE /auth/delete-user -> delete user;
- POST /auth/logout -> logout;
- GET /notes -> get notes;
- POST /notes -> create notes;
- PUT /notes/:id -> change note;
- DELETE /notes/:id -> delete note;