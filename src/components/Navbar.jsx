import React, {useState} from 'react';
import { assets } from '../assets/assets_frontend/assets.js';
import {NavLink, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] =useState(false);
    const [token , setToken] = useState(true);

    return (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
            {/* Logo */}
            <img
                className="w-44 cursor-pointer"
                src={assets.logo}
                alt="logo"
                onClick={() => navigate('/')}
            />

            {/* Navigation Links */}
            <ul className="flex space-x-8">
                <li>
                    <NavLink
                        to="/"
                        activeClassName="text-blue-500"
                        className="hover:text-blue-400"
                    >
                        HOME
                    </NavLink>
                    <hr className="border-gray-300 mt-2" />
                </li>
                <li>
                    <NavLink
                        to="/doctors"
                        activeClassName="text-blue-500"
                        className="hover:text-blue-400"
                    >
                        ALL DOCTORS
                    </NavLink>
                    <hr className="border-gray-300 mt-2" />
                </li>
                <li>
                    <NavLink
                        to="/about"
                        activeClassName="text-blue-500"
                        className="hover:text-blue-400"
                    >
                        ABOUT
                    </NavLink>
                    <hr className="border-gray-300 mt-2" />
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        activeClassName="text-blue-500"
                        className="hover:text-blue-400"
                    >
                        CONTACT
                    </NavLink>
                    <hr className="border-gray-300 mt-2" />
                </li>
            </ul>

            {/* Create Account Button */}
            <div>
                <div>
                    {token ? (
                        <div className="flex items-center gap-2 cursor-pointer relative">
                            {/* Profil utilisateur et icône du menu déroulant */}
                            <img
                                className="w-8 h-8 rounded-full"
                                src={assets.profile_pic}
                                alt="Profile"
                            />
                            <img
                                className="w-3 h-3"
                                src={assets.dropdown_icon}
                                alt="Dropdown Icon"
                                onClick={() => setShowMenu((prev) => !prev)} // Toggle menu
                            />

                            {/* Menu déroulant */}
                            {showMenu && (
                                <div
                                    className="absolute top-12 right-0 bg-white border border-gray-200 shadow-lg rounded-lg z-20">
                                    <ul className="min-w-48 py-2">
                                        <li
                                            onClick={() => {
                                                navigate('/my-profile');
                                                setShowMenu(false);
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                                        >
                                            My Profile
                                        </li>
                                        <li
                                            onClick={() => {
                                                navigate('/my-appointments');
                                                setShowMenu(false);
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                                        >
                                            My Appointments
                                        </li>
                                        <li
                                            onClick={() => {
                                                setToken(false);
                                                setShowMenu(false);
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Create Account
                        </button>
                    )}
                </div>


            </div>
        </div>
    );
};

export default Navbar;
