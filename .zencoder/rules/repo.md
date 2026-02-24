---
description: Repository Information Overview
alwaysApply: true
---

# My Task Manager Information

## Summary
A backend server for a task management application built with **Node.js**, **Express**, and **MongoDB**. It provides authentication and task management APIs.

## Structure
The repository is organized with the entire backend application contained within the `server/` directory.

- **[./server](./server)**: Contains the Express application, models, routes, and controllers.
- **[./server/config](./server/config)**: Database connection and configuration.
- **[./server/controllers](./server/controllers)**: Logic for handling API requests.
- **[./server/middleware](./server/middleware)**: Custom middleware like authentication checks.
- **[./server/models](./server/models)**: Mongoose schemas for Users and Tasks.
- **[./server/routes](./server/routes)**: API route definitions.
- **[./server/utils](./server/utils)**: Utility functions like token generation.

## Language & Runtime
**Language**: JavaScript (CommonJS)  
**Version**: Node.js (Version not explicitly specified, but uses modern Express features)  
**Build System**: None  
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool.
- **jsonwebtoken**: For handling JWT-based authentication.
- **bcryptjs**: For password hashing.
- **cors**: For enabling Cross-Origin Resource Sharing.
- **dotenv**: For loading environment variables.

**Development Dependencies**:
- **nodemon**: For automatically restarting the server during development.

## Build & Installation
To install the dependencies, run the following command from the `server` directory:

```bash
cd server && npm install
```

To start the application:

```bash
# Start in production mode
cd server && npm start

# Start in development mode with nodemon
cd server && npm run dev
```

## Main Files & Resources
- **[./server/server.js](./server/server.js)**: Entry point that connects to the database and starts the server.
- **[./server/app.js](./server/app.js)**: Express application setup and route configuration.
- **[./server/.env](./server/.env)**: Environment variables for PORT, MONGO_URI, and JWT_SECRET.

## Testing
**Framework**: None  
**Status**: No test suite is currently configured in `package.json`.

**Run Command**:
```bash
npm test
```
*(Note: Current command only echoes "no test specified")*
