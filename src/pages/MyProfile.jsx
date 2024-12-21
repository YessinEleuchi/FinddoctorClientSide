import React, { useState, useEffect } from 'react';
import { getProfileDetails } from '../services/Service.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {assets} from "../assets/assets_frontend/assets.js";
import {updateUser} from "../services/Service.js";


const MyProfile = () => {
    const [userData, setUserData] = useState(null); // Initialiser les données utilisateur
    const [isEdit, setIsEdit] = useState(false); // Initialiser le mode édition

    // Fonction pour récupérer les détails du profil
    const fetchProfileDetail = async () => {
        try {
            const response = await getProfileDetails(); // Appel à l'API
            console.log('Données du profil :', response.data); // Debug des données reçues
            setUserData(response.data); // Mettre à jour l'état avec les données utilisateur
        } catch (error) {
            console.error('Erreur lors de la récupération du profil :', error);
            toast.error('Échec du chargement des détails du profil.'); // Notification d'erreur
        }
    };

    // Utilisation de useEffect pour appeler fetchProfileDetail au montage du composant
    useEffect(() => {
        fetchProfileDetail();
    }, []);

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            {/* Photo de profil */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src={assets.profile_pic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-500"
                />
                <h2 className="text-xl font-semibold mt-4">
                    {userData ? `${userData.firstName} ${userData.lastName}` : 'Chargement...'}
                </h2>
            </div>

            {/* Affichage ou modification des détails du profil */}
            <div className="space-y-4">
                {isEdit ? (
                    // Mode édition
                    <>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium">
                                Prénom :
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={userData?.firstName || ''}
                                onChange={(e) =>
                                    setUserData((prev) => ({...prev, firstName: e.target.value}))
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium">
                                Nom :
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={userData?.lastName || ''}
                                onChange={(e) =>
                                    setUserData((prev) => ({...prev, lastName: e.target.value}))
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email :
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full p-2 border rounded-md"
                                value={userData?.email || ''}
                                onChange={(e) =>
                                    setUserData((prev) => ({...prev, email: e.target.value}))
                                }
                            />
                        </div>
                        <button
                            onClick={async () => {
                                try {
                                    await updateUser(userData); // Mettre à jour les données utilisateur
                                    toast.success('Profil mis à jour avec succès.');
                                    setIsEdit(false); // Sortir du mode édition
                                } catch (error) {
                                    console.error('Erreur lors de la mise à jour :', error);
                                    toast.error('Échec de la mise à jour du profil.');
                                }
                            }}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Enregistrer
                        </button>
                    </>
                ) : (
                    // Mode lecture seule
                    <>
                        <p><strong>Prénom :</strong> {userData?.firstName || 'N/A'}</p>
                        <p><strong>Nom :</strong> {userData?.lastName || 'N/A'}</p>
                        <p><strong>Email :</strong> {userData?.email || 'N/A'}</p>
                        <button
                            onClick={() => setIsEdit(true)} // Activer le mode édition
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Modifier le profil
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

    export default MyProfile;
