# Petgov

Petgov is a Kanban-style task board application with user authentication and real-time collaboration.

The frontend is built with Angular 21 and communicates with a Node/Express API backed by MongoDB and Socket.IO.

## Features

- **User authentication**: Register, log in, and load the current authenticated user.
- **Boards**: Create and view personal boards.
- **Columns**: Load columns for a board and create new columns in real time.
- **Tasks**: Load tasks for a board and create new tasks in real time.
- **Real-time collaboration**: Users join a board room over WebSockets; newly created columns and tasks are broadcast to everyone on that board.

## Architecture overview

- **Client**: Angular application in this `client` folder.
- **Server**: Node/Express app in the `server` folder exposing REST endpoints and a Socket.IO server.
- **Database**: MongoDB (local by default) at `mongodb://localhost:27017/petgov`.
- **Communication**:
  - REST API base URL: `http://localhost:3001/api`
  - WebSocket URL: `http://localhost:3001`

These URLs are configured in `src/environments/environment*.ts`.

## Getting started

### 1. Prerequisites

- Node.js and npm
- MongoDB running locally (default connection string: `mongodb://localhost:27017/petgov`)

### 2. Install dependencies

From the project root:

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Run the backend (server)

From the `server` folder:

```bash
npm start
```

This will:

- Start the Express API on `http://localhost:3001`
- Connect to MongoDB at `mongodb://localhost:27017/petgov`
- Expose the Socket.IO server on `http://localhost:3001`

### 4. Run the frontend (client)

From the `client` folder:

```bash
npm start
```

or, equivalently:

```bash
ng serve
```

Once the dev server is running, open your browser at `http://localhost:4200/`. The application will automatically reload whenever you modify source files.

## Configuration

Client configuration lives in:

- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

By default, both files are set to:

- `apiUrl: 'http://localhost:3001/api'`
- `socketUrl: 'http://localhost:3001'`

Update these values if you run the API on a different host or port.

## API overview

### REST endpoints

All REST endpoints are prefixed with `/api` and require a valid JWT in the `Authorization: Bearer <token>` header (except registration and login).

- `POST /api/users` – Register a new user.
- `POST /api/users/login` – Log in and receive a JWT.
- `GET /api/user` – Get the current authenticated user.
- `GET /api/boards` – Get boards for the current user.
- `GET /api/boards/:boardId` – Get a single board by ID.
- `GET /api/boards/:boardId/columns` – Get columns for the given board.
- `GET /api/boards/:boardId/tasks` – Get tasks for the given board.
- `POST /api/boards` – Create a new board for the current user.

### WebSocket events

The client connects to the Socket.IO server at the `socketUrl` and authenticates using the same JWT. The following events are used (see `server/src/types/socketEvents.enum.ts`):

- **boards:join** – Join a board room.
- **boards:leave** – Leave a board room.
- **columns:create** – Request creation of a new column.
- **columns:createSuccess** / **columns:createFailure** – Column creation result broadcast.
- **tasks:create** – Request creation of a new task.
- **tasks:createSuccess** / **tasks:createFailure** – Task creation result broadcast.

## Angular CLI commands

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.2. The usual CLI commands are still available:

### Development server

```bash
ng serve
```

### Code scaffolding

Generate a new component:

```bash
ng generate component component-name
```

For a complete list of schematics:

```bash
ng generate --help
```

### Building

```bash
ng build
```

Build artifacts are stored in the `dist/` directory. Production builds are optimized for performance.

### Running unit tests

To execute unit tests with [Vitest](https://vitest.dev/):

```bash
ng test
```

### Running end-to-end tests

```bash
ng e2e
```

Angular CLI does not include an e2e framework by default; you can choose the one that best fits your needs.

### Additional resources

For more information on Angular CLI commands, see the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
