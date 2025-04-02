# Dropbox Clone - Backend

This is the **backend** of the Dropbox Clone application, built with **Node.js**, **Express.js**, and **PostgreSQL**.

## 🚀 Live Demo
- **Backend API:** [Deployed Backend URL](https://dropbox-backend-kz1s.onrender.com)

---

## 📦 Features
- User authentication (Signup/Login with JWT)
- File upload, storage, and access control
- Secure API endpoints with user based file access
- Database integration with PostgreSQL

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Storage:** Local file Storage
- **Authentication:** JWT (JSON Web Tokens)

---

## 🔧 Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yudeepanshu/dropbox-backend.git
cd dropbox-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root folder and add:
```env
PORT=8000
DATABASE_URL=postgres://your-db-user:your-db-password@your-db-host:5432/your-db-name
JWT_SECRET={JWT_SECRET}
```

### 4️⃣ Start the Server
```sh
npm run dev # for local
```
The backend API will be available at [http://localhost:8000](http://localhost:8000)

---

## 📜 API Endpoints
### Authentication
- `POST /auth/signup` - User Registration
- `POST /auth/login` - User Login

### File Management
- `GET /files` - Get list of user files
- `POST /files/upload` - Upload a file
- `GET /files/download/:id` - Download file
- `GET /files/:id` - Delete file

---