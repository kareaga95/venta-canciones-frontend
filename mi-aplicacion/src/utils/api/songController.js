const BASE_URL = import.meta.env.VITE_BASE_URL;

async function fetchData(pathName, method = "GET", body = null) {
    console.log("BASE_URL:", BASE_URL);
    try {
        const url = new URL(`${BASE_URL}${pathName}`);
        const token = localStorage.getItem("authToken");

        const options = {
            method,
            headers: {
                ...(body instanceof FormData
                    ? { Authorization: `Bearer ${token || ""}` }
                    : {
                          "Content-Type": "application/json",
                          accept: "application/json",
                          Authorization: `Bearer ${token || ""}`,
                      }),
                },
            body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
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
 * Descarga una canción del backend.
 * 
 * @param {number|string} songId - ID de la canción que se quiere descargar.
 * @returns {Promise<void>} - No devuelve nada, solo maneja la descarga.
 */
export async function downloadSong(purchase) {
    try {
        console.log("SONG ID  ", purchase.song.id);
        const response = await fetch(`${BASE_URL}/songs/${purchase.song.id}/download`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al intentar descargar la canción");
        }

        
        const blob = await response.blob();

       
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${purchase.artist.name}-${purchase.song.title}.mp3`;
        link.click();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Error al intentar descargar la canción:", error);
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
        console.log("songData:", songData);
        return await fetchData("/songs/new", "POST", songData);
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
        console.log("LLEGA:", songData);
        return await fetchData(`/songs/${songId}/update`, "PUT", songData);
    } catch (error) {
        console.error("Error al actualizar canción:", error);
        throw error;
    }
}

/**
 * Obtiene todas las canciones de un artista por su ID.
 * 
 * @param {number|string} artistId - ID del artista.
 * @returns {Promise<Array>} - Lista de canciones del artista.
 */
export async function getSongsByArtistId(artistId) {
    try {
        console.log("SI LLEGA", artistId);
        return await fetchData(`/songs/artist/${artistId}`, "GET");
    } catch (error) {
        console.error("Error obteniendo las canciones del artista:", error);
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
        console.log("ENTRA EN ELIMINAR");
        return await fetchData(`/songs/${songId}/delete`, "DELETE");
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
    downloadSong,
    getSongsByArtistId
};

export default functions;