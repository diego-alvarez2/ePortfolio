## Petgov

**Petgov** is a Kanban‑style task board application with **user authentication** and **real‑time collaboration**, built with an Angular frontend and a Node/Express + MongoDB + Socket.IO backend.

This root README documents the **entire project**. For Angular‑specific details, see `client/README.md`.

## Project structure

- **`client/`**: Angular 21 single‑page application (SPA)
  - Authentication (login/register)
  - Boards list and board view
  - Columns and tasks UI with real‑time updates via Socket.IO
- **`server/`**: Node.js + Express + MongoDB API
  - REST endpoints for users, boards, columns, and tasks
  - JWT‑based authentication
  - Socket.IO server for real‑time board updates

## Features

- **Authentication**
  - Register a new user
  - Log in and receive a JWT
  - Load the current authenticated user
- **Boards**
  - List all boards for the current user
  - View an individual board
  - Create new boards
- **Columns**
  - Load all columns for a board
  - Create columns via WebSocket, broadcast to everyone in that board
- **Tasks**
  - Load all tasks for a board
  - Create tasks via WebSocket, broadcast to everyone in that board
- **Real‑time collaboration**
  - Users join a board “room” over Socket.IO
  - New columns/tasks are emitted to all connected clients on that board

## Technology stack

- **Frontend**
  - Angular 21
  - RxJS
  - Socket.IO client
- **Backend**
  - Node.js + Express
  - MongoDB + Mongoose
  - Socket.IO
  - JSON Web Tokens (JWT) for auth

## Environments and configuration

### Backend

- Server entry point: `server/src/server.ts`
- Default HTTP port: **`3001`**
- Default MongoDB connection string: **`mongodb://localhost:27017/petgov`**
- Socket.IO is attached to the same HTTP server on port **3001**.

> If you change the port or Mongo connection string, update the corresponding config and ensure the client `environment` files match.

### Frontend

Angular environment files (in `client/src/environments/`):

- `environment.ts`
- `environment.development.ts`

By default both use:

- `apiUrl: 'http://localhost:3001/api'`
- `socketUrl: 'http://localhost:3001'`

Update these values if the API or WebSocket server runs on a different host or port.

## Getting started

### 1. Prerequisites

- Node.js and npm
- MongoDB running locally and accessible at `mongodb://localhost:27017/petgov` (or adjust config)

### 2. Install dependencies

From the project root:

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Run the backend (server)

From `server/`:

```bash
npm start
```

This will:

- Start the Express API at `http://localhost:3001`
- Connect to MongoDB
- Expose the Socket.IO server on the same port

### 4. Run the frontend (client)

From `client/`:

```bash
npm start
```

or:

```bash
ng serve
```

Then open `http://localhost:4200/` in your browser.

## API overview

All REST endpoints are under `/api`. Authentication‑protected routes expect a header:

- `Authorization: Bearer <jwt-token>`

### Auth endpoints

- `POST /api/users` – Register a new user.
- `POST /api/users/login` – Log in and receive a JWT.
- `GET /api/user` – Get the current authenticated user.

### Boards

- `GET /api/boards` – Get boards for the current user.
- `GET /api/boards/:boardId` – Get a single board by ID.
- `POST /api/boards` – Create a new board.

### Columns

- `GET /api/boards/:boardId/columns` – Get all columns for a board.

### Tasks

- `GET /api/boards/:boardId/tasks` – Get all tasks for a board.

## WebSocket (Socket.IO) events

The client connects to the Socket.IO server at `socketUrl` and authenticates with a JWT (sent in the handshake). Events (see `server/src/types/socketEvents.enum.ts`):

- `boards:join` – Join a board room.
- `boards:leave` – Leave a board room.
- `columns:create` – Request column creation.
  - `columns:createSuccess` – Column successfully created and broadcast.
  - `columns:createFailure` – Column creation failed.
- `tasks:create` – Request task creation.
  - `tasks:createSuccess` – Task successfully created and broadcast.
  - `tasks:createFailure` – Task creation failed.

## Development notes

- For Angular CLI usage (build, test, code generation), see `client/README.md`.
- The backend uses `nodemon` and `ts-node` for TypeScript‑based development in `server/`.
- MongoDB schemas and models live under `server/src/models/`.

This README should give you a complete picture of how the **Petgov** project is organized and how to run and extend it.
