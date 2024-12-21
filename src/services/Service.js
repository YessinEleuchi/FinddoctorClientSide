// src/services/Service.js
import axios from "../assets/Api/axios";

const API_BASE_URL = "http://localhost:5259/api/";

export const registerDoctor = async (doctorData) => {
  return await axios.post(`${API_BASE_URL}Account/register/doctor`, doctorData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
  });
};

export const adminCreateAdminUser = async (adminData) => {
  return await axios.post(`${API_BASE_URL}Account/AdminCreateAdminUser`, adminData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
  });
};

export const registerPatient = async (patientData) => {
  return await axios.post(`${API_BASE_URL}Account/Register`, patientData);
};

export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}Authentication/Login`, loginData);

    // Assuming the response contains a token field
    const token = response.data.token;

    // Store the token in localStorage
    if (token) {
      localStorage.setItem("token", token);
      console.log("Token saved to localStorage:", token);
    } else {
      console.error("Token not found in the response");
    }

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};


export const logout = async () => {
  localStorage.removeItem("CC_Token");
  localStorage.removeItem("user");
};

export const searchDoctors = async (criteria) => {
  return await axios.get(`${API_BASE_URL}Account/SearchDoctors?critere=${criteria}`);
};


// Mettre à jour un utilisateur
export const updateUser = async (userData) => {
  return await axios.put(`${API_BASE_URL}User/UpdateUser`, userData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
  });
};

// Supprimer un utilisateur
export const deleteUser = async (username) => {
  return await axios.delete(`${API_BASE_URL}User/DeleteUser/${username}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
  });
};

// Fonction pour obtenir tous les utilisateurs (uniquement pour les admins)
export const getAllUsers = async (pageNumber = 1, pageSize = 10) => {
  return await axios.get(`${API_BASE_URL}User/GetAllUsers`, {
    params: { pageNumber, pageSize },
    headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
  });
};

// Fonction pour obtenir les détails du profil de l'utilisateur connecté
export const getProfileDetails = async () => {
  return await axios.get(`${API_BASE_URL}User/GetProfileDetails`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
  });
};



