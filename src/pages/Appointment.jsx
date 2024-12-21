import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx"; // Make sure this path is correct
import { assets } from "../assets/assets_frontend/assets.js";
import RelatedDoctors from "../components/RelatedDoctors.jsx";
import { bookAppointment } from "../services/Appointments.js";
import toast from "react-hot-toast";

const Appointment = () => {
    const { docId } = useParams();
    const { token } = useContext(AppContext); // Access token from context
    const [docInfo, setDocInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [slotIndex, setSlotIndex] = useState(null);
    const [slotTime, setSlotTime] = useState(null);

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const navigate = useNavigate();

    const fetchDoctor = async () => {
        try {
            const response = await axios.get(`http://localhost:5259/api/Appointments/GetDoctorById/${docId}`);
            setDocInfo(response.data);
            setAppointments(response.data.availableAppointments.$values);
        } catch (err) {
            setError(err.response?.data?.message || "Unexpected error.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, [docId]);

    if (loading) {
        return <div className="text-center py-8">Loading data...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    if (!docInfo) {
        return <div className="text-center py-8 text-red-500">Doctor not found.</div>;
    }

    const handleBookAppointment = async () => {
        if (!token) {
            toast.error("You need to be logged in to book an appointment");
            return navigate("/login");
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const patientId = decodedToken.userId;

        if (slotIndex === null || !slotTime) {
            toast.error("Please select a time slot");
            return;
        }

        const selectedAppointment = appointments[slotIndex];
        const appointmentData = {
            appointmentDateTime: selectedAppointment.appointmentDateTime,
            doctorId: docId,
            patientId: patientId,
        };

        try {
            const response = await bookAppointment(selectedAppointment.appointmentID, appointmentData);
            if (response) {
                toast.success("Appointment booked successfully");
                alert('Appointment booked successfully');
                // Optional: Refresh or update appointments list
                // fetchDoctor();  // Uncomment if you want to refresh appointments after booking
            }
        } catch (error) {
            toast.error(`Booking failed: ${error.response?.data?.message || "Unknown error"}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Doctor details */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div>
                    {docInfo.profileImagePath ? (
                        <img
                            className="bg-primary w-full sm:max-w-72 rounded-lg"
                            src={`http://localhost:5259${docInfo.profileImagePath}`}
                            alt={`Dr. ${docInfo.firstName} ${docInfo.lastName}`}
                        />
                    ) : (
                        <div className="w-full h-auto rounded-lg shadow-lg bg-gray-200 flex items-center justify-center">
                            <span>Image unavailable</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 border border-gray-200 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                    <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                        Dr. {docInfo.firstName} {docInfo.lastName}
                        {assets.verified_icon && (
                            <img className="w-5 " src={assets.verified_icon} alt="Verified" />
                        )}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">{docInfo.speciality}</p>
                    <p className="text-gray-700 text-sm mt-2">
                        Address: {docInfo.adress || "Not provided"}
                    </p>
                    <p className="text-gray-700 text-sm mt-2">
                        Phone: {docInfo.phoneNumber || "Not provided"}
                    </p>
                    <p>
                        Consultation fee: {docInfo.fees} DT
                    </p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow hover:bg-blue-600">
                        {docInfo.experience} Years
                    </button>
                </div>
            </div>

            {/* Available appointments */}
            <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                <p>Available Appointments</p>
                <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                    {appointments.length > 0 && appointments.map((appointment, index) => (
                        <div
                            className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
                            key={appointment.appointmentID}
                            onClick={() => {
                                setSlotIndex(index);
                                setSlotTime(new Date(appointment.appointmentDateTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }));
                            }}
                        >
                            <p>{daysOfWeek[new Date(appointment.appointmentDateTime).getDay()]}</p>
                            <p>{new Date(appointment.appointmentDateTime).getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Available times */}
                <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                    {appointments.length > 0 && appointments.map((appointment, index) => (
                        <p
                            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === new Date(appointment.appointmentDateTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            }) ? 'bg-primary text-white' : 'text-gray-400 border border-gray-400'}`}
                            key={appointment.appointmentID}
                        >
                            {new Date(appointment.appointmentDateTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    ))}
                </div>
                <button
                    onClick={handleBookAppointment}
                    className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
            </div>

            {/* Related doctors */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
    );
};

export default Appointment;
