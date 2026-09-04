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
      </Routes>
      <FloatingButtons />
      <Footer />
    </Router>
  );
}

export default App;
