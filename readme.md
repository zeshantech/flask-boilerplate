# User Management Boilerplate

This guide will walk you through setting up a **full-stack application** with a **Flask backend** and a **Vite frontend** using **PostgreSQL** as the database. You will have two options for setting up the project:
1. **Local Setup** (without Docker)
2. **Dockerized Setup**

### Technologies Used:
- **Flask**: Python-based backend framework.
- **Vite**: Frontend tool for React + TypeScript.
- **PostgreSQL**: Remote database (or local if required).
- **Docker**: For containerization (optional).

---

## 1. Environment Variables Configuration (`.env` Files)

First, let's create environment variables for both the backend and frontend.

### Backend (`BE .env`)

```plaintext
FLASK_ENV=development
SECRET_KEY=your_secret_key_here
JWT_SECRET_KEY=your_jwt_secret_key_here

DATABASE_URL=postgresql://username:password@remote-host:port/database_name

FLASK_APP=run.py

SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_smtp_password

REDIS_URI=rediss://default:your_redis_url

OTP_EXPIRATION=300

CORS_ALLOWED_ORIGINS=http://localhost:5173,https://application-url.com
```

### Frontend (`FE .env`)

```plaintext
VITE_API_URL=http://localhost:5000/api
```

---

## 2. Local Setup (Without Docker)

### 2.1 Backend Setup (Flask)

1. **Install Python and Virtual Environment**

   Ensure that you have Python installed. If not, install Python 3.10+.

   Create and activate a virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Unix/macOS
   venv\Scripts\activate      # Windows
   ```

2. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run Migrations**

   Initialize and apply the database migrations:

   ```bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

4. **Run the Flask Server**

   Start the Flask development server:

   ```bash
   flask run --host=0.0.0.0 --port=5000
   ```

### 2.2 Frontend Setup (Vite)

1. **Install Node.js and Dependencies**

   Ensure you have **Node.js** installed. Navigate to the `frontend/` directory and run:

   ```bash
   npm install
   npm run dev
   ```

3. **Access the Application**

   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:5000/api

---

### Dockerized Setup (Backend + Frontend)

1. **Build and Run Containers**

   In the project root, run:

   ```bash
   docker-compose up --build
   ```

2. **Access the Application**

   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000/api

---

### Running in Dockerized Mode

- **Build and Start Services**:

  ```bash
  docker-compose up --build
  ```

- **Stop Containers**:

  ```bash
  docker-compose down
  ```