import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/about/AboutUs';
import Founder from './pages/about/Founder';
import Director from './pages/about/Director';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';
import MainLayout from './components/layouts/MainLayout';
import StudentLayout from './components/layouts/StudentLayout';
import AdminLayout from './components/layouts/AdminLayout';
import TeacherLayout from './components/layouts/TeacherLayout';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import MyClasses from './pages/teacher/MyClasses';
import Assignments from './pages/teacher/Assignments';
import Students from './pages/teacher/Students';
import TeacherNotifications from './pages/teacher/Notifications';
import StudentDashboard from './pages/student/StudentDashboard';
import Profile from './pages/student/Profile';
import LiveClasses from './pages/student/LiveClasses';
import StudyMaterials from './pages/student/StudyMaterials';
import BrowseCourses from './pages/student/BrowseCourses';
import Exams from './pages/student/Exams';
import StudentCalendar from './pages/student/AcademicCalendar';
import SupportTicket from './pages/student/SupportTicket';
import DoubtSession from './pages/student/DoubtSession';
import SubmitFeedback from './pages/student/SubmitFeedback';
import Attendance from './pages/student/Attendance';
import Notifications from './pages/student/Notifications';
import Subject from './pages/student/Subject';
import CourseFee from './pages/student/CourseFee';
import SwitchProgramStudent from './pages/student/SwitchProgram';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllStudents from './pages/admin/AllStudents';
import StudentDetails from './pages/admin/StudentDetails';
import ManageLiveClass from './pages/admin/ManageLiveClass';
import ManageStudyMaterial from './pages/admin/ManageStudyMaterial';
import ManageCourses from './pages/admin/ManageCourses';
import ManageExams from './pages/admin/ManageExams';
import AdminCalendar from './pages/admin/AcademicCalendar';
import ManageTickets from './pages/admin/ManageTickets';
import ManageDoubtSessions from './pages/admin/ManageDoubtSessions';
import ManageQueries from './pages/admin/ManageQueries';
import ManageAttendance from './pages/admin/ManageAttendance';
import ManageNotifications from './pages/admin/ManageNotifications';
import ManageFinance from './pages/admin/ManageFinance';
import ManageProgramSwitches from './pages/admin/ManageProgramSwitches';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageBlogCategories from './pages/admin/ManageBlogCategories';
import PendingAdmissions from './pages/admin/PendingAdmissions';
import ManageTeachers from './pages/admin/ManageTeachers';
import MetaPixel from './components/common/MetaPixel/MetaPixel';
import ScrollToTop from './components/common/ScrollToTop';
import BlogList from './pages/blog/BlogList';
import BlogSingle from './pages/blog/BlogSingle';
import Masterclass from './pages/admission/Masterclass';
import MedicalAdmission from './pages/admission/MedicalAdmission';
import PGAdmission from './pages/admission/PGAdmission';
import UGAdmission from './pages/admission/UGAdmission';

// Course Pages
import Bbose10th from './pages/courses/Bbose10th';
import Bbose12th from './pages/courses/Bbose12th';
import Bosse10th from './pages/courses/Bosse10th';
import Bosse12th from './pages/courses/Bosse12th';
import Nios10th from './pages/courses/Nios10th';
import Nios12th from './pages/courses/Nios12th';
import NiosOnDemand from './pages/courses/NiosOnDemand';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import { Toaster } from 'react-hot-toast';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MetaPixel />
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: '#1e293b', color: '#fff' } }} />
      <Routes>
        {/* Public Routes with Main Website Header/Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/director" element={<Director />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id/:slug" element={<BlogSingle />} />
          <Route path="/admission" element={<Masterclass />} />
          <Route path="/masterclass" element={<Masterclass />} />
          <Route path="/UG-admission" element={<UGAdmission />} />
          <Route path="/PG-admission" element={<PGAdmission />} />
          <Route path="/medical-admission" element={<MedicalAdmission />} />

          {/* Course Pages */}
          <Route path="/bbose-10th" element={<Bbose10th />} />
          <Route path="/bbose-12th" element={<Bbose12th />} />
          <Route path="/bosse-10th" element={<Bosse10th />} />
          <Route path="/bosse-12th" element={<Bosse12th />} />
          <Route path="/nios-10th" element={<Nios10th />} />
          <Route path="/nios-12th" element={<Nios12th />} />
          <Route path="/nios-on-demand-exam" element={<NiosOnDemand />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Student Dashboard Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="" element={<StudentDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="live-classes" element={<LiveClasses />} />
          <Route path="materials" element={<StudyMaterials />} />
          <Route path="courses" element={<BrowseCourses />} />
          <Route path="exams" element={<Exams />} />
          <Route path="calendar" element={<StudentCalendar />} />
          <Route path="tickets" element={<SupportTicket />} />
          <Route path="doubts" element={<DoubtSession />} />
          <Route path="feedback" element={<SubmitFeedback />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="subjects" element={<Subject />} />
          <Route path="fees" element={<CourseFee />} />
          <Route path="switch-program" element={<SwitchProgramStudent />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        
        {/* Keeping old path for backward compatibility if needed, or redirect it */}
        <Route path="/student-dashboard" element={<StudentLayout />}>
           <Route path="" element={<StudentDashboard />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="pending-admissions" element={<PendingAdmissions />} />
          <Route path="students" element={<AllStudents />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="live-classes" element={<ManageLiveClass />} />
          <Route path="materials" element={<ManageStudyMaterial />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="exams" element={<ManageExams />} />
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="tickets" element={<ManageTickets />} />
          <Route path="doubts" element={<ManageDoubtSessions />} />
          <Route path="queries" element={<ManageQueries />} />
          <Route path="attendance" element={<ManageAttendance />} />
          <Route path="notifications" element={<ManageNotifications />} />
          <Route path="finance" element={<ManageFinance />} />
          <Route path="switch-program" element={<ManageProgramSwitches />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="blog-categories" element={<ManageBlogCategories />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="/admin-dashboard" element={<AdminLayout />}>
           <Route path="" element={<AdminDashboard />} />
        </Route>

        {/* Teacher Dashboard Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="" element={<TeacherDashboard />} />
          <Route path="classes" element={<MyClasses />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="students" element={<Students />} />
          <Route path="notifications" element={<TeacherNotifications />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
