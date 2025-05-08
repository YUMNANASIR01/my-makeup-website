// import { create } from 'zustand';

// export const useWishlistStore = create((set: (arg0: { (state: any): { items: any[]; }; (state: any): { items: any[]; }; }) => any) => ({
//   items: [], // Initial empty array for wishlist items

//   // Add item to wishlist
//   addItem: (item: any) => set((state) => ({ items: [...state.items, item] })),

//   // Remove item from wishlist
//   removeItem: (index: number) =>
//     set((state) => {
//       const newItems = [...state.items];
//       newItems.splice(index, 1);
//       return { items: newItems };
//     }),
// }));

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistItem {
  id: string;
  image: string;
  name: string;
  price: number;
  description: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({
        items: [...state.items, item]
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : sessionStorage)),
    }
  )
);