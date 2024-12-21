import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext.jsx";

const TopDoctors = () => {
    const [loading, setLoading] = useState(true); // État de chargement
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    const handleNavigation = () => {
        navigate('/doctors');  // Navigate to the '/doctors' page
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    return (
        <div className="flex flex-col items-center gap-8 my-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium text-center">Top Doctors to Book</h1>
            <p className="sm:w-1/3 text-center text-sm mb-8">
                Simply browse through our extensive list of trusted doctors.
            </p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3 sm:px-0">
                {doctors.slice(0, 10).map((doctor) => (
                    <div
                        onClick={() => {navigate(`/appointments/${doctor.id}`);scrollTo(0,0)}}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                        key={doctor.id}
                    >
                        <img
                            className="w-full h-64 object-cover bg-blue-50"
                            src={`http://localhost:5259${doctor.profileImagePath}`}
                            alt={`${doctor.firstName} ${doctor.lastName}`}
                        />
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-sm text-center text-green-500 mb-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <p>Available</p>
                            </div>
                            <p className="text-gray-900 text-lg font-medium text-center">
                                Dr. {doctor.firstName} {doctor.lastName}
                            </p>
                            <p className="text-gray-600 text-sm text-center">{doctor.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={handleNavigation}
                className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
            >
                More
            </button>
        </div>
    );
};

export default TopDoctors;
