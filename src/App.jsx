import './App.css';
import { Route, Routes } from 'react-router-dom';
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

function App() {
    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="mx-4 sm:mx-[10%]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/doctors/:speciality" element={<Doctors />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/my-appointments" element={<MyAppointments />} />
                    <Route path="appointments/:doctorId"  element={<Appointment />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;
