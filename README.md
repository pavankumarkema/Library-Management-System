<div align="center">

# 📚 Library Management System

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-Academic-green.svg)]()

A modern, role-based Library Management System built for academic and real-world evaluation. It provides a clean UI, responsive layouts, and a complete book request workflow with admin approvals and local persistence.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Setup](#-setup--run) • [Demo Credentials](#-demo-credentials) • [Usage](#-usage-guide)

</div>

---

## 📋 Table of Contents

- [Purpose](#-purpose)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Run](#-setup--run)
- [Demo Credentials](#-demo-credentials)
- [Usage Guide](#-usage-guide)
- [Data Storage](#-data-storage)
- [Accessibility & Quality](#-accessibility--quality-notes)
- [Responsive Design Documentation](#-responsive-design-documentation)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Purpose

This project demonstrates a full front-end application with role-based access, state management, and a complete library workflow using dummy authentication. It is designed to showcase UI/UX quality, data handling, and responsive design principles for college evaluation.

## ✨ Features

### 🔐 Authentication & Roles
- Dummy login with **member** and **admin** roles
- Protected routes for authenticated users
- Admin-only access to the admin dashboard
- Persistent login via localStorage/sessionStorage

### 📖 Library Workflow
- Browse books and request issuance
- Admin approves or rejects requests
- Issued books appear in My Books
- Return books with one click

### 👨‍💼 Admin Capabilities
- Issue books directly to users
- Approve/reject pending requests
- Add and delete books
- View all issued books

### 🎨 UI/UX & Responsiveness
- Clean, modern styling with consistent spacing, typography, and colors
- **Fully responsive layouts**: Mobile (320px+), Tablet (768px+), Desktop (1024px+), Large Desktop (1280px+)
- **Mobile-first design approach**: Base styles optimized for mobile, enhanced at larger breakpoints
- **Responsive navigation**: Hamburger menu on mobile with smooth CSS animations, full horizontal nav on tablet+
- **Flexible grids & forms**: All layouts use Flexbox and CSS Grid with proper scaling
- **Touch-friendly interface**: 44px minimum touch targets, proper spacing for mobile usability
- **Smooth hover and page-load animations**
- **Accessible labels and readable contrast**
- **Hamburger menu with CSS animations**: Rotate and opacity effects for visual feedback
- **Book cards with responsive sizing**: Maintains 2:3 aspect ratio, adapts to screen width

### 🖼️ Book Covers
- Unique, realistic cover visuals generated per book
- Uniform aspect ratio, `object-fit: cover`
- Fallback cover for missing images

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18 (Create React App) |
| **Routing** | React Router v6 |
| **State Management** | Context API (AuthContext) |
| **Styling** | CSS3 (Gradients, Animations, Flexbox, Grid) |
| *📁 Project Structure

```
Library_Management_System/
├─ client/
│  ├─ public/
│  │  └─ index.html
│  ├─ src/
│  │  ├─ assets/               # SVG cover assets
│  │  ├─ components/           # Reusable components
│  │  │  ├─ Navbar.jsx         # Global navigation
│  │  │  ├─ Footer.jsx         # Site footer
│  │  │  ├─ ProtectedRoute.jsx # Auth guard
│  │  │  └─ AdminRoute.jsx     # Admin guard
│  │  ├─ context/              # Global state
│  │  │  └─ AuthContext.jsx    # Authentication context
│  🚀 Setup & Run

### Prerequisites
- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Library_Management_System.git
   cd Library_Management_System
   ```

2. **Navigate to client directory**
   🔑 Demo Credentials

### Member Account
| Field | Value |
|-------|-------|
| **Email** | `demo@libratech.com` |
| **Password** | `LibraTech#2026!` |
| **Access** | Browse books, request books, view My Books, profile |

### Admin Account
| F📖 Usage Guide

### For Members

1. **Login** using the member credentials above
2. Navigate to **Books** page to browse the catalog
3. Click **Request** on any available book
4. Fill in the **Issue Book** form with your due date
5. View your requests in **My Books** (status: pending/issued/rejected)
6. Once approved, you can **Return** books from My Books
7. Check **Profile** for your stats and quick actions
💾 Data Storage

All data is stored locally in the browser:
- **localStorage**: Stores books, issues, and user data persistently
- *♿ Accessibility & Quality Notes

- ✅ **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<footer>`, `<section>` tags
- ✅ **Form Labels**: All inputs have associated labels for screen readers
- ✅ **Focus Indicators**: Clear `:focus-visible` outlines on interactive elements
- ✅ **Responsive Design**: Mobile-first approach with 8+ breakpoints (320px, 480px, 600px, 768px, 900px, 1024px, 1280px, 1440px+)
  - **Hamburger Menu**: Responsive navigation with CSS animations on mobile, full nav on tablet+
  - **Fluid Grids**: Using `minmax(min(Xpx, 100%), 1fr)` for automatic scaling without horizontal scroll
  - **Touch Optimization**: 44px minimum button/touch target sizes, 16px input font-size (iOS zoom prevention)
  - **Device Coverage**: iPhone SE (375px) → large desktop (1440px+), all orientations
  - **Touch Device Media Queries**: Disabled hover transforms, enabled active/press feedback
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion` for accessibility
- ✅ **Color Contrast**: WCAG AA compliant text contrast ratios
- ✅ **Keyboard Navigation**: Full keyboard support for all interactions
- ✅ **WCAG Touch Target**: All interactive elements meet 44x44px minimum size requirementove
2. Go to **Admin Dashboard**
3. View **Pending Requests** and approve/reject them
4. Use **Issue Book Directly** to bypass approval workflow
5. **Add New Books** to the catalog
6. **Delete Books** from the system
7. View **All Issued Books** across all user
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

The app will automatically reload when you make changes to the code.agement
│  │  │  └─ issueService.js    # Issue workflow
│  │  ├─ utils/                # Helpers
│  │  │  ├─ axiosInstance.js   # API config
│  │  │  └─ bookCovers.js      # SVG cover generator
│  │  ├─ App.jsx               # Root component
│  │  ├─ App.css               # Global styles
│  │  └─ index.js              # Entry point
│  └─ package.json
└─ server/                      # Backend scaffolding (not used in demo)
   ├─ config/
   ├─ controllers/
   ├─ middleware/
   ├─ models/
   🚧 Future Improvements

- [ ] **Backend Integration**: Connect to Node.js/Express + MongoDB
- [ ] **Real Authentication**: JWT tokens with secure password hashing
- [ ] **Advanced Search**: Filter by category, author, availability
- [ ] **Pagination**: Handle large book catalogs efficiently
- [ ] **Analytics Dashboard**: Borrowing trends, popular books, overdue reports
- [ ] **Email Notifications**: Due date reminders, approval status updates
- [ ] **Image Uploads**: Upload real book cover images
- [ ] **Audit Logs**: Track all admin actions with timestamps
- [ ] **Book Reviews**: Allow members to rate and review books
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Export Reports**: PDF/CSV exports for admin reports
- [ ] **Multi-language Support**: i18n for global accessibility

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

## 📱 Responsive Design Documentation

This project includes comprehensive responsive design documentation. Refer to these files for detailed information:

### 📄 Documentation Files

1. **[RESPONSIVE_DESIGN_SUMMARY.md](RESPONSIVE_DESIGN_SUMMARY.md)**
   - Overview of responsive improvements
   - Device coverage and breakpoint strategy
   - Key features implemented (hamburger menu, fluid grids, touch optimization)
   - Build verification and deployment readiness
   - ✅ **Start here for a quick overview**

2. **[RESPONSIVE_DESIGN_CHECKLIST.md](RESPONSIVE_DESIGN_CHECKLIST.md)**
   - Comprehensive validation checklist
   - Detailed breakpoint behavior for each component
   - Touch optimization specifications
   - Accessibility verification items
   - Testing checklist for all devices
   - ✅ **Use this to verify responsiveness**

3. **[RESPONSIVE_TECHNIQUES_REFERENCE.md](RESPONSIVE_TECHNIQUES_REFERENCE.md)**
   - Specific CSS patterns and techniques used
   - Mobile-first approach explanation
   - Grid and Flexbox patterns
   - Touch device optimization code
   - Accessibility media queries
   - ✅ **Reference for understanding the CSS implementation**

4. **[RESPONSIVE_TESTING_GUIDE.md](RESPONSIVE_TESTING_GUIDE.md)**
   - Step-by-step testing procedures
   - Device widths to test
   - Feature-by-feature testing checklist
   - Accessibility testing guide
   - Common issues to check for
   - Debugging tips and console commands
   - ✅ **Follow this to test on your devices**

### 🎯 Quick Responsive Facts

- **Breakpoints**: 320px, 480px, 600px, 768px, 900px, 1024px, 1280px, 1440px+
- **Mobile-First**: Base styles for 320px, enhanced at larger breakpoints
- **Hamburger Menu**: Visible on mobile (< 768px), hidden on tablet+ (≥ 768px)
- **Touch Targets**: All buttons and interactive elements minimum 44x44px
- **Form Inputs**: 16px font-size (prevents iOS auto-zoom)
- **No Horizontal Scroll**: All layouts constrained to viewport width
- **Device Coverage**: iPhone SE (375px) → 4K displays (2560px+)

### 🚀 To Test Responsiveness

1. **Start the development server**:
   ```bash
   cd client
   npm run dev
   ```

2. **Open browser DevTools** (F12)

3. **Toggle Device Toolbar** (Ctrl+Shift+M or Cmd+Shift+M)

4. **Test at these widths**:
   - 320px (iPhone SE)
   - 375px (iPhone 11)
   - 768px (iPad - hamburger toggle point)
   - 1024px (iPad landscape)
   - 1280px (Desktop)

5. **Verify checklist items** in RESPONSIVE_TESTING_GUIDE.md

### 📊 Responsive Components

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| **Navbar** | Hamburger ☰ | Hamburger ☰ | Full nav |
| **Books Grid** | 1-2 cols | 2-3 cols | 4-5 cols |
| **Admin Panel** | 1 col | 1-2 cols | 2-3 cols |
| **Forms** | 100% width | Max 420px | Max 650px |
| **Profile** | Stacked | 2 cols | 3 cols |
| **Dashboard** | Column | 2 cols | 3 cols |

---

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
