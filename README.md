# Full-Stack Library Management System

A modern, responsive, SaaS-style library management system built with the MERN stack.

## Tech Stack
*   **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Axios, React Router.
*   **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Auth.

## Features
*   **Authentication:** Dual-role based auth (Admin/User).
*   **Dashboard:** SaaS style with overview metrics, clean charts, and dark/light mode functionality.
*   **Book Management:** Browse books with search, view live availability.
*   **Issuance System:** Automated rules to issue and return books with due date checks and fine tracking.
*   **Admin Panel:** Full CRUD capabilities for library stock under a secure protected route.

## Setup Instructions

### Environment Variables
1.  Ensure you have your `.env` configured inside the `/backend` directory.
    ```env
    MONGO_URI="your_mongodb_cluster_url"
    JWT_SECRET="any_secure_random_string_here"
    PORT=5000
    ```

### Run Locally
To run this application locally, you will need to open two terminal windows (one for the backend and one for the frontend).

**Starting the Backend Server**
```bash
cd backend
npm install
npm run dev
```

**Starting the Frontend App**
```bash
cd frontend
npm install
npm run dev
```

The frontend should be accessible at `http://localhost:5173/` by default.
