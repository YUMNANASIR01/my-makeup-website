import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  [x: string]: string | number | null | undefined;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (index) =>
        set((state) => {
          const updated = [...state.items];
          updated.splice(index, 1);
          return { items: updated };
        }),
      clearCart: () => set({ items: [] }),

      increaseQuantity: (index) =>
        set((state) => {
          const updated = [...state.items];
          updated[index].quantity += 1;
          return { items: updated };
        }),

      decreaseQuantity: (index) =>
        set((state) => {
          const updated = [...state.items];
          if (updated[index].quantity > 1) {
            updated[index].quantity -= 1;
          }
          return { items: updated };
        }),
    }),
    { name: 'cart-storage' }
  )
);
