// src/services/Doctor.js
import axios from "../assets/Api/axios";

const API_BASE_URL = "http://localhost:5259/api/User/";

// Récupérer tous les docteurs
export const getAllDoctors = async () => {
    return await axios.get(`${API_BASE_URL}GetAllDoctors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
    });
};

// Supprimer un utilisateur par son nom d'utilisateur (username)
export const deleteUser = async (username) => {
    return await axios.delete(`${API_BASE_URL}DeleteUser/${username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
    });

};
export  const getDoctorById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5259/api/User/GetDoctorById/${docId}`);
        console.log(response.data)
        return response.data; // Retourne les données du médecin
    } catch (error) {
        console.error("Erreur lors de la récupération du médecin :", error.response?.data || error.message);
        throw error; // Relance l'erreur pour gérer les cas d'erreur dans le frontend
    }
};



