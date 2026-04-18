import app from "./firebase.config.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(app);

export const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        // Retornar por orden de ID para que coincida con el array mock (id 1 a 5)
        return products.sort((a, b) => Number(a.id) - Number(b.id));
    } catch (error) {
        console.error("Error fetching products from Firestore:", error);
        return [];
    }
};
