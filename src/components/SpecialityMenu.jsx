import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets.js';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    return (
        <div id="speciality" className="flex flex-col items-center gap-8 py-16 text-gray-800">
            {/* Title Section */}
            <h1 className="text-3xl font-semibold text-center">
                Find By Speciality
            </h1>
            <p className="sm:w-2/3 text-center text-sm sm:text-base">
                Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>

            {/* Specialities Grid */}
            <div className="flex sm:justify-center gap-6 pt-6 w-full overflow-x-auto">
                {specialityData.map((item, index) => (
                    <Link
                        onClick={() => window.scrollTo(0, 0)}
                        key={index}
                        to={`/doctors/${item.speciality}`}
                        className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 transition-transform transform hover:translate-y-[-8px] hover:scale-105 duration-300 ease-in-out"
                    >
                        {/* Image */}
                        <div className="w-24 h-24 mb-4">
                            <img
                                src={item.image} alt={""}
                                className="w-full h-full object-cover rounded-md shadow-md"
                            />
                        </div>
                        <p className="text-gray-800 font-medium text-center group-hover:text-primary">
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;
