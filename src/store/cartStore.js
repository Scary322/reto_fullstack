import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  userId: null,

  setUser: (userId) => {
    // Guardar el carrito actual si hay userId anterior
    if (get().userId) {
      localStorage.setItem(`cart-${get().userId}`, JSON.stringify(get().items));
    }
    // Cargar el carrito del nuevo userId o vacío si null
    const saved = userId ? localStorage.getItem(`cart-${userId}`) : null;
    set({ items: saved ? JSON.parse(saved) : [], userId });
  },

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
    // Guardar en localStorage si hay userId
    if (get().userId) {
      localStorage.setItem(`cart-${get().userId}`, JSON.stringify(get().items));
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter(item => item.product.id !== id) });
    // Guardar en localStorage si hay userId
    if (get().userId) {
      localStorage.setItem(`cart-${get().userId}`, JSON.stringify(get().items));
    }
  },

  clearCart: () => {
    set({ items: [] });
    // Guardar en localStorage si hay userId
    if (get().userId) {
      localStorage.setItem(`cart-${get().userId}`, JSON.stringify([]));
    }
  },

  getTotalItems: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce(
      (sum, item) =>
        sum + parseFloat(item.product.price) * item.quantity,
      0
    ),
}));

export default useCartStore;