# Healthcare Appointment System (MERN)

A full-stack Healthcare Appointment System built using the MERN stack.
The system supports three roles:

- Admin

- Doctor

- Patient

The application implements authentication, role-based authorization, appointment booking, and doctor availability management.

# Tech Stack

### Backend

- Node.js

- Express.js

- MongoDB + Mongoose

- JWT (Cookie-based authentication)

- Joi (Validation)

- bcrypt (Password hashing)

### Frontend

- React (Vite)

- React Router

- React Query (TanStack Query)

- React Hook Form

- Tailwind CSS

- React Toastify

### Backend Architecture

- Controller → Handles request & response

- Validation (Joi) → Input validation

- Middleware → Authentication & role control

- Modular structure → Feature-based organization

### Frontend Architecture

- React Query for server state

- Context API for authentication state

- Role-based routing

- Cookie-based session management

- Tailwind for styling

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with the following variables:
   ```bash
   MONGODB_URL=
   PORT = 8080
   FRONTEND_URL =
    JWT_SECRET=
    JWT_EXPIRE = '1d'
    COOKIE_EXPIRE = 864000000
    NODE_ENV = "development"
   ```
4. Start the server:

   ```bash
   npm run dev
   ```

   ### Frontend Setup

5. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
6. Install dependencies:
   ```bash
    npm install
   ```
7. Start the development server:
   ```bash
    npm run dev
   ```

## Authentication Flow

- JWT stored in HTTP-only cookie

- React Context stores logged-in user

- ProtectedRoute restricts unauthorized access

- RoleRoute restricts role-based dashboards

### Patient

- View all doctors

- View available slots (Mon–Fri, 10AM–5PM)

- Book appointment

- Cancel appointment (only if Pending)

- View appointment history

### Doctor

- Set availability

- View appointment requests

- Approve / Reject appointment

- Mark appointment as Completed

Admin

- View all users

- View all appointments
- change Role to Doctor/Patient

## Assumptions Made

#### 1. Doctor working days are fixed:

- Monday to Friday

- 10:00 AM – 5:00 PM

#### 2. Only:

- Patient can cancel (if Pending)

- Doctor can Approve/Reject/Complete

- admin can change Role to Doctor/Patient.

#### 3. One appointment per doctor per time slot.

#### 4. Date validation:

- Past dates are not allowed.

- Weekends are not allowed.
