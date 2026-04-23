import { create } from 'zustand';

const useCartStore = create((set, get) => ({
    items: [],

    addItem: (product, quantity) => {
        const existing = get().items.find(item => item.product.id === product.id);
        if (existing) {
            set({
                items: get().items.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            });
        } else {
            set({ items: [...get().items, { product, quantity }] });
        }
    },

    removeItem: (id) => {
        set({ items: get().items.filter(item => item.product.id !== id) });
    },

    clearCart: () => set({ items: [] }),

    getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

    getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0),
}));

export default useCartStore;
