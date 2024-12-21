import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx"; // Ensure AppContext is properly configured
import { getMyAppointments } from "../services/Appointments.js";
import {cancelAppointment}  from "../services/Appointments.js";

const MyAppointments = () => {
    const { doctors } = useContext(AppContext); // Get doctors from context
    const [appointments, setAppointments] = useState([]); // Store appointments in state
    const [loading, setLoading] = useState(true); // Handle loading state
    const [error, setError] = useState(null); // Handle errors

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true); // Start loading
                const data = await getMyAppointments(); // Fetch appointments data
                console.log("Fetched appointments:", data); // Debug the data

                // Validate data format
                if (data && Array.isArray(data.$values)) {
                    setAppointments(data.$values); // Update appointments
                } else {
                    console.error("Invalid data format:", data);
                    setError("Invalid data format.");
                }
            } catch (err) {
                setError("Failed to fetch appointments. Please try again later.");
                console.error("Error fetching appointments:", err);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchAppointments(); // Call the function on component mount
    }, []);

    // Function to filter doctors associated with appointments
    const getDoctorsFromAppointments = (appointments, doctors) => {
        const doctorIds = appointments.map(appointment => appointment?.doctorId); // Extract doctor IDs
        return doctors.filter(doctor => doctorIds.includes(doctor.id)); // Filter matching doctors
    };

    const doctorsForAppointments = getDoctorsFromAppointments(appointments, doctors);

    const formatDateTime = (dateTime) => {
        const dateObj = new Date(dateTime);
        const date = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const time = dateObj.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${date} at ${time}`;
    };
    const handleCancel = async (appointmentId) => {
        try {
            await cancelAppointment(appointmentId);
            // Remove the canceled appointment from state
            setAppointments(prevAppointments =>
                prevAppointments.filter(appointment => appointment.appointmentID !== appointmentId)
            );
            alert("Appointment canceled successfully.");
        } catch (error) {
            alert("Failed to cancel the appointment. Please try again.");
        }
    }

    if (loading) {
        return <div>Loading appointments...</div>; // Loading message
    }

    if (error) {
        return <div>{error}</div>; // Display error message if any
    }

    return (
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b text-left">My Appointments</p>
            {doctorsForAppointments.length > 0 ? (
                appointments.map((appointment, index) => {
                    const doctor = doctors.find(doc => doc.id === appointment.doctorId);
                    return (
                        <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b " key={index} >
                            <div>
                                <img
                                    className="w-32 bg-indigo-50"
                                    src={`http://localhost:5259${doctor?.profileImagePath}`}
                                    alt={`${doctor?.firstName} ${doctor?.lastName}`}

                                />
                            </div>
                            <div className="flex-1 text-sm text-zinc-600">
                                <p className="text-neutral-800 font-semibold"> Dr.{doctor?.firstName} {doctor?.lastName}</p>
                                <p>{doctor?.speciality}</p>
                                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                                <p className="text-xs">{doctor?.address}</p>
                                <p className="text-xs mt-1  "><span className="text-sm text-neutral-700 font-medium   " >Date & Time:</span> {formatDateTime(appointment.appointmentDateTime)}</p>
                            </div>
                            <div> </div>
                            <div className="flex flex-col gap-2 justify-end">
                                <button className="text-sm text stroke-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 "> Pay Online</button>
                                <button className="text-sm text stroke-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-700 hover:text-white transition-all duration-300"
                                onClick={() => handleCancel(appointment.appointmentID)}>Cancel Appointment</button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No doctors found for your appointments.</p>
            )}
        </div>
    );
};

export default MyAppointments;
