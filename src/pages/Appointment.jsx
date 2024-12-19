import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets_frontend/assets.js";
import RelatedDoctors from "../components/RelatedDoctors.jsx";

const Appointment = () => {
    const { docId } = useParams(); // Récupère l'ID du médecin depuis l'URL
    const [docInfo, setDocInfo] = useState(null); // Stocke les informations du médecin
    const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement
    const [error, setError] = useState(null); // Stocke les erreurs éventuelles
    const [appointments, setAppointments] = useState([]); // Stocke les rendez-vous disponibles
    const [SlotIndex, setSlotIndex] = useState(null); // Gère l'index du créneau sélectionné
    const [slotTime, setSlotTime] = useState(null); // Gère l'heure du créneau sélectionné

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    useEffect(() => {
        // Fonction pour récupérer les informations du médecin par ID
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`http://localhost:5259/api/Appointments/GetDoctorById/${docId}`);
                setDocInfo(response.data); // Stocker les données du médecin
                setAppointments(response.data.availableAppointments.$values); // Stocker les rendez-vous
            } catch (err) {
                setError(err.response?.data?.message || "Erreur inattendue."); // Gérer les erreurs
            } finally {
                setLoading(false); // Désactiver l'indicateur de chargement
            }
        };
        fetchDoctor(); // Appeler la fonction
    }, [docId]); // Recharger si docId change

    if (loading) {
        return <div className="text-center py-8">Chargement des données...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    if (!docInfo) {
        return <div className="text-center py-8 text-red-500">Médecin introuvable.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Détails du médecin */}
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
                            <span>Image indisponible</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 border border-gray-200 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                    <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                        Dr. {docInfo.firstName} {docInfo.lastName}
                        {assets.verified_icon && (
                            <img className="w-5 " src={assets.verified_icon} alt="Verified"/>
                        )}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">{docInfo.speciality}</p>
                    <p className="text-gray-700 text-sm mt-2">
                        Adresse: {docInfo.adress || "Non renseignée"}
                    </p>
                    <p className="text-gray-700 text-sm mt-2">
                        Téléphone: {docInfo.phoneNumber || "Non renseigné"}
                    </p>
                    <p>
                        Appointment fee: {docInfo.fees} DT
                    </p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow hover:bg-blue-600">
                        {docInfo.experience} Years
                    </button>
                </div>
            </div>

            {/* Affichage des rendez-vous disponibles */}
            <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                <p>Rendez-vous disponibles</p>
                <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                    {appointments.length > 0 && appointments.map((appointment, index) => (
                        <div
                            className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${SlotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
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

                {/* Affichage des horaires disponibles */}
                <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 ">
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
                <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment </button>
            </div>
            {/*Related doctors */}
            <RelatedDoctors docId={docId}  speciality={docInfo.speciality}/>
        </div>
    );
};

export default Appointment;
