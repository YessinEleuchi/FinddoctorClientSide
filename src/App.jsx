import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

// Pages Import
import Home from './pages/Home.jsx';
import Doctors from './pages/Doctors.jsx';
import Login from './pages/Login.jsx';
import MyProfile from './pages/MyProfile.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
import Appointment from "./pages/Appointment.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./pages/Register.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminNav from "./components/AdminNav.jsx";

function App() {
    const location = useLocation();

    // List of routes without Navbar and Footer
    const noNavFooterRoutes = ['/admin/login'];

    // List of routes with AdminNav
    const adminRoutes = ['/admin/login'];

    // Check if the current route matches
    const isNoNavFooterRoute = noNavFooterRoutes.includes(location.pathname);
    const isAdminRoute = adminRoutes.includes(location.pathname);

    return (
        <>
            {/* Conditionally render Navbar */}
            {!isNoNavFooterRoute && <Navbar />}

            {/* Conditionally render AdminNav */}
            {isAdminRoute && <AdminNav />}

            {/* Main Content */}
            <div className={`mx-4 sm:mx-[10%] ${isNoNavFooterRoute ? 'h-full' : ''}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/doctors/:speciality" element={<Doctors />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/my-appointments" element={<MyAppointments />} />
                    <Route path="/appointments/:docId" element={<Appointment />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                </Routes>
            </div>

            {/* Conditionally render Footer */}
            {!isNoNavFooterRoute && <Footer />}
        </>
    );
}

export default App;
