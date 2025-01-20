# Express App

This is a simple Express.js application. It demonstrates how to set up an Express server and route requests.

## Requirements

- Node.js (version 20 or higher recommended)
- npm (Node Package Manager)
- Docker (if needed)

## Setup

Follow these steps to set up and run the Express app.

### 1. Install Dependencies

First, make sure you have Node.js and npm installed. You can verify this by running the following commands:

```bash
node -v
npm -v
```

If Node.js and npm are installed, you'll see the versions printed in the terminal.

Next, clone this repository or navigate to your project directory, and install the dependencies by running:

```bash
npm install
```

This will install all the necessary dependencies specified in `package.json`.

### 2. Create `.env` file

create the `.env` file in the root of the project by copying the `.env.example` file

```
cp .env.example .env
```

Afterward, modify the variables in the `.env` file to suit your needs

### 3. Running Database(optional)

Make sure you have Docker. To start Database, run the following command:

```bash
npm run db:start (to start db)
npm run db:stop (to stop db)
```

### 4. Running the Application

To start the Express server, run the following command:

```bash
npm start
```

This will run the server on the specified port (default: 3000). You can open your browser and navigate to `http://localhost:3000` to see the app in action.

### 5. API Document

This application provides an API documentation using Swagger. You can view and interact with the API endpoints by navigating to:

```
http://localhost:${PORT}/api-docs
```

### 6. Development Mode

For development, you can use `npm run dev` to start the app with automatic reloading. This will use `nodemon` to watch for file changes and restart the server automatically.

```bash
npm run dev
```
