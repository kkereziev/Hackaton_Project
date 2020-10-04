# Timesheet Management Application

A full-stack timesheet management application, built with Express and React. It's aimed at helping employees easily manage their timesheets.

[[_TOC_]]

## Prerequisites

- PostgreSQL Database running

## Environment Variables

### Server

```
DEV_DATABASE_URL=[connection string for PostgreSQL]
NODE_ENV=[can be one of "development","test" and "production"]
PORT=[port to listen on]
JWT_SECRET=[secret key for signing the JWT tokens]
```

### Client

```
REACT_APP_BACKEND_URL=[the host URL where the backend is listening]
```

## Setup and Running

- Run `npm run postinstall` to install all dependencies in the project root
- Run `npm run app` to run the application (both frontend and backend)
