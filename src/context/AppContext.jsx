import { createContext, useEffect, useState } from "react";
import { getAllDoctors } from "../services/Doctor.js";
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]); // Liste des docteurs
    const [token, setToken] = useState(localStorage.getItem("CC_Token") || ""); // Gestion du token

    useEffect(() => {
        const fetchAllDoctors = async () => {
            try {
                const response = await getAllDoctors();
                console.log("Doctors data:", response.data); // Debug des données reçues
                console.log(token)

                // Extraire les docteurs depuis $values
                if (response.data && response.data.$values && Array.isArray(response.data.$values)) {
                    setDoctors(response.data.$values); // Mettre à jour les docteurs avec les données extraites
                } else {
                    console.error("Les données des docteurs sont mal formatées");
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchAllDoctors();
    }, []); // Le tableau vide [] signifie que cet effet s'exécute une seule fois

    const value = {
        doctors: doctors,
        token, // Inclure le token dans le contexte
        setToken, // Fournir une fonction pour mettre à jour le token
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
