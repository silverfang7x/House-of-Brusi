import { create } from 'zustand';

export interface CartItem {
  id: string;
  variantId: string;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [
    { id: 'demo-item-1', variantId: 'HOB-SAH-SND-M', quantity: 1 },
    { id: 'demo-item-2', variantId: 'HOB-JAC-IND-L', quantity: 1 },
  ],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addItem: (newItem) =>
    set((state) => {
      const existing = state.items.find((i) => i.variantId === newItem.variantId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantId === newItem.variantId
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, newItem] };
    }),
  removeItem: (variantId) =>
    set((state) => ({
      items: state.items.filter((i) => i.variantId !== variantId),
    })),
  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
