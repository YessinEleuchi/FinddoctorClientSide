import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets_frontend/assets.js";

const Appointment = () => {
    const { docId } = useParams(); // Récupère l'ID du docteur depuis l'URL
    const { doctors } = useContext(AppContext); // Liste des docteurs provenant du contexte
    const [docInfo, setDocInfo] = useState(null); // État pour stocker les infos du docteur
    const [loading, setLoading] = useState(true); // État pour gérer le chargement

    useEffect(() => {
        if (doctors && docId) {
            // Recherche le docteur par ID
            const foundDoctor = doctors.find((doc) => doc.id === docId);
            setDocInfo(foundDoctor);
            console.log(foundDoctor);
        }
        setLoading(false); // Arrête l'indicateur de chargement
    }, [doctors, docId]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Détails du médecin */}
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Image du médecin */}
                <div className="w-full sm:w-1/3">
                    <img
                        className="w-full h-auto rounded-lg shadow-lg"
                        src={`http://localhost:5259${docInfo.profileImagePath}`}
                        alt={`Dr. ${docInfo.firstname} ${docInfo.lastame}`}
                    />
                </div>

                {/* Informations sur le médecin */}
                <div className="flex-1 border border-gray-200 rounded-lg p-6 bg-white shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        Dr. {docInfo.firstName} {docInfo.lastName}
                        {assets.verified_icon && (
                            <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
                        )}
                    </h2>
                    <p className="text-gray-600 text-sm mt-2">{docInfo.speciality}</p>
                    <p className="text-gray-700 text-sm mt-2">
                        Adresse: {docInfo.adress}
                    </p>
                    <p className="text-gray-700 text-sm mt-2">
                        Téléphone: {docInfo.phoneNumber}
                    </p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow hover:bg-blue-600">
                        {docInfo.experience} Années d'expérience
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
