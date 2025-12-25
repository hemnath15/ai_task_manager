# AI Task Management System – Frontend

A modern task management application built with **React + TypeScript**, featuring authentication, task CRUD operations, dashboard analytics, and AI-generated insights.

---

## Features

- User Authentication (Signup / Login / Logout)
- JWT-based protected routes
- Task CRUD (Create, Read, Update, Delete)
- Dashboard with task statistics
- AI-powered task insights

---

## Tech Stack

### Frontend
- React
- TypeScript
- Redux Toolkit
- React Router
- Axios
- CSS

### Backend (Connected)
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## Folder Structure
src/
├── app/ # Redux store configuration
├── components/ # Reusable UI components
├── features/ # Feature-based Redux slices & APIs
│ ├── auth/
│ ├── tasks/
│ └── insights/
├── pages/ # Route-level pages
├── routes/ # Protected routes
├── services/ # Axios configuration
├── styles/ # Global styles

---

## Authentication Flow

1. User logs in or signs up
2. Backend returns a JWT token
3. Token stored in Redux
4. Axios interceptor attaches token to API calls
5. Protected routes allow access only if authenticated

---

## State Management

- Redux Toolkit used for predictable state handling
- Feature-based slices:
  - `authSlice` – authentication state
  - `taskSlice` – task CRUD state
  - `insightsSlice` – AI insights state

---

## API Communication

- Axios instance configured in `services/axios.ts`
- Automatically attaches Authorization headers
- Centralized error handling

---

## Running the Project

### 1. Install dependencies
```bash
npm install
npm run dev


