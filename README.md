# Student Grievance Management System

This is a MERN stack project where students can register, login, and manage grievances.

## Features
- User registration and login (JWT)
- Submit grievance
- View all grievances
- Update status (Pending/Resolved)
- Delete grievance
- Search grievance by title

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB
- Auth: JWT, bcrypt

## Project Structure
backend/ → API and database  
frontend/ → React app  

## Setup

### Backend
cd backend  
npm install  

Create .env:
PORT=5000  
MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret  

Run:
npm run dev  

### Frontend
cd frontend  
npm install  

Create .env:
VITE_API_BASE_URL=http://localhost:5000  

Run:
npm run dev  

## API Endpoints

Auth:
POST /api/register  
POST /api/login  

Grievances:
POST /api/grievances  
GET /api/grievances  
GET /api/grievances/:id  
PUT /api/grievances/:id  
DELETE /api/grievances/:id  
GET /api/grievances/search?title=xyz  

## Usage
1. Register a user  
2. Login and get token  
3. Use token in header:  
   Authorization: Bearer <token>  
4. Perform CRUD operations on grievances  

## Deployment
Backend: Render  
Frontend: Vercel  

## Conclusion
This project demonstrates MERN stack, authentication, and CRUD operations.