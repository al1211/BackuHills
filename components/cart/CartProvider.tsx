'use client';

// src/components/cart/CartProvider.tsx
// Cart ka data: kya daala, kitna, kaun sa size. Browser mein save hota hai (localStorage).
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { StoreProduct } from '@/app/types';

export interface CartLine {
  key: string; // product id + size, ek hi product alag size ho to alag line
  productId: string;
  title: string;
  price: number;
  image: string;
  size?: string;
  qty: number;
  href: string; // store par product ka path
  variantId?: string;
}

interface AddOptions {
  size?: string;
  qty?: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number; // kul items
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: StoreProduct, options?: AddOptions) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const STORAGE_KEY = 'backum-cart-v1';
export const MAX_QTY = 10;

const CartContext = createContext<CartContextValue | null>(null);

// Saved data kharab ho to cart ko crash nahi hone dete
const isCartLine = (value: unknown): value is CartLine => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.key === 'string' &&
    typeof v.productId === 'string' &&
    typeof v.title === 'string' &&
    typeof v.price === 'number' &&
    typeof v.image === 'string' &&
    typeof v.qty === 'number' &&
    typeof v.href === 'string'
  );
};

const clampQty = (qty: number) => Math.min(MAX_QTY, Math.max(1, Math.floor(qty)));

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Page load hone ke baad saved cart padhte hain
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setLines(parsed.filter(isCartLine).map((l) => ({ ...l, qty: clampQty(l.qty) })));
      }
    } catch {
      // Storage band ho sakta hai, tab cart khali se shuru hota hai
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines, ready]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback((product: StoreProduct, options: AddOptions = {}) => {
    const { size, qty = 1 } = options;
    const key = `${product.id}|${size ?? ''}`;

    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: clampQty(l.qty + qty) } : l
        );
      }
      const line: CartLine = {
        key,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0] ?? '',
        size,
        qty: clampQty(qty),
        href: product.href,
        variantId: product.variantId,
      };
      return [...prev, line];
    });
    setIsOpen(true); // add karte hi cart dikhao
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, qty: clampQty(qty) } : l)));
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      subtotal: lines.reduce((sum, l) => sum + l.price * l.qty, 0),
      isOpen,
      open,
      close,
      add,
      setQty,
      remove,
      clear,
    }),
    [lines, isOpen, open, close, add, setQty, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart ko <CartProvider> ke andar use karein (layout.tsx mein lagayein).');
  return ctx;
}