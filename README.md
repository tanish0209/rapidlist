# RapidList

RapidList is a full-stack personal task management application that helps users create, manage, filter, and track tasks with real-time updates and authentication.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS  
- **Backend:** Next.js API Routes  
- **Database:** PostgreSQL (Neon)  
- **ORM:** Prisma  
- **Authentication:** NextAuth (Credentials Provider)  
- **Deployment:** Vercel  

---

## Features

- User authentication (register & login)
- Create, update, delete tasks
- Task status and priority management
- Due date tracking
- Search by title and description
- Filter by status and priority
- Sort tasks by due date
- Editable task details via sidebar
- Fully responsive UI

---

## Setup Instructions

### 1. Clone the Repository
- git clone https://github.com/tanish0209/rapidlist.git
- cd rapidlist

### 2. Install Dependencies
- npm install

### 3. Setup Database & Prisma
- npx prisma generate
- npx prisma db push

### 4. Run Application 
- npm run dev
