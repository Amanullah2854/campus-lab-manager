<<<<<<< HEAD
# Campus Lab Manager 🖥️⚡

A modern web application designed for managing college computer laboratories, student session logs, workstation telemetry, and equipment maintenance.

## Day 1: Project Foundation Overview

Day 1 establishes the core architecture, visual design system, and responsive routing foundation:
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with an academic/technology theme (slate, deep navy, cyan, indigo, emerald)
- **Icons**: Lucide React
- **Routing**: React Router v6 with responsive layout wrapper

### Directory Structure
```
campus-lab-manager/
├── public/
├── src/
│   ├── components/
│   │   ├── common/         # Reusable UI primitives (Badge, Button, Card, StatCard)
│   │   └── layout/         # Shell components (Header, Sidebar, MainLayout)
│   ├── data/               # Mock data for lab telemetry, PCs, sessions, students
│   ├── pages/              # Route views (Dashboard, Computers, Students, LabSessions, Maintenance)
│   ├── utils/              # Utility helpers (cn class merger)
│   ├── App.jsx             # Route definitions
│   ├── index.css           # Tailwind configuration & global styles
│   └── main.jsx            # React root mount point
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
=======
# 🔬 Campus Resource & Lab Equipment Manager
A single-page web portal designed to manage university lab equipment and bookings.

## 🛠️ Features
* Equipment Catalog & Department Filters
* Real-time Status Badges (Available, Booked, Maintenance)
* Booking & Return Workflow
* Persistent State using Browser LocalStorage

## 💻 Tech Stack
* HTML5 / JavaScript (ES6+)
* Tailwind CSS
* Built using Google Antigravity
>>>>>>> 3625d4076468b9f52552a849c8d6e6a2542b7c1e
