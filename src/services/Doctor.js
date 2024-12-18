// src/services/DoctorService.js
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



