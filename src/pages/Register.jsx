import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPatient } from "../services/Service.js";

const RegisterPatient = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "",
        adress: "",
        age: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordErrors, setPasswordErrors] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
        specialChar: false,
    });

    const [showErrors, setShowErrors] = useState(false);

    const navigate = useNavigate();

    // Gérer les modifications de champs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Vérification des critères de mot de passe
        if (name === "password") {
            const errors = {
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                lowercase: /[a-z]/.test(value),
                digit: /[0-9]/.test(value),
                specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            };
            setPasswordErrors(errors);
            setShowErrors(Object.values(errors).some((error) => !error));
        }
    };

    // Vérifie si le formulaire est valide
    const isFormValid = () => {
        const { password, confirmPassword } = formData;
        const isPasswordValid = Object.values(passwordErrors).every((error) => error);
        const isPasswordMatch = password === confirmPassword;
        return isPasswordValid && isPasswordMatch;
    };

    // Soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await registerPatient(formData);
            alert("Registration successful");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
                <div className="max-w-4xl w-full mx-auto border border-gray-300 rounded-2xl p-8 bg-white shadow-md">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700">Patient Registration</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                                <input
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter your first name"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter your last name"
                                    required
                                />
                            </div>

                            {/* Username */}
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Address</label>
                                <input
                                    name="adress"
                                    type="text"
                                    value={formData.adress}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter your address"
                                    required
                                />
                            </div>

                            {/* Age */}
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Age</label>
                                <input
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter your age"
                                    required
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            {/* Password */}
                            <div className="col-span-2">
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter password"
                                    required
                                />
                                {showErrors && (
                                    <ul className="mt-2 text-sm text-red-600">
                                        {!passwordErrors.length && <li>✘ At least 8 characters</li>}
                                        {!passwordErrors.uppercase && <li>✘ At least one uppercase letter</li>}
                                        {!passwordErrors.lowercase && <li>✘ At least one lowercase letter</li>}
                                        {!passwordErrors.digit && <li>✘ At least one digit</li>}
                                        {!passwordErrors.specialChar && <li>✘ At least one special character</li>}
                                    </ul>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="col-span-2">
                                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Confirm password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={!isFormValid()}
                                className={`w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white ${
                                    isFormValid() ? "bg-primary -600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                                } focus:outline-none`}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPatient;
