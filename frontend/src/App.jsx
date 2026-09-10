import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/about/AboutUs';
import Founder from './pages/about/Founder';
import Director from './pages/about/Director';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import FloatingButtons from './components/common/FloatingButtons/FloatingButtons';
import MetaPixel from './components/common/MetaPixel/MetaPixel';
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

function App() {
  return (
    <Router>
      <MetaPixel />
      <Header />
      <Routes>
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
      </Routes>
      <FloatingButtons />
      <Footer />
    </Router>
  );
}

export default App;
