# Aarambh Institute API Documentation

Comprehensive technical documentation of the current Frontend and Backend API architecture, endpoints, database mappings, authentication mechanisms, known limitations, and implementation status for the Aarambh Institute platform.

---

## 1. Base URLs / Environment

### Backend Server
- **Runtime / Framework:** Node.js, Express.js
- **Default Port:** `process.env.PORT || 5000` (`http://localhost:5000`)
- **API Base Prefix:** `/api`
- **Static Assets:** `/uploads` mapped to `backend/uploads` (serves uploaded course thumbnails, PDF study materials, etc.)
- **CORS Configuration:** `app.use(cors())` enabled globally across all routes.
- **Environment Variables Required:**
  - `PORT`: Server listening port (default: `5000`)
  - `DB_HOST`: MySQL host address (e.g., `localhost`)
  - `DB_PORT`: MySQL port (e.g., `3306` or `3307`)
  - `DB_USER`: Database username
  - `DB_PASSWORD`: Database password
  - `DB_NAME`: Database schema name (`aarambh_db`)
  - `JWT_SECRET`: Cryptographic secret for signing and verifying JSON Web Tokens
  - `EMAIL_HOST`: SMTP host for Nodemailer (default fallback: `smtp.hostinger.com`)
  - `EMAIL_PORT`: SMTP port (default fallback: `587`)
  - `EMAIL_USER`: SMTP username
  - `EMAIL_PASS`: SMTP password
  - `RAZORPAY_KEY_ID`: Razorpay public API key
  - `RAZORPAY_KEY_SECRET`: Razorpay secret key

### Frontend Client
- **Runtime / Build:** React 18, Vite
- **Development Server Proxy:** Configured in `frontend/vite.config.js` to proxy `/api` requests to `http://localhost:5000`
- **Axios HTTP Client:** Instantiated in `frontend/src/services/api.js` with `baseURL: '/api'`
- **Direct HTTP Calls:** Certain pages (`ContactForm`, `ContactUs`, `PopupForm`, `Masterclass`, `Login`, `Register`, `ForgotPassword`, `BlogList`, `BlogSingle`) make direct browser `fetch()` calls. Note: Blog pages directly reference hardcoded `http://localhost:5000/api/...`.
- **Environment Configuration:** `frontend/.env` defines `VITE_API_BASE_URL=http://localhost:5000/api`, but this variable is currently not consumed in the source code (`api.js` hardcodes `baseURL: '/api'`).

---

## 2. Authentication & Roles

### Authentication Mechanism
- **Format:** JSON Web Token (JWT) transmitted via HTTP header:
  ```http
  Authorization: Bearer <jwt_token>
  ```
- **Token Generation:** Handled by `authController.login` using `jwt.sign()` with `expiresIn: '24h'`.
- **Token Payload:**
  ```json
  {
    "id": 1,
    "email": "user@example.com",
    "full_name": "Full Name",
    "role": "student",
    "session_token": "<32_byte_random_hex>"
  }
  ```
- **Single Device Login Enforcement:**
  - On every successful login, a cryptographically random 32-byte hex string is generated (`crypto.randomBytes(32).toString('hex')`) and persisted to `users.session_token`.
  - When requests pass through `authMiddleware.protect`, the decoded JWT's `session_token` is compared against the live `session_token` in `users`. If mismatched, the request is rejected with `401 Unauthorized: Session expired. You logged in from another device.`

### Authorization Roles
The system defines 3 role levels in the database (`users.role`):
1. **`student`**: Default role for all self-registered users.
2. **`teacher`**: Created by admin via `POST /api/admin/teachers`.
3. **`admin`**: Seeded via `seedAdmin.js` (`admin@aarambh.com`).

Role verification is handled by middleware:
- `authMiddleware.protect`: Validates presence, signature, expiration of JWT, and single device session matching. Populates `req.user`.
- `authMiddleware.authorize(...roles)`: Verifies `req.user.role` is included in allowed roles; rejects with `403 Forbidden` if unauthorized.

### Frontend Token Lifecycle
- On login, `token` and `userRole` are stored in browser `localStorage`.
- `frontend/src/services/api.js` automatically injects `Authorization: Bearer <token>` on all requests.
- On receiving `401 Unauthorized`, the Axios interceptor purges `token` from `localStorage` and redirects to `/login`.

---

## 3. Public APIs

Endpoints accessible without an `Authorization` header.

### 3.1 Base Health Probes
| Endpoint | Method | Controller / Handler | Request Body / Query | Success Response | Status Code | Related DB Table | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api` | `GET` | Inline handler (`apiRoutes.js`) | None | `{"message": "apiRoutes base endpoint"}` | `200 OK` | None | Active | Basic server route check |
| `/api/contact` | `GET` | Inline handler (`contactRoutes.js`) | None | `{"message": "contactRoutes base endpoint"}` | `200 OK` | None | Stub | Placeholder route. Does not accept contact inquiries |

### 3.2 Public Blog / CMS Endpoints
| Endpoint | Method | Controller / Handler | Request Body / Query | Success Response | Status Code | Related DB Table | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/blogs/categories` | `GET` | `blogController.getCategories` | None | `[{"id": 1, "category_name": "Exam Prep", "slug": "exam-prep", "post_count": 5}]` | `200 OK` | `blog_categories`, `blogs` | Active | Returns category list with blog counts |
| `/api/blogs` | `GET` | `blogController.getBlogs` | Query: `category` (string), `search` (string), `sort` (`oldest`, `title-asc`, `title-desc`, default newest) | Array of blog records including `category_name` and `formatted_date` | `200 OK` | `blogs`, `blog_categories` | Active | Supports text search across title and description |
| `/api/blogs/related/:categoryId/:currentBlogId` | `GET` | `blogController.getRelatedPosts` | Params: `categoryId`, `currentBlogId` | Array of up to 3 related blog records with `formatted_date` | `200 OK` | `blogs`, `blog_categories` | Active | Excludes the current blog ID |
| `/api/blogs/:id/:slug` | `GET` | `blogController.getBlogByIdAndSlug` | Params: `id`, `slug` | Single blog object with `formatted_date` | `200 OK` / `404 Not Found` | `blogs`, `blog_categories` | Active | Fetches full article content |

### 3.3 Static File Serving
| Endpoint | Method | Controller / Handler | Request Body / Query | Success Response | Status Code | Related DB Table | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/uploads/:filename` | `GET` | `express.static('uploads')` | None | Static binary file stream | `200 OK` / `404` | None | Active | Serves uploaded PDFs, images, thumbnails |

---

## 4. Authentication APIs

Mounted at `/api/auth`. Public endpoints handle OTP generation, verification, and credentials; password changes require an active JWT session.

| Endpoint | Method | Controller / Handler | Auth Req. | Role | Request Payload | Response Structure | Status Code | DB Tables | Implementation Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/auth/register/send-otp` | `POST` | `authController.sendRegisterOtp` | No | Public | `{"email": "student@example.com"}` | `{"success": true, "message": "OTP sent successfully"}` | `200 OK`<br>`400 Bad Request`<br>`429 Too Many Requests`<br>`500 Internal Error` | `users`, `otp_rate_limits`, `otps` | Active | Rate limited to 3 attempts per 2 hours. Sends 6-digit OTP valid 10 mins. |
| `/api/auth/register/verify-otp` | `POST` | `authController.verifyRegisterOtp` | No | Public | `{"email": "student@example.com", "otp": "123456"}` | `{"success": true, "message": "OTP verified successfully"}` | `200 OK`<br>`400 Bad Request`<br>`500 Internal Error` | `otps` | Active | Deletes matched OTP row upon verification. |
| `/api/auth/register` | `POST` | `authController.register` | No | Public | `{"full_name": "Name", "mobile": "9999999999", "email": "a@b.com", "board": "CBSE", "class": "12th", "password": "pass"}` | `{"success": true, "message": "User registered successfully"}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Error` | `users` | Active | Hashes password with bcrypt (10 rounds). Defaults role to `student`. |
| `/api/auth/login` | `POST` | `authController.login` | No | Public | `{"email": "user@example.com", "password": "password123"}` | `{"success": true, "token": "...", "role": "student", "message": "Login successful"}` | `200 OK`<br>`401 Unauthorized`<br>`500 Internal Error` | `users` | Active | Issues 24h JWT. Updates `users.session_token` for single-device login. |
| `/api/auth/forgot-password/send-otp` | `POST` | `authController.sendForgotPasswordOtp` | No | Public | `{"email": "user@example.com"}` | `{"success": true, "message": "OTP sent to your email"}` | `200 OK`<br>`404 Not Found`<br>`429 Too Many Requests`<br>`500 Internal Error` | `users`, `otp_rate_limits`, `otps` | Active | Verifies user exists prior to sending OTP. Enforces 2-hour rate limiting. |
| `/api/auth/forgot-password/verify-otp` | `POST` | `authController.verifyForgotPasswordOtp` | No | Public | `{"email": "user@example.com", "otp": "123456"}` | `{"success": true, "message": "OTP verified successfully"}` | `200 OK`<br>`400 Bad Request`<br>`500 Internal Error` | `otps` | Active | Verifies OTP validity without immediate deletion. |
| `/api/auth/forgot-password/reset` | `POST` | `authController.resetPassword` | No | Public | `{"email": "user@example.com", "password": "newPassword"}` | `{"success": true, "message": "Password reset successful"}` | `200 OK`<br>`404 Not Found`<br>`500 Internal Error` | `users`, `otps` | Active | Updates bcrypt hash in `users` and cleans up user's forgot password OTPs. |
| `/api/auth/change-password` | `POST` | `authController.changePassword` | Yes (`protect`) | Authenticated User | `{"currentPassword": "oldPass", "newPassword": "newPass"}` | `{"success": true, "message": "Password changed successfully"}` | `200 OK`<br>`400 Bad Request`<br>`404 Not Found`<br>`500 Internal Error` | `users` | Active | Compares current password hash before saving new bcrypt hash. |

---

## 5. Student APIs

Mounted at `/api/student`. All endpoints require `authMiddleware.protect`. Operations are scoped to the student identified by `req.user.id`.

| Endpoint | Method | Controller / Handler | Auth Req. | Role | Request Payload | Response Structure | Status Code | DB Tables | Implementation Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/student/dashboard` | `GET` | `studentController.getDashboardStats` | Yes | Student | None | `{"success": true, "data": {"studentName": "...", "attendancePercentage": 85, "activeSubjects": 0, "pendingFees": 15000, "lastExamScore": 0, "upcomingClasses": [...], "recentNotifications": [...]}}` | `200 OK`<br>`500 Internal Error` | `users`, `attendance`, `student_fees`, `classes`, `notifications` | Active (Partial Stubs) | `activeSubjects` and `lastExamScore` are hardcoded to `0` in controller. |
| `/api/student/profile` | `GET` | `studentController.getProfile` | Yes | Student | None | `{"success": true, "data": {"id": "#STU-101", "name": "...", "email": "...", "phone": "...", "course": "...", "joinDate": "...", "address": "Not provided"}}` | `200 OK`<br>`404 Not Found`<br>`500 Internal Error` | `users` | Active | `address` is hardcoded as `'Not provided'`. |
| `/api/student/fees` | `GET` | `studentController.getFees` | Yes | Student | None | `{"success": true, "data": {"totalFee": 45000, "paidAmount": 15000, "pendingAmount": 30000, "installments": [{"id": 1, "amount": 15000, "dueDate": "Nov 15, 2026", "status": "Pending", "receiptNo": null}]}}` | `200 OK`<br>`500 Internal Error` | `student_fees`, `fee_installments` | Active | Returns fee summary and chronological installments. |
| `/api/student/tickets` | `GET` | `studentController.getTickets` | Yes | Student | None | `{"success": true, "data": [{"id": "#TKT-1024", "subject": "...", "date": "...", "status": "Open", "lastUpdate": "..."}]}` | `200 OK`<br>`500 Internal Error` | `tickets` | Active | Lists tickets raised by the current student. |
| `/api/student/tickets` | `POST` | `studentController.createTicket` | Yes | Student | `{"category": "Technical Issue", "subject": "Issue title", "description": "Details"}` | `{"success": true, "message": "Ticket created successfully"}` | `201 Created`<br>`500 Internal Error` | `tickets` | Active Backend / Unused Frontend | Backend creates `#TKT-XXXX`. Frontend modal currently closes without calling API. |
| `/api/student/attendance` | `GET` | `studentController.getAttendance` | Yes | Student | None | `{"success": true, "data": [{"id": 1, "subject": "Physics", "date": "Sep 15, 2026", "time": "10:00 AM", "status": "Present"}]}` | `200 OK`<br>`500 Internal Error` | `attendance` | Active | Attendance log ordered by date descending. |
| `/api/student/doubts` | `GET` | `studentController.getDoubts` | Yes | Student | None | `{"success": true, "data": [{"id": 1, "subject": "Physics", "topic": "...", "question": "...", "status": "Pending", "answer": null, "date": "..."}]}` | `200 OK`<br>`500 Internal Error` | `doubts` | Active | Shows student's asked doubts and teacher responses. |
| `/api/student/doubts` | `POST` | `studentController.createDoubt` | Yes | Student | `{"subject": "Physics", "topic": "Kinematics", "question": "Question text"}` | `{"success": true, "message": "Doubt submitted successfully"}` | `201 Created`<br>`500 Internal Error` | `doubts` | Active | Inserts doubt with default status `Pending`. |
| `/api/student/notifications` | `GET` | `studentController.getNotifications` | Yes | Student | None | `{"success": true, "data": [{"id": 1, "type": "bullhorn", "title": "...", "message": "...", "isNew": true, "time": "..."}]}` | `200 OK`<br>`500 Internal Error` | `notifications` | Active | Returns notifications matching `student_id` or broadcast notifications (`student_id IS NULL`). |
| `/api/student/feedback` | `POST` | `studentController.submitFeedback` | Yes | Student | `{"rating": 5, "category": "Teaching Quality", "relatedTeacher": "Prof. Sharma", "feedbackText": "Great class"}` | `{"success": true, "message": "Feedback submitted successfully"}` | `201 Created`<br>`500 Internal Error` | `feedback` | Active | Saves anonymous/student feedback to database. |
| `/api/student/switch-program` | `POST` | `studentController.submitProgramChange` | Yes | Student | `{"currentProgram": "BBOSE 10th", "newProgram": "NIOS 10th", "reason": "Timing conflict"}` | `{"success": true, "message": "Program change request submitted successfully"}` | `201 Created`<br>`500 Internal Error` | `program_change_requests` | Active | Saves request with status `Pending`. |
| `/api/student/classes` | `GET` | `studentController.getClasses` | Yes | Student | None | `{"success": true, "data": [{"id": 1, "subject": "Physics", "topic": "...", "instructor": "...", "status": "Upcoming", "link": "...", "thumbnail": "...", "date": "2026-09-16", "time": "10:00 AM", "duration": "2 Hours"}]}` | `200 OK`<br>`500 Internal Error` | `classes` | Active | Returns full class calendar with live links and statuses. |
| `/api/student/materials` | `GET` | `studentController.getMaterials` | Yes | Student | None | `{"success": true, "data": [{"id": 1, "title": "Physics Notes", "type": "PDF", "course": "12th", "size": "2.4 MB", "is_free": 1, "price": "0.00", "file_url": "...", "is_purchased": true}]}` | `200 OK`<br>`500 Internal Error` | `study_materials`, `purchased_materials` | Active | Dynamically evaluates `is_purchased` flag based on user's purchases. |
| `/api/student/courses` | `GET` | `studentController.getCourses` | Yes | Student | None | `{"success": true, "data": [{"id": 1, "title": "Complete Physics", "description": "...", "duration": "3 Months", "is_free": 0, "price": "4999.00", "includes_live_classes": 1, "includes_recorded_classes": 1, "thumbnail": "...", "is_purchased": false}]}` | `200 OK`<br>`500 Internal Error` | `courses`, `purchased_courses` | Active | Dynamically evaluates `is_purchased` flag based on `purchased_courses`. |

*Note on unmounted controller methods:* `studentController.js` defines `buyMaterial` and `buyCourse` mock handlers, but these routes are NOT mounted in `studentRoutes.js`. Purchase handling is executed through `/api/payment` routes.

---

## 6. Teacher APIs

Mounted at `/api/teacher`. Protected by `authMiddleware.protect` and `authMiddleware.authorize('teacher')`.

| Endpoint | Method | Controller / Handler | Auth Req. | Role | Request Payload | Response Structure | Status Code | DB Tables | Implementation Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/teacher/dashboard` | `GET` | `teacherController.getDashboardStats` | Yes | Teacher | None | `{"success": true, "data": {"teacherName": "...", "upcomingClasses": [...], "totalStudentsAssigned": 45, "pendingDoubts": 3, "assignmentsToGrade": 12}}` | `200 OK`<br>`500 Internal Error` | `users`, `classes`, `doubts`, `assignment_submissions` | Active | Scoped to teacher name for classes and general counts for students/doubts. |
| `/api/teacher/classes` | `GET` | `teacherController.getMyClasses` | Yes | Teacher | None | `{"success": true, "data": [{"id": 1, "subject": "...", "topic": "...", "date": "...", "time": "...", "status": "Upcoming", "duration": "1.5 Hours"}]}` | `200 OK`<br>`500 Internal Error` | `users`, `classes` | Active | Filters classes where `instructor = teacher.name`. |
| `/api/teacher/students` | `GET` | `teacherController.getStudents` | Yes | Teacher | None | `{"success": true, "data": [{"id": "#STU-101", "name": "...", "email": "...", "course": "...", "attendance": "0%"}]}` | `200 OK`<br>`500 Internal Error` | `users` | Active | Returns all registered students; `attendance: '0%'` is hardcoded. |
| `/api/teacher/notifications` | `GET` | `teacherController.getNotifications` | Yes | Teacher | None | `{"success": true, "data": [{"id": 1, "icon": "bell", "title": "...", "message": "...", "time": "..."}]}` | `200 OK`<br>`500 Internal Error` | `notifications` | Active | Fetches general/broadcast announcements (`student_id IS NULL`). |
| `/api/teacher/assignments` | `GET` | `teacherController.getAssignments` | Yes | Teacher | None | `{"success": true, "data": [{"id": 1, "title": "...", "subject": "...", "dueDate": "...", "total": 100, "submitted": 5}]}` | `200 OK`<br>`500 Internal Error` | `assignments`, `assignment_submissions` | Active | Queries assignments created by the current teacher with submission count. |
| `/api/teacher/assignments` | `POST` | `teacherController.createAssignment` | Yes | Teacher | `{"title": "Assignment 1", "subject": "Physics", "dueDate": "2026-11-20", "totalMarks": 100}` | `{"success": true, "message": "Assignment created successfully"}` | `201 Created`<br>`500 Internal Error` | `assignments` | Active | Inserts record linked to `teacher_id`. |
| `/api/teacher/doubts` | `GET` | `teacherController.getDoubts` | Yes | Teacher | None | `{"success": true, "data": [{"id": 1, "student_id": 1, "subject": "...", "topic": "...", "question": "...", "status": "Pending", "time": "..."}]}` | `200 OK`<br>`500 Internal Error` | `doubts` | Active Backend / Unused Frontend | Returns pending doubts. Frontend has no teacher doubts UI. |
| `/api/teacher/doubts/:id` | `PUT` | `teacherController.answerDoubt` | Yes | Teacher | `{"answer": "Solution text..."}` | `{"success": true, "message": "Doubt answered successfully"}` | `200 OK`<br>`500 Internal Error` | `doubts` | Active Backend / Unused Frontend | Updates status to `Answered` and saves answer text. Unused by frontend. |
| `/api/teacher/attendance` | `POST` | `teacherController.markAttendance` | Yes | Teacher | `{"studentId": 1, "subject": "Physics", "date": "2026-10-24", "time": "10:00:00", "status": "Present"}` | `{"success": true, "message": "Attendance marked"}` | `201 Created`<br>`500 Internal Error` | `attendance` | Active | Records student attendance entry. |

---

## 7. Admin APIs

Mounted at `/api/admin`. Protected by `authMiddleware.protect` and `authMiddleware.authorize('admin')`.

| Endpoint | Method | Controller / Handler | Auth Req. | Role | Request Payload | Response Structure | Status Code | DB Tables | Implementation Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/admin/dashboard` | `GET` | `adminController.getDashboardStats` | Yes | Admin | None | `{"success": true, "data": {"activeStudents": 45, "monthlyRevenue": 150000, "openTickets": 3, "newQueries": 0, "liveClassesToday": [...], "recentLeads": []}}` | `200 OK`<br>`500 Internal Error` | `users`, `fee_installments`, `tickets`, `classes`, `contact_messages` | Active (Partial Stubs) | Queries `contact_messages` (falls back to 0 if table missing). `recentLeads` hardcoded as empty array. |
| `/api/admin/finance` | `GET` | `adminController.getFinanceStats` | Yes | Admin | None | `{"success": true, "data": {"totalCollection": 150000, "pendingDues": 45000, "fullyPaidStudents": 20, "transactions": [{"id": "REC-001", "student": "Name", "amount": 15000, "status": "Success"}]}}` | `200 OK`<br>`500 Internal Error` | `student_fees`, `fee_installments`, `users` | Active | Aggregates fees and recent transactions. |
| `/api/admin/students` | `GET` | `adminController.getAllStudents` | Yes | Admin | None | `{"success": true, "data": [{"id": 1, "displayId": "#STU-101", "name": "...", "course": "...", "status": "Active"}]}` | `200 OK`<br>`500 Internal Error` | `users` | Active | Query does not select `email` or `mobile`; frontend contact columns show 'N/A'. |
| `/api/admin/students` | `POST` | `adminController.addStudent` | Yes | Admin | `{"fullName": "...", "email": "...", "mobile": "...", "board": "...", "course": "...", "password": "..."}` | `{"success": true, "message": "Student added successfully"}` | `201 Created`<br>`500 Internal Error` | `users` | Active Backend / Unused Frontend | Frontend button routes to `/admin/students/new` which has no frontend route or page. |
| `/api/admin/students/:id` | `PUT` | `adminController.updateStudent` | Yes | Admin | `{"name": "...", "email": "...", "phone": "...", "course": "...", "status": "Active"}` | `{"success": true, "message": "Student updated successfully"}` | `200 OK`<br>`500 Internal Error` | `users` | Active | Updates `full_name`, `email`, `mobile`, `class` in `users`. |
| `/api/admin/students/:id` | `DELETE` | `adminController.deleteStudent` | Yes | Admin | None | `{"success": true, "message": "Student deleted successfully"}` | `200 OK`<br>`500 Internal Error` | `users` | Active | Cascades deletion to child records via foreign keys. |
| `/api/admin/teachers` | `POST` | `adminController.createTeacher` | Yes | Admin | `{"name": "...", "email": "...", "phone": "...", "subject": "...", "experience": "...", "password": "..."}` | `{"success": true, "message": "Teacher created successfully"}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Error` | `users` | Active | Stores teacher in `users` with `role="teacher"`. Note: No backend `GET /api/admin/teachers` exists; frontend teacher table is mock data. |
| `/api/admin/attendance` | `GET` | `adminController.getAttendance` | Yes | Admin | None | `{"success": true, "data": []}` | `200 OK` | None | Stub | Always returns empty array. Unused by frontend. |
| `/api/admin/attendance` | `POST` | `adminController.markAttendance` | Yes | Admin | Any | `{"success": true, "message": "Attendance marked"}` | `200 OK` | None | Stub | Does not save to database. Unused by frontend. |
| `/api/admin/tickets` | `GET` | `adminController.getAllTickets` | Yes | Admin | None | `{"success": true, "data": []}` | `200 OK` | None | Stub | Always returns empty array. Unused by frontend. |
| `/api/admin/tickets` | `PUT` | `adminController.updateTicketStatus` | Yes | Admin | Any | `{"success": true, "message": "Ticket updated"}` | `200 OK` | None | Stub | Does not update database. Unused by frontend. |
| `/api/admin/classes` | `GET` | `adminController.getLiveClasses` | Yes | Admin | None | `{"success": true, "data": []}` | `200 OK` | None | Stub | Always returns empty array. Unused by frontend. |
| `/api/admin/classes` | `POST` | `adminController.scheduleLiveClass` | Yes | Admin | Any | `{"success": true, "message": "Class scheduled"}` | `201 Created` | None | Stub | Does not save to database. Unused by frontend. |
| `/api/admin/materials` | `GET` | `adminController.getMaterials` | Yes | Admin | None | `{"success": true, "data": [ {...study_materials...} ]}` | `200 OK`<br>`500 Internal Error` | `study_materials` | Active | Returns all uploaded study materials. |
| `/api/admin/materials` | `POST` | `adminController.addMaterial` | Yes | Admin | Multipart: `title`, `type`, `course`, `is_free`, `price`, file: `file` | `{"success": true, "message": "Material added successfully"}` | `201 Created`<br>`500 Internal Error` | `study_materials` | Active | Uploads file via Multer to `/uploads` directory and records metadata. |
| `/api/admin/materials/:id` | `PUT` | `adminController.updateMaterial` | Yes | Admin | `{"is_free": true, "price": 0}` | `{"success": true, "message": "Material updated successfully"}` | `200 OK`<br>`500 Internal Error` | `study_materials` | Active Backend / Unused Frontend | Updates price and free status. Unused by frontend (no edit button). |
| `/api/admin/materials/:id` | `DELETE` | `adminController.deleteMaterial` | Yes | Admin | None | `{"success": true, "message": "Material deleted successfully"}` | `200 OK`<br>`500 Internal Error` | `study_materials` | Active | Deletes row from database. (Does not unlink file on disk). |
| `/api/admin/courses` | `GET` | `adminController.getCourses` | Yes | Admin | None | `{"success": true, "data": [ {...courses...} ]}` | `200 OK`<br>`500 Internal Error` | `courses` | Active | Returns all course packages. |
| `/api/admin/courses` | `POST` | `adminController.addCourse` | Yes | Admin | Multipart: `title`, `description`, `duration`, `is_free`, `price`, `includes_live_classes`, `includes_recorded_classes`, file: `thumbnail` | `{"success": true, "message": "Course added successfully"}` | `201 Created`<br>`500 Internal Error` | `courses` | Active | Uploads thumbnail file and inserts course record. |
| `/api/admin/courses/:id` | `PUT` | `adminController.updateCourse` | Yes | Admin | `{"is_free": 0, "price": 4999, "includes_live_classes": 1, "includes_recorded_classes": 1}` | `{"success": true, "message": "Course updated successfully"}` | `200 OK`<br>`500 Internal Error` | `courses` | Active Backend / Unused Frontend | Frontend edit button only displays a toast without invoking API. |
| `/api/admin/courses/:id` | `DELETE` | `adminController.deleteCourse` | Yes | Admin | None | `{"success": true, "message": "Course deleted successfully"}` | `200 OK`<br>`500 Internal Error` | `courses` | Active | Deletes course row from database. |
| `/api/admin/exams` | `GET` | `adminController.getExams` | Yes | Admin | None | `{"success": true, "data": [ {...exams...} ]}` | `200 OK`<br>`500 Internal Error` | `exams` | Active | Fetches scheduled exams ordered by creation date descending. |
| `/api/admin/exams` | `POST` | `adminController.addExam` | Yes | Admin | `{"title": "NEET Mock 1", "course": "Medical", "exam_date": "2026-11-15", "exam_time": "10:00 AM"}` | `{"success": true, "message": "Exam scheduled successfully"}` | `201 Created`<br>`500 Internal Error` | `exams` | Active | Generates `EXM-XXX` and inserts into database. |

---

## 8. Payment APIs

Mounted at `/api/payment`. Protected by `authMiddleware.protect`.

| Endpoint | Method | Controller / Handler | Auth Req. | Role | Request Payload | Response Structure | Status Code | DB Tables | Implementation Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/payment/create-order` | `POST` | `paymentController.createOrder` | Yes | Authenticated User | `{"amount": 4999, "currency": "INR", "receipt": "rcpt_1", "itemId": 1, "itemType": "course"}` | `{"success": true, "order": {"id": "order_XXXX", "amount": 499900, "currency": "INR", ...}, "key_id": "rzp_..."}` | `200 OK`<br>`500 Internal Error` | None (Razorpay Cloud) | Active | Converts amount to paise (x100). Passes metadata notes. Returns `key_id`. |
| `/api/payment/verify` | `POST` | `paymentController.verifyPayment` | Yes | Authenticated User | `{"razorpay_order_id": "...", "razorpay_payment_id": "...", "razorpay_signature": "...", "itemId": 1, "itemType": "course", "amountPaid": 4999}` | `{"success": true, "message": "Payment verified and content unlocked!"}` | `200 OK`<br>`400 Bad Request`<br>`500 Internal Error` | `purchased_courses`, `purchased_materials`, `courses`, `study_materials`, `users` | Active (Logic Mismatch for Fees) | Verifies HMAC SHA256 signature using `process.env.RAZORPAY_KEY_SECRET`. Unlocks item in `purchased_courses` or `purchased_materials`. Sends invoice email via Nodemailer. Does not support fee installment payments. |

---

## 9. Blog/CMS APIs

Detailed summary of blog management and data models:
- **Database Tables:** `blog_categories` (id, category_name, slug) and `blogs` (id, title, slug, content, short_description, featured_image, category_id, is_new, read_time, created_at).
- **Public Fetching:** Fully supported through `/api/blogs`, `/api/blogs/categories`, `/api/blogs/related/:categoryId/:currentBlogId`, `/api/blogs/:id/:slug`.
- **Administrative CMS Status:** Currently, there are **no backend admin CRUD endpoints** for writing, editing, or deleting blogs or blog categories. The frontend pages `ManageBlogs.jsx` and `ManageBlogCategories.jsx` operate exclusively on static local arrays.

---

## 10. Other APIs

- **Data Route:** `GET /api/data/secure` (Protected via `protect`). Returns `{"message": "Secure data for user undefined", "user": req.user}`. Used for token verification testing; not consumed in UI.
- **Mailer Utility:** `backend/utils/mailer.js` contains a stub `sendMail: async () => { console.log('Mail sent'); }`. All actual transactional emails (OTP, Payment invoices) are dispatched by `backend/utils/emailService.js` using Nodemailer.

---

## 11. Frontend API Usage Matrix

Complete inventory of every API call across all frontend components and pages, with their exact mappings to backend endpoints and execution status.

| Frontend Call Location | Method | Target Backend Endpoint | Auth Header | Role | DB / Target Table | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `components/home/ContactForm.jsx:75` | `POST` | `/api/contact/submit` | No | Public | None | **Missing Backend** (404) | Backend only has `GET /api/contact` |
| `pages/ContactUs.jsx:21` | `POST` | `/api/contact/submit` | No | Public | None | **Missing Backend** (404) | Backend only has `GET /api/contact` |
| `components/forms/PopupForm.jsx:115` | `GET` | `/api/contact/submit-popup?${queryParams}` | No | Public | None | **Missing Backend** (404) | Query params passed via GET. Missing endpoint |
| `pages/admission/Masterclass.jsx:64` | `POST` | `/api/webinar/register` | No | Public | None | **Missing Backend** (404) | No webinar route mounted on backend |
| `pages/auth/Login.jsx:60` | `POST` | `/api/auth/login` | No | Public | `users` | Active | Stores JWT token & role |
| `pages/auth/Register.jsx:74` | `POST` | `/api/auth/register/send-otp` | No | Public | `users`, `otps`, `otp_rate_limits` | Active | Step 1 of registration |
| `pages/auth/Register.jsx:100` | `POST` | `/api/auth/register/verify-otp` | No | Public | `otps` | Active | Step 2 of registration |
| `pages/auth/Register.jsx:140` | `POST` | `/api/auth/register` | No | Public | `users` | Active | Step 3 of registration |
| `pages/auth/ForgotPassword.jsx:46` | `POST` | `/api/auth/forgot-password/send-otp` | No | Public | `users`, `otps`, `otp_rate_limits` | Active | Step 1 of forgot password |
| `pages/auth/ForgotPassword.jsx:74` | `POST` | `/api/auth/forgot-password/verify-otp` | No | Public | `otps` | Active | Step 2 of forgot password |
| `pages/auth/ForgotPassword.jsx:107` | `POST` | `/api/auth/forgot-password/reset` | No | Public | `users`, `otps` | Active | Step 3 of forgot password |
| `pages/ChangePassword.jsx:30` | `POST` | `/api/auth/change-password` | Yes | Authenticated | `users` | Active | Called from student/admin settings |
| `pages/blog/BlogList.jsx:43` | `GET` | `/api/blogs/categories` | No | Public | `blog_categories`, `blogs` | Active (Hardcoded URL) | Calls `http://localhost:5000/api/blogs/categories` |
| `pages/blog/BlogList.jsx:66` | `GET` | `/api/blogs?${queryParams}` | No | Public | `blogs`, `blog_categories` | Active (Hardcoded URL) | Calls `http://localhost:5000/api/blogs?...` |
| `pages/blog/BlogSingle.jsx:24` | `GET` | `/api/blogs/:id/:slug` | No | Public | `blogs`, `blog_categories` | Active (Hardcoded URL) | Calls `http://localhost:5000/api/blogs/:id/:slug` |
| `pages/blog/BlogSingle.jsx:33` | `GET` | `/api/blogs/related/:categoryId/:currentBlogId` | No | Public | `blogs`, `blog_categories` | Active (Hardcoded URL) | Calls `http://localhost:5000/api/blogs/related/...` |
| `pages/student/StudentDashboard.jsx:13` | `GET` | `/api/student/dashboard` | Yes | Student | `users`, `attendance`, `student_fees`, `classes`, `notifications` | Active | Loads student dashboard statistics |
| `pages/student/Profile.jsx:12` | `GET` | `/api/student/profile` | Yes | Student | `users` | Active | Loads student profile |
| `pages/student/CourseFee.jsx:29` | `GET` | `/api/student/fees` | Yes | Student | `student_fees`, `fee_installments` | Active | Loads fee summary and installments |
| `pages/student/CourseFee.jsx:74` | `POST` | `/api/payment/create-order` | Yes | Student | None | Active | Creates Razorpay order for fee installment |
| `pages/student/CourseFee.jsx:95` | `POST` | `/api/payment/verify` | Yes | Student | `purchased_courses` (Mismatch) | Active / Logic Mismatch | Erroneously treats installment as course purchase |
| `pages/student/SupportTicket.jsx:12` | `GET` | `/api/student/tickets` | Yes | Student | `tickets` | Active | Loads student tickets |
| `pages/student/Attendance.jsx:12` | `GET` | `/api/student/attendance` | Yes | Student | `attendance` | Active | Loads attendance log |
| `pages/student/DoubtSession.jsx:21` | `GET` | `/api/student/doubts` | Yes | Student | `doubts` | Active | Loads student doubt history |
| `pages/student/DoubtSession.jsx:48` | `POST` | `/api/student/doubts` | Yes | Student | `doubts` | Active | Submits new doubt |
| `pages/student/Notifications.jsx:14` | `GET` | `/api/student/notifications` | Yes | Student | `notifications` | Active | Loads student notifications |
| `pages/student/SubmitFeedback.jsx:22` | `POST` | `/api/student/feedback` | Yes | Student | `feedback` | Active | Submits rating & comments |
| `pages/student/SwitchProgram.jsx:19` | `POST` | `/api/student/switch-program` | Yes | Student | `program_change_requests` | Active | Sends hardcoded `currentProgram` string |
| `pages/student/LiveClasses.jsx:14` | `GET` | `/api/student/classes` | Yes | Student | `classes` | Active | Loads upcoming & recorded classes |
| `pages/student/StudyMaterials.jsx:11` | `GET` | `/api/student/materials` | Yes | Student | `study_materials`, `purchased_materials` | Active | Loads PDF study materials |
| `pages/student/StudyMaterials.jsx:46` | `POST` | `/api/payment/create-order` | Yes | Student | None | Active | Orders material purchase |
| `pages/student/StudyMaterials.jsx:70` | `POST` | `/api/payment/verify` | Yes | Student | `purchased_materials` | Active | Unlocks purchased material |
| `pages/student/BrowseCourses.jsx:10` | `GET` | `/api/student/courses` | Yes | Student | `courses`, `purchased_courses` | Active | Loads courses |
| `pages/student/BrowseCourses.jsx:45` | `POST` | `/api/payment/create-order` | Yes | Student | None | Active | Orders course purchase |
| `pages/student/BrowseCourses.jsx:69` | `POST` | `/api/payment/verify` | Yes | Student | `purchased_courses` | Active | Unlocks purchased course |
| `pages/teacher/TeacherDashboard.jsx:18` | `GET` | `/api/teacher/dashboard` | Yes | Teacher | `users`, `classes`, `doubts`, `assignment_submissions` | Active | Loads teacher dashboard stats |
| `pages/teacher/MyClasses.jsx:11` | `GET` | `/api/teacher/classes` | Yes | Teacher | `classes` | Active | Loads teacher schedule |
| `pages/teacher/Students.jsx:11` | `GET` | `/api/teacher/students` | Yes | Teacher | `users` | Active | Lists all registered students |
| `pages/teacher/Students.jsx:28` | `POST` | `/api/teacher/attendance` | Yes | Teacher | `attendance` | Active | Marks student attendance |
| `pages/teacher/Notifications.jsx:14` | `GET` | `/api/teacher/notifications` | Yes | Teacher | `notifications` | Active | Loads teacher announcements |
| `pages/teacher/Assignments.jsx:12` | `GET` | `/api/teacher/assignments` | Yes | Teacher | `assignments`, `assignment_submissions` | Active | Lists teacher assignments |
| `pages/teacher/Assignments.jsx:30` | `POST` | `/api/teacher/assignments` | Yes | Teacher | `assignments` | Active | Creates new assignment |
| `pages/admin/AdminDashboard.jsx:20` | `GET` | `/api/admin/dashboard` | Yes | Admin | `users`, `fee_installments`, `tickets`, `classes` | Active | Loads admin overview metrics |
| `pages/admin/ManageFinance.jsx:16` | `GET` | `/api/admin/finance` | Yes | Admin | `student_fees`, `fee_installments`, `users` | Active | Loads collection analytics |
| `pages/admin/AllStudents.jsx:19` | `GET` | `/api/admin/students` | Yes | Admin | `users` | Active (Response Mismatch) | Does not return email/phone |
| `pages/admin/AllStudents.jsx:42` | `DELETE` | `/api/admin/students/:id` | Yes | Admin | `users` | Active | Deletes student by ID |
| `pages/admin/AllStudents.jsx:57` | `PUT` | `/api/admin/students/:id` | Yes | Admin | `users` | Active | Updates student records |
| `pages/admin/ManageTeachers.jsx:28` | `POST` | `/api/admin/teachers` | Yes | Admin | `users` | Active | Creates teacher credentials |
| `pages/admin/ManageStudyMaterial.jsx:21` | `GET` | `/api/admin/materials` | Yes | Admin | `study_materials` | Active | Lists uploaded materials |
| `pages/admin/ManageStudyMaterial.jsx:61` | `POST` | `/api/admin/materials` | Yes | Admin | `study_materials` | Active | Uploads PDF material |
| `pages/admin/ManageStudyMaterial.jsx:168` | `DELETE` | `/api/admin/materials/:id` | Yes | Admin | `study_materials` | Active | Deletes material record |
| `pages/admin/ManageCourses.jsx:22` | `GET` | `/api/admin/courses` | Yes | Admin | `courses` | Active | Lists courses |
| `pages/admin/ManageCourses.jsx:64` | `POST` | `/api/admin/courses` | Yes | Admin | `courses` | Active | Creates course with thumbnail |
| `pages/admin/ManageCourses.jsx:155` | `DELETE` | `/api/admin/courses/:id` | Yes | Admin | `courses` | Active | Deletes course record |
| `pages/admin/ManageExams.jsx:19` | `GET` | `/api/admin/exams` | Yes | Admin | `exams` | Active | Lists scheduled exams |
| `pages/admin/ManageExams.jsx:41` | `POST` | `/api/admin/exams` | Yes | Admin | `exams` | Active | Schedules new exam |

---

## 12. Frontend ↔ Backend Mismatches

### 12.1 Frontend Endpoint Exists but Backend Endpoint Missing
1. **`POST /api/contact/submit`**:
   - Called by: `frontend/src/components/home/ContactForm.jsx` (line 75) and `frontend/src/pages/ContactUs.jsx` (line 21).
   - Backend state: `backend/routes/contactRoutes.js` only provides `GET /` (returning a base test message). No handler exists to accept inquiries or store them into the database. Returns HTTP 404.
2. **`GET /api/contact/submit-popup`**:
   - Called by: `frontend/src/components/forms/PopupForm.jsx` (line 115).
   - Backend state: No such endpoint or router handler exists. Returns HTTP 404.
3. **`POST /api/webinar/register`**:
   - Called by: `frontend/src/pages/admission/Masterclass.jsx` (line 64).
   - Backend state: There is no webinar router mounted in `backend/server.js` or defined anywhere in the backend codebase. Returns HTTP 404.

### 12.2 Backend Endpoint Exists but Frontend Does Not Use It
1. **`POST /api/student/tickets`**:
   - Backend has a complete handler in `studentController.createTicket` which generates `#TKT-XXXX` and inserts into the `tickets` table.
   - Frontend `SupportTicket.jsx` includes a modal to raise tickets, but the "Submit Ticket" button has `onClick={() => setShowAddModal(false)}` with no API invocation.
2. **`GET /api/teacher/doubts` & `PUT /api/teacher/doubts/:id`**:
   - Backend has handlers to list pending doubts and submit answers (`teacherController.getDoubts`, `teacherController.answerDoubt`).
   - Frontend has no teacher doubts resolution screen; teacher navigation does not include a doubts view.
3. **`POST /api/admin/students`**:
   - Backend provides `adminController.addStudent` to register students manually.
   - Frontend `AllStudents.jsx` has an "Add New Student" button navigating to `/admin/students/new`, but this route does not exist in `App.jsx` and no form exists.
4. **`PUT /api/admin/materials/:id`**:
   - Backend provides `adminController.updateMaterial` to adjust free/paid status and pricing.
   - Frontend `ManageStudyMaterial.jsx` only provides a delete button; no edit modal or API call exists.
5. **`PUT /api/admin/courses/:id`**:
   - Backend provides `adminController.updateCourse` to modify pricing and class inclusion flags.
   - Frontend `ManageCourses.jsx` has an edit button that only displays a toast (`Edit mode enabled...`) without calling the API.
6. **`GET /api/admin/attendance` & `POST /api/admin/attendance`**:
   - Backend routes exist (as placeholder stubs returning empty data).
   - Frontend `ManageAttendance.jsx` does not call them and maintains state in an empty local array.
7. **`GET /api/admin/tickets` & `PUT /api/admin/tickets`**:
   - Backend routes exist (as placeholder stubs).
   - Frontend `ManageTickets.jsx` uses hardcoded mock tickets and does not connect to these routes.
8. **`GET /api/admin/classes` & `POST /api/admin/classes`**:
   - Backend routes exist (as placeholder stubs).
   - Frontend `ManageLiveClass.jsx` uses hardcoded classes and Jitsi Meet iframe without connecting to these routes.
9. **`GET /api/data/secure`**:
   - Backend test route in `dataRoutes.js`. Not used anywhere in the frontend.
10. **`GET /api/contact` & `GET /api`**:
    - Backend base health probe endpoints. Not called by frontend.

### 12.3 Method Mismatches
1. **`PopupForm.jsx`**:
   - Uses `GET` to submit contact inquiry data (`/api/contact/submit-popup?${queryParams}`).
   - Form submissions containing personally identifiable information (PII) should use `POST` with a JSON body rather than query strings.

### 12.4 Payload Mismatches
1. **`CourseFee.jsx` vs `paymentController.verifyPayment`**:
   - In `CourseFee.jsx` (lines 76-77, 99-100), fee installment payments send `itemType: 'course'` and `itemId: selectedInstallment.id`.
   - On the backend, when `itemType === 'course'` is received, `paymentController.js` attempts to insert `itemId` into `purchased_courses (student_id, course_id, price_paid)`. Because `itemId` is an installment ID from `fee_installments` and not a valid `course_id` from `courses`, this violates foreign key constraints or records false course purchases, and never updates `fee_installments` status to `Paid` or recalculates `student_fees`.
2. **`AllStudents.jsx` vs `adminController.updateStudent`**:
   - `AllStudents.jsx` sends `editingStudent` (`{ id, name, email, phone, course, status }`).
   - However, `adminController.getAllStudents` never selected `email` or `mobile` when loading students into the UI. Therefore, saving an edited student can overwrite `email` or `mobile` in `users` with `undefined`.
3. **`SwitchProgram.jsx`**:
   - Frontend hardcodes `currentProgram: 'BBOSE 10th - Morning'` in the payload for all students rather than obtaining the student's actual enrolled program from their profile.

### 12.5 Response Structure Mismatches
1. **`adminController.getAllStudents` vs `AllStudents.jsx`**:
   - Frontend expects `student.email` and `student.mobile` to render the student contact column.
   - Backend SQL query only executes: `SELECT id, full_name as name, class as course, "Active" as status FROM users WHERE role="student"`. Contact information always renders as `'N/A'`.
2. **`studentController.getDashboardStats` vs `StudentDashboard.jsx`**:
   - Frontend renders badges for `activeSubjects` and `lastExamScore`.
   - Backend hardcodes these fields to `0` in `studentController.js` lines 39 and 41.
3. **`adminController.getDashboardStats` vs `AdminDashboard.jsx`**:
   - Frontend renders attention badges for Open Tickets (hardcoded `<span ...>5</span>`), Leads (hardcoded `<span ...>12</span>`), and Unassigned Doubts (hardcoded `<span ...>3</span>`), ignoring the values returned in `stats.openTickets` and `stats.newQueries`.

### 12.6 Hardcoded Localhost API URLs
1. **`frontend/src/pages/blog/BlogList.jsx`**:
   - Line 43: `fetch('http://localhost:5000/api/blogs/categories')`
   - Line 66: `fetch(`http://localhost:5000/api/blogs?${queryParams}`)`
2. **`frontend/src/pages/blog/BlogSingle.jsx`**:
   - Line 24: `fetch(`http://localhost:5000/api/blogs/${id}/${slug}`)`
   - Line 33: `fetch(`http://localhost:5000/api/blogs/related/${data.category_id}/${data.id}`)`
3. **`frontend/src/pages/student/CourseFee.jsx`**:
   - Line 87: Hardcodes Razorpay test placeholder key `key: 'rzp_test_placeholder'` in client options instead of utilizing `key_id` returned from `/api/payment/create-order`.

---

## 13. Known Placeholder / Mock Workflows

The following sections and components in the repository currently operate on mock, static, or simulated workflows:

### Frontend Mock Workflows
1. **Student Academic Calendar (`frontend/src/pages/student/AcademicCalendar.jsx`)**:
   - Defines `const events = []`. Does not connect to backend `/api/student/classes` or any academic event API.
2. **Student Examinations (`frontend/src/pages/student/Exams.jsx`)**:
   - Hardcoded arrays `upcomingExams` and `pastResults`. Backend has an admin exam table, but no student exam inquiry or submission endpoint.
3. **Student Subjects (`frontend/src/pages/student/Subject.jsx`)**:
   - Simulates API retrieval using `setTimeout(() => { setSubjects([]); setLoading(false); }, 500)`.
4. **Student Program Switch List (`frontend/src/pages/student/SwitchProgram.jsx`)**:
   - Existing switch requests are stored in a local React state array (`#SW-802`). The backend has no `GET` endpoint for program switch requests.
5. **Admin Attendance (`frontend/src/pages/admin/ManageAttendance.jsx`)**:
   - UI initialized with empty state array; no network requests to load or save attendance.
6. **Admin Tickets (`frontend/src/pages/admin/ManageTickets.jsx`)**:
   - Renders 3 static mock tickets (`#TKT-2041`, `#TKT-2038`, `#TKT-2035`). No API connection.
7. **Admin Live Classes (`frontend/src/pages/admin/ManageLiveClass.jsx`)**:
   - Displays 3 static live classes. Launching a class opens an embedded `meet.jit.si` iframe without database synchronization.
8. **Admin Notifications (`frontend/src/pages/admin/ManageNotifications.jsx`)**:
   - Renders 4 static mock notification broadcasts. Has no connection to backend `notifications` table.
9. **Admin Program Switch Management (`frontend/src/pages/admin/ManageProgramSwitches.jsx`)**:
   - Renders static mock requests (`#SW-802`, `#SW-803`). No backend API endpoint exists for admin program switch approval.
10. **Admin Blogs & Categories (`frontend/src/pages/admin/ManageBlogs.jsx`, `ManageBlogCategories.jsx`)**:
    - Both pages operate completely on hardcoded in-memory arrays.
11. **Admin Queries & Leads (`frontend/src/pages/admin/ManageQueries.jsx`)**:
    - Renders 5 static leads (`#QRY-501` to `#QRY-801`). No backend table or API.
12. **Admin Doubt Sessions (`frontend/src/pages/admin/ManageDoubtSessions.jsx`)**:
    - Renders static doubts (`#DBT-104` to `#DBT-106`).
13. **Admin Calendar (`frontend/src/pages/admin/AcademicCalendar.jsx`)**:
    - Renders 4 static events.
14. **Admin Pending Admissions (`frontend/src/pages/admin/PendingAdmissions.jsx`)**:
    - Renders 4 static admission applications (`REQ-1001` to `REQ-1004`).
15. **Admin Student Details (`frontend/src/pages/admin/StudentDetails.jsx`)**:
    - Displays static profile for "Rahul Sharma" regardless of `:id` parameter.
16. **Admin Teachers List (`frontend/src/pages/admin/ManageTeachers.jsx`)**:
    - While `POST /api/admin/teachers` works, the table displaying active teachers is a hardcoded list of 4 faculty members (`FAC-001` to `FAC-004`).
17. **Open Admissions Form (`frontend/src/pages/admission/OpenAdmissions.jsx`)**:
    - Form submission handler executes `console.log('Form submitted:', formData)` and `alert()`. No backend call is performed.

### Backend Stubs
1. **`adminController.getAttendance`**: Returns `{ success: true, data: [] }`.
2. **`adminController.markAttendance`**: Returns `{ success: true, message: 'Attendance marked' }` without database execution.
3. **`adminController.getAllTickets`**: Returns `{ success: true, data: [] }`.
4. **`adminController.updateTicketStatus`**: Returns `{ success: true, message: 'Ticket updated' }` without database execution.
5. **`adminController.getLiveClasses`**: Returns `{ success: true, data: [] }`.
6. **`adminController.scheduleLiveClass`**: Returns `{ success: true, message: 'Class scheduled' }` without database execution.
7. **`dataController.getSecureData`**: Returns message string without business logic.
8. **`utils/mailer.js`**: `sendMail` logs to console without sending email.

---

## 14. Production Configuration Notes

### Environment Variables & Secrets Security
- Ensure all environment variables listed in Section 1 are populated in production environments without fallbacks.
- Never commit `.env` or configuration secrets to source control.
- Ensure `JWT_SECRET` is set to a cryptographically secure random string with minimum 256-bit entropy.

### CORS Security
- `backend/server.js` currently specifies `app.use(cors())`, allowing wildcard `*` cross-origin requests.
- For production deployment, update CORS configuration to explicitly whitelist the production frontend domain:
  ```javascript
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://aarambhinstitute.com',
    credentials: true
  }));
  ```

### API Base URL & Routing in Production
- Vite proxy (`vite.config.js`) only operates in local development (`npm run dev`).
- For production builds (`npm run build`), the frontend needs either:
  1. A reverse proxy configuration (e.g. Nginx or Cloudflare) routing `/api` to the Node.js process on port `5000`.
  2. Or updating `frontend/src/services/api.js` to utilize `import.meta.env.VITE_API_BASE_URL`.
- Hardcoded `http://localhost:5000` URLs in `BlogList.jsx` and `BlogSingle.jsx` **will fail** in production and must be replaced with relative `/api` paths or configured environment variables.

### Payment Gateway Hardening
- Client Razorpay key in `CourseFee.jsx` must be replaced with the dynamic `key_id` returned from `/api/payment/create-order`.
- A Razorpay Webhook endpoint should be implemented to capture asynchronous payment confirmations in the event a user closes the browser prior to `payment/verify` execution.
- Implement a dedicated `itemType: 'fee'` flow in `paymentController.verifyPayment` so fee installment payments properly update `fee_installments` and `student_fees`.

### Database Connection & Pooling
- `backend/config/db.js` utilizes `mysql2/promise` with a connection pool (limit 10).
- In production, monitor MySQL connection limits and consider adjusting `connectionLimit` based on expected concurrent API traffic.
- All seed scripts and database maintenance scripts have been hardened to use required environment variables (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).

### Rate Limiting & Denial of Service Protection
- Rate limiting is currently implemented in application logic for OTP generation (`otp_rate_limits` table: max 3 attempts per 2 hours per email).
- For production, recommend implementing Express-level IP rate limiting (such as `express-rate-limit`) on `/api/auth/*` and public submission routes to prevent brute force or resource exhaustion attacks.
