import MOCK_PRODUCTS from "../mockdata/products.js";

export const getProducts = async () => {
    try {
        // Simula una demora de red
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_PRODUCTS.sort((a, b) => Number(a.id) - Number(b.id));
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        // Simula una demora de red
        await new Promise(resolve => setTimeout(resolve, 300));
        const product = MOCK_PRODUCTS.find(p => p.id === Number(id));
        return product || null;
    } catch (error) {
        console.error("Error fetching product by id:", error);
        return null;
    }
};
