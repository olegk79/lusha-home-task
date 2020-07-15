# lusha-home-task

This is a boilerplate to build a full stack web application using React, Node.js, Express and Webpack. It is also configured with webpack-dev-server, eslint, prettier and babel.

- [simple-react-full-stack](#simple-react-full-stack)
  - [Introduction](#introduction)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)
    - [Folder Structure](#folder-structure)
    - [Server Side](#server-side)
    - [Client Side](#client-side)

## Introduction
This is a simple full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. Client side code is written in React and the backend API is written using Express.

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/crsandeep/simple-react-full-stack

# Go inside the directory
cd simple-react-full-stack

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

## Documentation

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the server directory.

### Server Side
#### Technologies
Express.js,
Sqlite DB
#### Database
Sqlite database is used. It is lightweight and embedded-in-file SQL database. The DB is populated with some fake users and attached (in db folder). Also, "adapter" created for manipulations with the DB (adapters/sqlite.js). In "real" apps, of course, full SQL server or (may be even preferrable) Mongo DB may be used
#### Routes
There are 2 express routes : 1) get users 2) add user


### Client Side
#### Technologies
React, React Router, React-Redux, Redux thunk, Axios
#### Components
There are 3 components: 1) users list 2) add User 3) App (serves 1 and 2)
#### Actions
Actions use Thunk when appropriate (async)
#### Services
There are 2 services : 1) add user 2) get users which use axios to make requests to server



