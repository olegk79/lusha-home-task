# lusha-home-task

This is "Users Manager" web application using React, Node.js, Express and Webpack. It is also configured with webpack-dev-server, eslint, prettier and babel.

- [simple-react-full-stack](#simple-react-full-stack)
  - [Introduction](#introduction)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)
    - [Folder Structure](#folder-structure)
    - [Server Side](#server-side)
    - [Client Side](#client-side)
  - [End To End Tests](#end-to-end-tests)

## Introduction
This is a simple full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. Client side code is written in React and the backend API is written using Express.

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/olegk79/lusha-home-task.git

# Go inside the directory
cd lusha-home-task

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)

# Run end to end test (was not finished)
npm run test
```

## Documentation

### Folder Structure

- All the source code is inside **src** directory
- Inside src, there are following folders:

  - client
  
    All the frontend code (react, css, js and any other assets) is here
  - server
    
    Backend Node.js/Express code is here
  - tests

    for end-to-end tests
  - common
    
    for common stuff both for server and client - bcrypt salt used for hashing passwords is here. In production, of course, it should not be hard coded


### Server Side
#### Technologies
- Node.js
- Express.js
- Sqlite DB
#### Database
- Sqlite database is used. It is lightweight and embedded-in-file SQL database. The DB is populated with some fake users and attached (in db folder). Also, "adapter" created for manipulations with the DB (adapters/sqlite.js). 
- In "real" apps in production, of course, full SQL server or (may be even preferrable) Mongo DB may be used
#### Routes
There are 2 express routes : 
- get users
Get all users or get up to X users (paging)
- add user
### Client Side
#### Technologies
- React
- React Router
- React-Redux
- Redux thunk
- Axios
- Material UI
#### State Management
- React redux is used for state management. It is quite big overhead for such simple app but I wanted to show my knowledge in this area.
- In "Add User" component I also used internal state for storing entered data - there is no need to store it in global state.
- There are 2 reducers which combined in root reducer
#### Components
There are 3 components:
- Users List
- Add User
- App (root which serves 1 and 2)

Material UI is used for styling

React Hash Router is used for navigation
##### Users List Component
Loads up to 15 users initially

Load More button loads up to 15 users more

When new user is added in Add User view it appears in users list
##### Add User Component
Email validation both on client side (email is valid) and server side (email is not in use)

Bcrypt is used to hash passwords
#### Actions
Action creators used for all actions

Async actions use Thunk when appropriate
#### Services
There are 2 services which used to make requests to server
- add user
- get users 

Axios package is used

### End To End Tests
- Jest and Puppeteer are user
- End to End test is under tests\App.test,js
- This area is new for me (I made only server side unit and integration tests, no client side tests and no end-to-end tests). I learned some tutorials and installed the stuff, started to write the test. Eventually I got stuck when add user page appeared blank (see my comments in test file). I had no time to proceed further unfortunately.



