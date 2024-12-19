import React from 'react';
import { assets } from "../assets/assets_frontend/assets.js";

const About = () => {
    return (
        <>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>
                    ABOUT <span className="text-gray-700 font-medium">US</span>
                </p>
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-12 px-4 md:px-10">
                {/* Image */}
                <img className="w-full md:max-w-[360px] rounded-lg shadow-lg" src={assets.about_image} alt="About DoctorTN" />

                {/* Text Content */}
                <div className="flex flex-col justify-start gap-6 md:w-2/4 text-sm text-gray-600 text-left text-justify">
                    <p>
                        Welcome to DoctorTN, your trusted partner in managing your healthcare needs conveniently and efficiently. At DoctorTN, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                    </p>
                    <p>
                        DoctorTN is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, DoctorTN is here to support you every step of the way.
                    </p>
                    <b className="text-gray-800 text-lg">Our Vision</b>
                    <p>
                        Our vision at DoctorTN is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                    </p>
                </div>
            </div>
        </>
    );
};

export default About;
