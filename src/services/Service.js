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
  return await axios.post(`${API_BASE_URL}Authentication/Login`, loginData);
};

export const logout = async () => {
  localStorage.removeItem("CC_Token");
  localStorage.removeItem("user");
};

export const searchDoctors = async (criteria) => {
  return await axios.get(`${API_BASE_URL}Account/SearchDoctors?critere=${criteria}`);
};
// src/services/Service.js

// Obtenir tous les utilisateurs avec leurs rôles
export const getAllUsers = async (pageNumber = 1, pageSize = 10) => {
  return await axios.get(
      `${API_BASE_URL}User/GetAllUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("CC_Token")}` },
      }
  );
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





