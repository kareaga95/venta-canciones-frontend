const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Función auxiliar para realizar solicitudes al backend
 */
async function fetchUser(pathName, method = "GET", body = null) {
    try {
        const url = `${BASE_URL}${pathName}`;
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en fetchUser:", error);
        throw error;
    }
}

/**
 * Actualiza el estado (activo/inactivo) de un usuario
 */
export async function updateUserStatus(userId, active) {
    console.log("ENTRA UPDATE USER STATUS", userId, active);
    return await fetchUser(`/users/${userId}/status`, "PATCH", { active });
}

export default {
    updateUserStatus
};
