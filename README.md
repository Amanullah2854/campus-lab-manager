# 🧪 Campus Lab Manager

A modern responsive web application for managing a college computer laboratory.

## 🌐 Live Demo

[https://campus-lab-manager.onrender.com/](https://campus-lab-manager.onrender.com/)

## 📦 GitHub Repository

[https://github.com/Amanullah2854/campus-lab-manager](https://github.com/Amanullah2854/campus-lab-manager)

## 📖 Overview

Campus Lab Manager is a web-based application designed to simplify the management of college computer laboratories. It provides a centralized interface for managing computers, students, laboratory sessions, and maintenance records.

## ✨ Features

### 📊 Dashboard
- Overview of laboratory statistics
- Total computers
- Available computers
- Computers in use
- Computers under maintenance
- Recent activity

### 🖥️ Computer Management
- View computers
- Add computers
- Edit computers
- Delete computers
- Search computers
- Filter by status
- Track computer availability

### 👨‍🎓 Student Management
- View students
- Add students
- Edit students
- Delete students
- Search students
- Student information management

### 📅 Lab Session Management
- Schedule lab sessions
- Edit sessions
- Delete sessions
- Search and filter sessions
- Manage lab, subject, instructor, date, and time

### 🔧 Maintenance Management
- Report computer issues
- Track maintenance records
- Edit maintenance records
- Delete maintenance records
- Search maintenance records
- Filter by status and priority
- Mark issues as resolved

### 📱 Responsive Design
- Desktop support
- Tablet support
- Mobile-friendly interface

### ✅ Validation & UX
- Form validation
- Delete confirmation dialogs
- Empty states
- User feedback
- Consistent UI

## 🛠️ Technology Stack

- **React** (v18.3.1) - Component-based UI library
- **Vite** (v6.0.1) - Build tool and development server
- **JavaScript** (ES6+) - Core application logic
- **CSS / Tailwind CSS** (v3.4.17) - Utility-first styling framework
- **React Router** (v6.28.0) - Client-side declarative routing
- **Lucide React** (v0.468.0) - UI iconography

## 📁 Project Structure

```
campus-lab-manager/
├── public/
├── src/
│   ├── components/
│   │   ├── common/         # Reusable UI primitives (Button, Card, Badge, StatCard, ConfirmDialog)
│   │   ├── computers/      # Workstation table and Add/Edit modal components
│   │   ├── dashboard/      # StatusOverview, ActivityList, and QuickActions widgets
│   │   ├── layout/         # MainLayout, Sidebar navigation drawer, and Header
│   │   ├── maintenance/    # Maintenance table and issue reporting modal
│   │   ├── sessions/       # Timetable grid and session booking modal
│   │   └── students/       # Student table and enrollment modal
│   ├── context/            # React Context state providers (Computers, Students, Sessions, Maintenance, Toast)
│   ├── data/               # Seed datasets and mock records (mockData.js)
│   ├── pages/              # Route view pages (Dashboard, Computers, Students, LabSessions, Maintenance)
│   ├── utils/              # Utility helpers (cn.js class merger)
│   ├── App.jsx             # Root provider tree and route configuration
│   ├── index.css           # Tailwind CSS directives and global styles
│   └── main.jsx            # Application entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Amanullah2854/campus-lab-manager.git
```

Enter the project directory:

```bash
cd campus-lab-manager
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite (typically `http://localhost:5173/`).

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

## 🌐 Deployment

The application is deployed using Render.

Live application:

[https://campus-lab-manager.onrender.com/](https://campus-lab-manager.onrender.com/)

## 📅 Development Timeline

### Day 1
Project foundation and application structure.

### Day 2
Dashboard and navigation.

### Day 3
Computer Management CRUD.

### Day 4
Student and Lab Session Management.

### Day 5
Maintenance Management.

### Day 6
UI polish, validation, responsiveness, and bug fixes.

### Day 7
Final testing, cleanup, and documentation.

## 🔮 Future Improvements

Possible future improvements:

- Backend and database integration
- User authentication
- Role-based access control
- Real-time computer availability
- Advanced reports and analytics
- Email notifications
- Lab usage statistics
- Admin management
