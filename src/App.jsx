
import './App.css'
import {Route, Routes} from "react-router-dom";
import Doctors from "./pages/Doctors.jsx";
import Login from "./pages/Login.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Contact from "./pages/contact.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {

  return (
    <>
      <Navbar />
      <div className='Mx-4 sm:mx-[10%]'>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='Myappointments' element={<MyAppointments />} />
        </Routes>

      </div>


    </>
  )
}

export default App
