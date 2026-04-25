import { create } from "zustand";
import products from "../mockdata/products";

export const useProductStore = create((set) => ({
    products: products,

    setProducts: (newProducts) => set({ products: newProducts }),
}));