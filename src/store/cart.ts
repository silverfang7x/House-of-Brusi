import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  name: string;
  size: string;
  colorName: string;
  unitPricePaise: number;
  quantity: number;
  imageUrl: string;
  maxInventory: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  setHasHydrated: (status: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => { added: boolean; clamped: boolean };
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => { clamped: boolean };
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      setHasHydrated: (status: boolean) => set({ hasHydrated: status }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (itemData) => {
        const { items } = get();
        const existingIndex = items.findIndex((i) => i.variantId === itemData.variantId);
        const addQty = itemData.quantity ?? 1;

        if (existingIndex > -1) {
          const existingItem = items[existingIndex]!;
          const desiredQty = existingItem.quantity + addQty;
          const clampedQty = Math.min(desiredQty, existingItem.maxInventory);
          const wasClamped = desiredQty > existingItem.maxInventory;

          const updatedItems = [...items];
          updatedItems[existingIndex] = {
            ...existingItem,
            quantity: clampedQty,
            maxInventory: itemData.maxInventory || existingItem.maxInventory,
          };

          set({ items: updatedItems });
          return { added: true, clamped: wasClamped };
        } else {
          const clampedQty = Math.min(addQty, itemData.maxInventory);
          const wasClamped = addQty > itemData.maxInventory;
          const newItem: CartItem = {
            id: itemData.id || itemData.variantId,
            variantId: itemData.variantId,
            productId: itemData.productId,
            name: itemData.name,
            size: itemData.size,
            colorName: itemData.colorName,
            unitPricePaise: itemData.unitPricePaise,
            quantity: clampedQty,
            imageUrl: itemData.imageUrl,
            maxInventory: itemData.maxInventory,
          };

          set({ items: [...items, newItem] });
          return { added: true, clamped: wasClamped };
        }
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          set({ items: items.filter((i) => i.variantId !== variantId) });
          return { clamped: false };
        }

        const itemIndex = items.findIndex((i) => i.variantId === variantId);
        if (itemIndex === -1) return { clamped: false };

        const currentItem = items[itemIndex]!;
        const clampedQty = Math.min(quantity, currentItem.maxInventory);
        const wasClamped = quantity > currentItem.maxInventory;

        const updatedItems = [...items];
        updatedItems[itemIndex] = {
          ...currentItem,
          quantity: clampedQty,
        };

        set({ items: updatedItems });
        return { clamped: wasClamped };
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'house-of-brusi-cart',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Derived Selectors
export function selectItemCount(state: CartState): number {
  return state.items.reduce((acc, item) => acc + item.quantity, 0);
}

export function selectSubtotalPaise(state: CartState): number {
  return state.items.reduce((acc, item) => acc + item.unitPricePaise * item.quantity, 0);
}
