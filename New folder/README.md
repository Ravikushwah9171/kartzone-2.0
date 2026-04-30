# KARTZONE | Production Full-Stack Setup Instructions

This project has been upgraded to a **MERN Stack** (React, Node.js, Express, MongoDB) for production-grade security and scalability.

## 💡 Workable Backend Features

The backend is now designed to be "workable" immediately:

- **Mock DB Fallback**: If MongoDB is not detected, the server will automatically use an **In-Memory Mock Database**. You can test everything without installing MongoDB! (Note: Data resets on server restart).
- **Auto-CORS**: Configured to work with any frontend port.

## 🚀 How to Run

### 1. Start the Backend

Open a terminal in the `backend` folder:

```bash
cd backend
npm install
npm start
```

_The server will run on http://localhost:5000_

### 2. Start the Frontend

Simply open `index.html` in your browser (Vanilla JS version) or:

```bash
cd frontend
npm install
npm run dev
```

## 📡 APIs Used

### Internal APIs (Your Backend)

- `POST /api/auth/signup`: User registration.
- `POST /api/auth/login`: User authentication (returns JWT).
- `POST /api/orders`: Place a new order (Requires JWT).
- `GET /api/orders`: Fetch user order history (Requires JWT).

### External APIs

- **Stripe API**: Required for real payment processing.
  - To enable, add your `STRIPE_SECRET_KEY` to `backend/.env`.

---

_Developed by your Senior Full-Stack Assistant._
