import axios from "../assets/Api/axios";

const API_BASE_URL = "http://localhost:5259/api/";

// Récupérer tous les docteurs et filtrer les spécialités uniques
export const getSpecialities = async () => {
    const response = await axios.get(`${API_BASE_URL}User/GetAllDoctors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
    });

    // Extraire les spécialités uniques
    const specialities = Array.from(
        new Set(response.data.map((doctor) => doctor.speciality))
    );
    return specialities;
};

// Obtenir les médecins par spécialité
export const getDoctorsBySpeciality = async (Speciality) => {
    return await axios.get(
        `${API_BASE_URL}User/GetDoctorsBySpeciality?speciality=${Speciality}`,
        {
            headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
        }
    );
};
// Obtenir tous les médecins
export const getAllDoctors = async () => {
    return await axios.get(`${API_BASE_URL}User/GetAllDoctors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
    });
};
