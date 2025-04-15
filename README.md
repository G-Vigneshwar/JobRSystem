# Job Recruitment System

A full-stack web application for job recruitment with features for both employers and applicants.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Project Structure
```
JRSFINAL/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── employer/
│   │   │   ├── applicant/
│   │   │   ├── common/
│   │   │   └── layout/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js
│   ├── package.json
│   └── .env
├── JRSDB.sql              # Database creation and structure
├── ManageQueries.sql      # SQL queries for operations
└── README.md
```

## Step-by-Step Setup Guide

### 1. Database Setup

1. Open MySQL command line or MySQL Workbench
2. Execute the SQL files in this order:
```bash
# First run JRSDB.sql to create database and tables
mysql -u root -p < JRSDB.sql

# If you want to see the available queries for operations
cat ManageQueries.sql
```

### 2. Backend Setup

1. Navigate to server directory and install dependencies:
```bash
cd server
npm install express mysql2 cors body-parser dotenv
```

2. Create .env file in server directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=job_recruitment
PORT=3001
```

3. Start the server:
```bash
node index.js
```

The backend server should now be running on http://localhost:3001

### 3. Frontend Setup

1. Navigate to client directory and install dependencies:
```bash
cd client
npm install react-router-dom @tailwindcss/forms axios
npm install -D tailwindcss postcss autoprefixer
```

2. Initialize Tailwind CSS:
```bash
npx tailwindcss init -p
```

3. Add to tailwind.config.js:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

4. Start the React development server:
```bash
npm start
```

The frontend should now be running on http://localhost:3000

## Running the Complete Application

1. Start MySQL server (if not already running)

2. Start backend server:
```bash
cd server
node index.js
```

3. In a new terminal, start frontend:
```bash
cd client
npm start
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Available Features

### Employer Dashboard
- Post new jobs
- View posted jobs
- Manage applications
- View and filter candidates

### Applicant Dashboard
- Search for jobs
- Apply to jobs
- View application status
- Update profile and skills

## Troubleshooting

If you encounter connection issues:

1. Check if MySQL is running:
```bash
mysql --version
```

2. Verify backend is running:
```bash
curl http://localhost:3001/api/test
```

3. Check database connection:
```bash
mysql -u root -p
use job_recruitment;
show tables;
```

4. Common errors and solutions:
- "Port already in use": Kill the process using the port
  ```bash
  lsof -i :3001
  kill -9 <PID>
  ```
- "Cannot connect to database": Check MySQL credentials in .env file
- "Module not found": Make sure you've installed all dependencies
  ```bash
  cd server && npm install
  cd client && npm install
  ```

## API Routes

Your backend supports these main routes:
- GET /api/employer/jobs/:adminId
- POST /api/employer/jobs
- GET /api/jobs/search
- POST /api/applications
- GET /api/applicant/applications/:applicantId
- GET /api/applicant/profile/:applicantId
- PUT /api/applicant/profile/:applicantId

(All routes are documented in ManageQueries.sql)