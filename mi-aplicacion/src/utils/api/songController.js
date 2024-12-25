const BASE_URL = import.meta.env.VITE_BASE_URL;

async function fetchData(pathName, method = "GET", body = null) {
    console.log("BASE_URL:", BASE_URL);
    try {
        const url = new URL(`${BASE_URL}${pathName}`);
        const token = localStorage.getItem("authToken");

        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${token || ""}`,
            },
            body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url.toString(), options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

/**
 * Obtiene canciones filtradas o todas las canciones si no se especifican filtros.
 * 
 * @param {Object} filters - Filtros opcionales para buscar canciones.
 * @returns {Promise<Array>} - Lista de canciones.
 */
export async function getSongs(filters = {}) {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const pathName = `/songs?${queryParams}`;
        return await fetchData(pathName);
    } catch (error) {
        console.error("Error al obtener canciones:", error);
        throw error;
    }
}

/**
 * Obtiene una canción por su ID.
 * 
 * @param {number|string} songId - ID de la canción a obtener.
 * @returns {Promise<Object>} - Detalles de la canción.
 */
export async function getSongById(songId) {
    console.log("songId:", songId);
    try {
        return await fetchData(`/songs/${songId}`, "GET");
    } catch (error) {
        console.error(`Error al obtener la canción con ID ${songId}:`, error);
        throw error;
    }
}


/**
 * Crea una nueva canción.
 * 
 * @param {Object} songData - Datos de la nueva canción.
 * @returns {Promise<Object>} - Canción creada.
 */
export async function createSong(songData) {
    try {
        return await fetchData("/songs", "POST", songData);
    } catch (error) {
        console.error("Error al crear canción:", error);
        throw error;
    }
}

/**
 * Actualiza una canción existente.
 * 
 * @param {number|string} songId - ID de la canción a actualizar.
 * @param {Object} songData - Datos actualizados de la canción.
 * @returns {Promise<Object>} - Canción actualizada.
 */
export async function updateSong(songId, songData) {
    try {
        return await fetchData(`/songs/${songId}`, "PUT", songData);
    } catch (error) {
        console.error("Error al actualizar canción:", error);
        throw error;
    }
}

/**
 * Elimina una canción por su ID.
 * 
 * @param {number|string} songId - ID de la canción a eliminar.
 * @returns {Promise<Object>} - Confirmación de eliminación.
 */
export async function deleteSong(songId) {
    try {
        return await fetchData(`/songs/${songId}`, "DELETE");
    } catch (error) {
        console.error("Error al eliminar canción:", error);
        throw error;
    }
}

export const functions = {
    getSongs,
    createSong,
    updateSong,
    deleteSong,
    getSongById,
};

export default functions;