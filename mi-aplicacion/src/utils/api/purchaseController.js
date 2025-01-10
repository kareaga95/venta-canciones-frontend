const BASE_URL = import.meta.env.VITE_BASE_URL;

async function fetchPurchase(pathName, method = "GET", body = null) {
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
        console.error("Error en fetchPurchases:", error);
        throw error;
    }
}

export async function getAllPurchasesByUserId() {
    try {
        return await fetchPurchase(`/purchases/user`, "GET");
    } catch (error) {
        console.error("Error obteniendo las compras del usuario:", error);
        throw error;
    }
}

export async function createPurchase(userId, songId) {
    try {
        console.log("Creando compra...", userId, songId);
        return await fetchPurchase("/purchases/new", "POST", { userId, songId });
    } catch (error) {
        console.error("Error creando la compra:", error);
        throw error;
    }
}

export default {
    getAllPurchasesByUserId,
    createPurchase,
};
