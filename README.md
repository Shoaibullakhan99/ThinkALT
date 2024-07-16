# User Management System

A simple User Management System built with React for the frontend and Node.js with Express for the backend. This application allows users to register, log in, view a list of registered users, and perform CRUD operations on user data.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Backend](#backend)
- [License](#license)

## Features

- User Registration
- User Login
- View all registered users
- Edit and delete user information
- JWT authentication for secure access

## Technologies Used

- **Frontend:**
  - React
  - React Router
  - Axios
  - React Toastify

- **Backend:**
  - Node.js
  - Express
  - MongoDB (via Mongoose)
  - JSON Web Token (JWT) for authentication
  - bcrypt for password hashing

## Setup

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or a MongoDB Atlas account

### Clone the Repository

```bash
git clone https://github.com/yourusername/user-management-system.git
cd user-management-system

cd backend

npm install

PORT=5000
MONGO_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret

node server.js

cd ..

cd fronend

npm install

npm start