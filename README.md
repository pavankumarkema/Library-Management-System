# Library Management System

A modern, role-based Library Management System built for academic and real-world evaluation. It provides a clean UI, responsive layouts, and a complete book request workflow with admin approvals and local persistence.

## Purpose

This project demonstrates a full front-end application with role-based access, state management, and a complete library workflow using dummy authentication. It is designed to showcase UI/UX quality, data handling, and responsive design principles for college evaluation.

## Features

### Authentication & Roles
- Dummy login with **member** and **admin** roles
- Protected routes for authenticated users
- Admin-only access to the admin dashboard
- Persistent login via localStorage/sessionStorage

### Library Workflow
- Browse books and request issuance
- Admin approves or rejects requests
- Issued books appear in My Books
- Return books with one click

### Admin Capabilities
- Issue books directly to users
- Approve/reject pending requests
- Add and delete books
- View all issued books

### UI/UX & Responsiveness
- Clean, modern styling with consistent spacing, typography, and colors
- Responsive layouts for mobile, tablet, and desktop
- Smooth hover and page-load animations
- Accessible labels and readable contrast

### Book Covers
- Unique, realistic cover visuals generated per book
- Uniform aspect ratio, `object-fit: cover`
- Fallback cover for missing images

## Tech Stack

- **Frontend:** React (Create React App)
- **Routing:** React Router v6
- **State Management:** Context API
- **Styling:** CSS3 (modern gradients, animations, responsive breakpoints)
- **Persistence:** localStorage / sessionStorage

## Project Structure

```
Library_Management_System/
├─ client/
│  ├─ public/
│  └─ src/
│     ├─ assets/            # SVG cover assets
│     ├─ components/        # Navbar, Footer, Route guards
│     ├─ context/           # AuthContext
│     ├─ pages/             # All app pages
│     ├─ services/          # bookService, issueService, authService
│     └─ utils/             # bookCovers helper
└─ server/                  # Optional backend scaffolding (not used)
```

## Setup & Run

### Prerequisites
- Node.js (16+ recommended)
- npm (or yarn)

### Install & Start
```bash
cd client
npm install
npm start
```

The app will run at http://localhost:3000

## Demo Credentials

**Member**
- Email: `demo@libratech.com`
- Password: `LibraTech#2026!`

**Admin**
- Email: `admin@libratech.com`
- Password: `Admin#2026!`

## Usage Guide

1. **Login** using member/admin credentials
2. **Browse Books** and request a title
3. **Admin** approves or rejects requests
4. **My Books** shows issued, pending, and returned entries
5. **Admin Dashboard** manages books and requests

## Data Storage

All data is stored locally in the browser (localStorage/sessionStorage). No backend is required for the demo.

## Accessibility & Quality Notes

- Semantic HTML and labeled form controls
- Consistent CTA styling and focus-visible outlines
- Responsive layouts using CSS Grid/Flexbox

## Future Improvements

- Connect to a real backend (Node/Express + MongoDB)
- Role-based analytics and reporting
- Search, filter, and pagination for large catalogs
- Email reminders for due dates
- Upload real book cover images
- Improve admin audit logs

## License

This project is intended for academic and demonstration purposes.
# Library-Management-System
