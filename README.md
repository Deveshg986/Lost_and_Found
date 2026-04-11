# Lost & Found Management System
A full-stack Lost & Found system where students can report lost items and staff can verify and approve them. Users can search and claim items, while staff manage the entire workflow.

## Features
- User authentication (JWT + bcrypt)
- Role-based access (Student / Staff)
- Report lost items with image upload
- Staff approval system (approve / reject)
- search items 
- View approved items
- Search items
- Claim request system (in progress)
- Delete items after claim

## Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MySQL
- Authentication: JWT
- File Upload: Multer

- ## Setup Instructions
1. Clone the repository
2. Install dependencies:
   npm install

3. Create a .env file and add:
   PORT=
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   JWT_SECRET=

4. Start backend:
   node server.js

5. Start frontend:
   npm run dev

## Authors

- Devesh Gawas — main frontend structure and full backend development  
- Swapnil Hadage — Desgined and Implemented optimized frontend architecture using react
                 — Integrated Redux Toolkit(RTK)
                 — Refactored initial UI components for performance and maintainability
                 — Improved code Structure, reusability amd responsiveness
                 — Added new features and improved overall user experience
