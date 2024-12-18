import React from 'react';
import { assets } from '../assets/assets_frontend/assets.js';

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20 gap-8">
            {/* <!-- Left Side --> */}
            <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-[8vw]">
                {/* Title */}
                <p className="text-4xl md:text-5xl text-white font-semibold leading-tight">
                    YOUR HEALTH IS OUR PRIORITY
                </p>

                {/* Subtext with Image */}
                <div className="flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light">
                    <img className="w-28" src={assets.group_profiles} alt="Profiles" />
                    <p className="text-center md:text-left">
                        Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" />
                        schedule your appointment hassle-free.
                    </p>
                </div>

                {/* Button */}
                <a
                    href="#speciality"
                    className="flex items-center gap-2 bg-white px-8 py-3  rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 "
                >
                    Book an appointment
                    <img className="w-3" src={assets.arrow_icon} alt="Arrow" className="w-4" />
                </a>
            </div>

            {/* <!-- Right Side --> */}
            <div className="md:w-1/2 relative flex justify-center">
                <img
                    className="w-full md:w-auto md:absolute bottom-0 rounded-lg"
                    src={assets.header_img}
                    alt="Header Image"
                />
            </div>
        </div>
    );
};

export default Header;
