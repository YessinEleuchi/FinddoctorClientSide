import axios from "../assets/Api/axios";

const API_BASE_URL = "http://localhost:5259/api/Appointments"; // Replace with your backend URL

const getConfig = () => {
    const token = localStorage.getItem("CC_Token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Function to get paginated list of appointments
export const getAppointments = async (pageNumber = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
};

// Function to get a specific appointment by ID
export const getAppointmentById = async (appointmentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${appointmentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw error;
    }
};

// Function to get available appointments
export const getAvailableAppointments = async (pageNumber = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Available?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching available appointments:", error);
        throw error;
    }
};

// Function to book an appointment
export const bookAppointment = async (appointmentId, appointmentData) => {
    try {
        const config = getConfig();
        const response = await axios.put(
            `${API_BASE_URL}/Book/${appointmentId}`,
            appointmentData,
            config // Add headers to config object
        );
        return response.data;
    } catch (error) {
        console.error("Error booking appointment:", error);
        throw error;
    }
};

// Function to cancel an appointment
export const cancelAppointment = async (appointmentId) => {
    try {
        const config = getConfig();
        const response = await axios.put(
            `${API_BASE_URL}/${appointmentId}`,
            {},
            config // Add headers to config object
        );
        return response.data;
    } catch (error) {
        console.error("Error canceling appointment:", error);
        throw error;
    }
};

// Function to get the list of appointments for a doctor
export const getDoctorAppointments = async (pageNumber = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/doctor-appointments?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor's appointments:", error);
        throw error;
    }
};

// Function to download a document associated with an appointment
export const getAppointmentDocument = async (appointmentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${appointmentId}/document`, { responseType: "blob" });
        return response.data; // Use response.data to get binary file
    } catch (error) {
        console.error("Error fetching appointment document:", error);
        throw error;
    }
};

// Function to get the user's appointments
export const getMyAppointments = async (pageNumber = 1, pageSize = 10) => {
    try {
        const config = getConfig();
        const response = await axios.get(
            `${API_BASE_URL}/my-appointments?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
};
