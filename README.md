# Lost & Found Management System
A full-stack Lost & Found system where students can report lost items and staff can verify and approve them. Users can search and claim items, while staff manage the entire workflow.

## Features
- User authentication (JWT + bcrypt)
- Role-based access (Student / Staff)
- Report lost items with image upload
- Staff approval system (approve / reject)
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
   npm start

5. Start frontend:
   npm run dev

## Authors

- Devesh Gawas — Main frontend structure and full backend development  
- Swapnil Hadage — Frontend enhancements
