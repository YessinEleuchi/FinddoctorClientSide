import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Doctors = () => {
    const { speciality } = useParams();
    const navigate = useNavigate();
    const [filterDoc, setFilterDoc] = useState([]);
    const { doctors } = useContext(AppContext);

    // Appliquer le filtre selon la spécialité
    useEffect(() => {
        const filteredDoctors = speciality
            ? doctors.filter(doctor => doctor.speciality === speciality)
            : doctors;
        setFilterDoc(filteredDoctors);
    }, [doctors, speciality]);

    // Extraire les spécialités uniques des médecins
    const specialties = [...new Set(doctors.map(doctor => doctor.speciality))];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Texte introductif */}
            <p className="text-center text-xl font-semibold text-gray-800 mb-8">
                Browse through the doctors by their specialty.
            </p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar des spécialités */}
                <div className="w-full lg:w-1/4">
                    <div className="flex flex-col gap-4">
                        {specialties.map((specialty) => (
                            <button
                                key={specialty}
                                onClick={() => navigate(`/doctors/${specialty}`)}
                                className="text-left px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                            >
                                {specialty}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grille des docteurs */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3 sm:px-0">
                    {filterDoc.slice(0, 10).map((doctor) => (
                        <div
                            onClick={() => navigate(`/appointments/${doctor.id}`)}
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
            </div>
        </div>
    );
};

export default Doctors;
