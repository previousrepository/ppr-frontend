# 📚 Previous Project Repository (PPR)

The **Previous Project Repository (PPR)** is a web-based platform designed for **Federal University Birnin Kebbi (FUBK)** students and lecturers to manage, share, and access academic project works.  
It aims to serve as a centralized digital library of past projects, improving accessibility, transparency, and collaboration.


## 🚀 Features

- 🔑 **Authentication & Role Management**
  - Student & Lecturer accounts using FUBK email verification.
  - Role-based access control.

- 📝 **Project Submission**
  - Students can upload and manage their projects.
  - Draft and resubmission support.

- 👨‍🏫 **Lecturer Review**
  - Lecturers can review, approve, or reject student submissions.
  - Rejection reasons & activity logs maintained.

- 📂 **Access Requests**
  - Students can request access to their department restricted projects.
  - Lecturers review and approve/reject requests.

- 🔍 **Search & Explore**
  - Guests can browse public projects.

- 📊 **Activity Logs**
  - Track project and access request actions.
  - Lecturer-specific departmental tracking.

---

## 🛠️ Tech Stack

**Frontend**
- React (with Vite)
- TailwindCSS
- Axios for API requests
- Framer Motion (animations)

**Backend**
- Node.js + Express.js
- Firebase Admin SDK
- Cloudinary (file uploads)

**Database**
- Firebase Firestore (NoSQL)

**Authentication**
- Firebase Authentication + Custom Claims

---

## 📂 Project Structure (High-Level)

ppr-frontend/
├── src/
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── layouts/ # Page layouts
│ ├── pages/ # Route pages (Profile, Projects, etc.)
| |-- libs/ # firebase config
| |-- route/# Router Dom
│ ├── services/ # API calls 
│ └── context/ # Auth & Role context

ppr-backend/
├── src/
│ ├── routes/ # Express routes
│ ├── controllers/ # Request handlers
│ ├── middlewares/ # Auth & validation
│ └── utils/ # Helpers

🧑‍🤝‍🧑 Roles

- Guest → Can explore public projects only.

- Student → Submit projects, request access, view drafts.

- Lecturer → Review submissions, approve/reject requests, track logs.