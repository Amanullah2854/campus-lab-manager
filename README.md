# Campus Lab Manager

A modern, responsive web application designed for managing and monitoring college computer laboratories, departmental workstation inventories, student enrollments, practical timetables, and hardware maintenance tickets.

---

## 📖 Overview

**Campus Lab Manager** provides lab administrators, faculty members, and lab assistants with a unified portal to oversee computer laboratory operations. The system centralizes hardware telemetry, active student allocations, classroom scheduling, and equipment repair tracking with immediate visual feedback, dynamic search/filtering, and local persistence.

---

## ✨ Features

- **📊 Comprehensive Telemetry Dashboard**
  - High-level metric cards for total workstations, available seats, active practical sessions, and pending maintenance tickets.
  - Interactive status distribution progress bar displaying fleet allocation percentages.
  - Chronological live activity feed recording system events, terminal assignments, and repair updates.
  - Laboratory room capacity indicators and quick action navigation tiles.

- **🖥️ Workstation & Computer Management (Full CRUD)**
  - Manage terminal hardware profiles: Computer ID, Assigned Lab, Processor, RAM, Storage, Operating System, and Status (`Available`, `In Use`, `Maintenance`).
  - Search across IDs, specs, and labs; filter by operational status.
  - Add and Edit workstation modal with comprehensive field validation.
  - Safe deletion workflow requiring explicit confirmation via confirmation modal.

- **👨‍🎓 Student Lab Directory (Full CRUD)**
  - Track student enrollments with Student ID, Full Name, Department (`CSE`, `AI & DS`, `IT`, `Cyber Security`), Academic Year, Institutional Email, and Contact Phone.
  - Search by name, roll number, or email; filter by department.
  - Add and Edit student records with email format verification and required field validation.
  - Safe deletion with prompt dialog.

- **📅 Lab Session & Practical Timetable (Full CRUD)**
  - Schedule course practicals with Subject, Department, Target Batch, Lab Room, Faculty Instructor, Date, and Time blocks.
  - Enforces chronological time constraint validation (`endTime > startTime`).
  - Filter timetables by academic department and laboratory room.
  - Edit or cancel practical slots with confirmation safeguards.

- **🔧 Maintenance & Hardware Issue Tracking (Full CRUD)**
  - Report defects and diagnostics: Workstation ID (synchronized with inventory), Lab Room, Issue Summary, Detailed Symptoms, Reporter, Date, Priority (`Low`, `Medium`, `High`), and Ticket Status (`Reported`, `In Progress`, `Resolved`).
  - **Automatic Resolution Date**: Auto-records the timestamp when marked as `Resolved` and clears it when re-opened.
  - In-row status switcher for rapid triage.
  - Multi-criteria filtering by ticket status and priority level.

- **🔔 Unified Toast Notification System**
  - Context-driven floating notification banners providing clear feedback across all create, update, and delete actions.

- **📱 Fully Responsive Design**
  - Optimized for desktop, laptop, tablet, and mobile viewports with horizontal table scroll wrappers, responsive forms, and collapsible sidebar drawer.

---

## 🛠️ Technology Stack

- **Frontend Framework:** [React 18](https://react.dev/)
- **Build Tool & Dev Server:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router DOM v6](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** `clsx` and `tailwind-merge`
- **State Management & Persistence:** React Context API + Browser `LocalStorage`

---

## 📂 Project Structure

```
campus-lab-manager/
├── public/
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI primitives (Button, Card, Badge, StatCard, ConfirmDialog)
│   │   ├── computers/          # Computer table and Add/Edit modal components
│   │   ├── dashboard/          # ActivityList, StatusOverview, and QuickActions widgets
│   │   ├── layout/             # MainLayout, Sidebar navigation drawer, Header
│   │   ├── maintenance/        # Maintenance table and ticket reporting modal
│   │   ├── sessions/           # Practical session timetable and scheduling modal
│   │   └── students/           # Student directory table and enrollment modal
│   ├── context/
│   │   ├── ComputerContext.jsx # Computer inventory state and LocalStorage sync
│   │   ├── MaintenanceContext.jsx # Maintenance tickets state and resolution logic
│   │   ├── SessionContext.jsx  # Practical sessions timetable state
│   │   ├── StudentContext.jsx  # Student directory state
│   │   └── ToastContext.jsx    # Application-wide toast notifications
│   ├── data/
│   │   └── mockData.js         # Comprehensive initial seed records for all modules
│   ├── pages/
│   │   ├── Computers.jsx       # Computer Management page
│   │   ├── Dashboard.jsx       # Main Dashboard Overview page
│   │   ├── LabSessions.jsx     # Lab Session Timetable page
│   │   ├── Maintenance.jsx     # Maintenance Issue Management page
│   │   └── Students.jsx        # Student Management page
│   ├── utils/
│   │   └── cn.js               # Class merge helper utility
│   ├── App.jsx                 # Provider wrappers and route hierarchy
│   ├── index.css               # Tailwind directives and custom scrollbar styles
│   └── main.jsx                # Application root mount point
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

Follow these steps to run the application locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/campus-lab-manager.git
cd campus-lab-manager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

The application will start immediately. Open your browser and navigate to:
```
http://localhost:5173/
```

---

## 📦 Production Build

To build the application for production deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🧩 Application Modules

| Module | Description | Key Capabilities |
| :--- | :--- | :--- |
| **Dashboard** | Central operations hub | Fleet overview, status breakdown progress bar, recent events, quick actions. |
| **Computers** | Hardware inventory | Workstation specs, lab assignments, terminal status tracking, Add/Edit/Delete. |
| **Students** | Student directory | Roll numbers, department allocations, institutional emails, contact details. |
| **Lab Sessions** | Timetable scheduling | Course practicals, date/time blocks, faculty supervisors, room allocation. |
| **Maintenance** | Hardware repair queue | Ticket triage, defect diagnostics, priority management, automatic resolution dates. |

---

## 🔮 Future Improvements

The following features represent potential enhancements for future production iterations:

- **Backend & Database Integration:** Connecting RESTful / GraphQL APIs with PostgreSQL or MongoDB for persistent server-side storage.
- **Authentication & Role-Based Access Control (RBAC):** Secure login portals for Students, Faculty Instructors, and Lab Administrators.
- **Live IoT & Telemetry Sensors:** Automated workstation pinging and live seat occupancy detection via network probes.
- **Automated Alerts & Notifications:** Automated email and SMS alerts for upcoming lab sessions and resolved maintenance tickets.
- **Analytics & Utilization Reports:** Exportable PDF and CSV reports on laboratory room utilization and hardware reliability metrics.

---

## 👤 Author

**Muhammed Mishal**
