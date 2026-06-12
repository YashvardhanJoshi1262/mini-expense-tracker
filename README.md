# Mini Expense Tracker

## Project Title & Brief Description

I chose Exercise 2: Mini Expense Tracker. This is a full-stack expense management application built using React and Express.js. The application allows users to add, edit, delete, search, and filter expenses. It also provides expense analytics such as monthly spending summaries, category-wise breakdowns, budget tracking, CSV export functionality, and data visualization through charts. The project demonstrates frontend-backend integration, REST API development, data persistence, and cloud deployment.

---

## Live Demo Links

Frontend (Vercel):
https://mini-expense-tracker-kappa.vercel.app

Backend API (Render):
https://mini-expense-tracker-api-l3hn.onrender.com

Health Check Endpoint:
https://mini-expense-tracker-api-l3hn.onrender.com/api/health

---

## Tech Stack

### Frontend

- React.js
- Axios
- Recharts
- CSS

### Backend

- Node.js
- Express.js
- UUID

### Deployment

- Vercel (Frontend Hosting)
- Render (Backend Hosting)

### Why These Technologies?

- React provides component-based UI development.
- Axios simplifies HTTP requests between frontend and backend.
- Express enables creation of REST APIs.
- Recharts provides interactive data visualization.
- UUID generates unique identifiers for expenses.
- Vercel and Render provide easy cloud deployment.

---

## How to Run Locally

### Prerequisites

- Node.js installed

### Clone Repository

```bash
git clone https://github.com/YashvardhanJoshi1262/mini-expense-tracker.git
cd mini-expense-tracker
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Documentation

### Health Check

#### GET

```http
/api/health
```

Response:

```json
{
  "success": true,
  "message": "Expense Tracker API Running"
}
```

---

### Get All Expenses

#### GET

```http
/api/expenses
```

Response:

```json
[
  {
    "id": "123",
    "amount": 100,
    "category": "Food",
    "date": "2026-06-13",
    "note": "Lunch"
  }
]
```

---

### Create Expense

#### POST

```http
/api/expenses
```

Request Body:

```json
{
  "amount": 100,
  "category": "Food",
  "date": "2026-06-13",
  "note": "Lunch"
}
```

Response:

```json
{
  "id": "123",
  "amount": 100,
  "category": "Food",
  "date": "2026-06-13",
  "note": "Lunch"
}
```

---

### Update Expense

#### PUT

```http
/api/expenses/:id
```

Request Body:

```json
{
  "amount": 150,
  "category": "Food",
  "date": "2026-06-13",
  "note": "Updated Lunch"
}
```

Response:

```json
{
  "message": "Expense updated successfully"
}
```

---

### Delete Expense

#### DELETE

```http
/api/expenses/:id
```

Response:

```json
{
  "message": "Expense deleted successfully"
}
```

---

## Project Structure

```text
mini-expense-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseCard.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ExpenseChart.jsx
│   │   │   └── SummaryCard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── data/
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

### Folder Responsibilities

- components/ → UI components
- routes/ → API route definitions
- controllers/ → Request handling logic
- services/ → Business logic and file operations
- data/ → JSON-based data storage

---

## Features Implemented

- Add Expense
- Edit Expense
- Delete Expense
- Search Expenses
- Category Filtering
- Date Filtering
- Monthly Expense Summary
- Category Breakdown
- Expense Visualization Chart
- Budget Tracking
- CSV Export
- Responsive UI
- JSON Data Persistence
- Cloud Deployment

---

## Next Steps

Features intentionally left for future enhancement:

- SQLite or PostgreSQL database integration
- User authentication and login
- Multiple user accounts
- Expense attachments/receipts
- PDF report generation
- Advanced analytics dashboard
- ServiceNow-style approval workflows
- Email notifications
- Dark/Light theme switcher

---

## Author

Yashvardhan Joshi

GitHub:
https://github.com/YashvardhanJoshi1262
