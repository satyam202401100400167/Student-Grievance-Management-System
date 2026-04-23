# Student Grievance Management System (MERN)

A complete, exam-ready MERN application where students can register/login and manage grievances (create, view, search, update status, delete).

## 1) Full Backend Code (File-wise)

Backend is in `backend/` with required modular structure:

- `config/db.js`
- `controllers/authController.js`
- `controllers/grievanceController.js`
- `middleware/authMiddleware.js`
- `middleware/errorMiddleware.js`
- `models/User.js`
- `models/Grievance.js`
- `routes/authRoutes.js`
- `routes/grievanceRoutes.js`
- `server.js`
- `.env.example`
- `package.json`

## 2) Full Frontend Code (File-wise)

Frontend is in `frontend/`:

- `src/api/axios.js`
- `src/components/ProtectedRoute.jsx`
- `src/pages/Register.jsx`
- `src/pages/Login.jsx`
- `src/pages/Dashboard.jsx`
- `src/App.jsx`
- `src/main.jsx`
- `src/index.css`
- `vite.config.js`
- `index.html`
- `.env.example`
- `package.json`

## 3) Environment Variable Examples

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student_grievance_db
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000
```

## 4) Step-by-Step Setup Instructions

### Prerequisites

- Node.js v18+ recommended
- MongoDB installed locally or MongoDB Atlas URI

### Backend Setup

1. Open terminal in project root.
2. Run:
   - `cd backend`
   - `npm install`
3. Create `.env` from `.env.example` and update values.
4. Start backend:
   - `npm run dev`
5. API base URL:
   - `http://localhost:5000`

### Frontend Setup

1. Open second terminal in project root.
2. Run:
   - `cd frontend`
   - `npm install`
3. Create `.env` from `.env.example`.
4. Start frontend:
   - `npm run dev`
5. Open:
   - `http://localhost:5173`

## 5) Postman Testing Guide

Base URL: `http://localhost:5000`

### A. Register

- Method: `POST`
- URL: `/api/register`
- Body (JSON):

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "123456"
}
```

### B. Login

- Method: `POST`
- URL: `/api/login`
- Body (JSON):

```json
{
  "email": "rahul@example.com",
  "password": "123456"
}
```

Copy token from response.

### C. Create Grievance (Protected)

- Method: `POST`
- URL: `/api/grievances`
- Headers:
  - `Authorization: Bearer <token>`
- Body (JSON):

```json
{
  "title": "Bus Delay",
  "description": "College bus arrives late every day.",
  "category": "Transport"
}
```

### D. Get All Grievances (Protected)

- Method: `GET`
- URL: `/api/grievances`
- Headers:
  - `Authorization: Bearer <token>`

### E. Get Grievance By ID (Protected)

- Method: `GET`
- URL: `/api/grievances/:id`
- Headers:
  - `Authorization: Bearer <token>`

### F. Update Grievance (Protected)

- Method: `PUT`
- URL: `/api/grievances/:id`
- Headers:
  - `Authorization: Bearer <token>`
- Body (JSON):

```json
{
  "status": "Resolved"
}
```

### G. Delete Grievance (Protected)

- Method: `DELETE`
- URL: `/api/grievances/:id`
- Headers:
  - `Authorization: Bearer <token>`

### H. Search Grievances (Protected)

- Method: `GET`
- URL: `/api/grievances/search?title=bus`
- Headers:
  - `Authorization: Bearer <token>`

## 6) Sample Screenshot Descriptions (for Report)

Use these captions in your report:

1. **Registration Page**: Student enters name, email, and password to create account.
2. **Login Page**: Student logs in using email and password.
3. **Dashboard Overview**: Welcome header, grievance submission form, grievance listing table.
4. **Grievance Submission**: New grievance created under selected category.
5. **Search Functionality**: Table filtered by grievance title keyword.
6. **Update Status**: Pending grievance changed to Resolved.
7. **Delete Grievance**: Existing grievance removed from dashboard list.
8. **Logout Action**: Session ended and redirected to login page.

## 7) GitHub Repo Structure

```text
student-grievance-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── grievanceController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Grievance.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── grievanceRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Deployment (Render + Netlify/Vercel)

### Backend on Render

1. Push project to GitHub.
2. In Render, create **New Web Service** from repo.
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `PORT=10000` (Render may provide automatically)
   - `MONGO_URI=<your atlas uri>`
   - `JWT_SECRET=<your secret>`
   - `CLIENT_URL=<your frontend deployed url>`
7. Deploy and copy backend URL, e.g. `https://your-backend.onrender.com`

### Frontend on Netlify

1. Create new site from GitHub repo.
2. Base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add env variable:
   - `VITE_API_BASE_URL=https://your-backend.onrender.com`
6. Deploy.

### Frontend on Vercel (Alternative)

1. Import GitHub repo in Vercel.
2. Set root directory to `frontend`.
3. Framework preset: `Vite`.
4. Add env variable:
   - `VITE_API_BASE_URL=https://your-backend.onrender.com`
5. Deploy.
