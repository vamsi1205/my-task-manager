---
description: Repository Information Overview
alwaysApply: true
---

# Repository Information Overview

## Repository Summary
This repository contains a full-stack task management application with an Ionic/Angular frontend and a Node.js/Express backend.

## Repository Structure
The project is a multi-project repository:
- **client/**: Ionic/Angular frontend (Angular 19, Ionic 8).
- **server/**: Express.js backend with MongoDB/Mongoose.

### Main Repository Components
- **Client**: Angular-based user interface with Ionic components.
- **Server**: REST API with JWT authentication and MongoDB storage.

## Projects

### Client (Ionic/Angular)
**Configuration Files**: [../client/package.json](../client/package.json), [../client/ionic.config.json](../client/ionic.config.json)

#### Language & Runtime
**Language**: TypeScript  
**Version**: Angular 19.0.0, TypeScript 5.6.0  
**Build System**: Angular CLI  
**Package Manager**: npm

#### Dependencies
**Main Dependencies**:
- `@angular/core`: ^19.0.0
- `@ionic/angular`: ^8.0.0
- `rxjs`: ~7.8.0
- `canvas-confetti`: ^1.6.0

#### Build & Installation
```bash
cd client && npm install && npm run build
```

#### Testing
**Framework**: Jasmine/Karma  
**Run Command**:
```bash
cd client && npm test
```

### Server (Node.js/Express)
**Configuration File**: [./package.json](./package.json)

#### Language & Runtime
**Language**: Node.js (JavaScript/CommonJS)  
**Version**: Express 5.2.1, Mongoose 9.1.6  
**Package Manager**: npm

#### Dependencies
**Main Dependencies**:
- `express`: ^5.2.1
- `mongoose`: ^9.1.6
- `jsonwebtoken`: ^9.0.3
- `bcryptjs`: ^3.0.3
- `cors`, `dotenv`

**Development Dependencies**:
- `nodemon`: ^3.1.11

#### Build & Installation
```bash
cd server && npm install
```

#### Testing
**Framework**: Not configured  
**Run Command**:
```bash
cd server && npm test
```
