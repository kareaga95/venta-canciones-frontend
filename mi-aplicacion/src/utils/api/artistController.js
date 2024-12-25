const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Función auxiliar para realizar solicitudes al backend
 */
async function fetchArtist(pathName, method = "GET", body = null) {
    try {
        const url = `${BASE_URL}${pathName}`;
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Agrega el token si es necesario
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
        console.error("Error en fetchArtist:", error);
        throw error;
    }
}

/**
 * Obtiene la lista de todos los artistas
 */
export async function getAllArtists() {
    return await fetchArtist("/artists", "GET");
}

export async function getByArtistId(id) {
    return await fetchArtist(`/artists/artist/${id}`, "GET");
}


/**
 * Obtiene la información de un artista por el ID del usuario
 */
export async function getArtistByUserId(userId) {
    console.log("USERID ", userId);
    return await fetchArtist(`/artists/${userId}`, "GET");
}

/**
 * Crea un nuevo artista
 */
export async function createArtist(name) {
    console.log("NOMBREEE " , name);
    return await fetchArtist("/artists/new", "POST", { name });
}

/**
 * Actualiza la información de un artista
 */
export async function updateArtist(artistId, name) {
    return await fetchArtist(`/artists/${artistId}`, "PUT", { name });
}

/**
 * Actualiza el estado (activo/inactivo) de un artista
 */
export async function updateArtistStatus(artistId, active) {
    return await fetchArtist(`/artists/${artistId}/status`, "PATCH", { active });
}

export default {
    getAllArtists,
    getArtistByUserId,
    createArtist,
    updateArtist,
    updateArtistStatus,
    getByArtistId
};
