'use client';

// src/components/cart/CartButton.tsx
// Header ka bag icon. Items ki ginti badge mein dikhti hai.
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './CartProvider';

interface CartButtonProps {
  className?: string;
}

export const CartButton: React.FC<CartButtonProps> = ({ className = '' }) => {
  const { count, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={count > 0 ? `Open cart, ${count} ${count === 1 ? 'item' : 'items'}` : 'Open cart'}
      className={`relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#161619]/80 text-[#d1d1d6] transition-colors hover:border-white/30 hover:bg-[#202024] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] ${className}`}
    >
      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#c5a880] px-1 text-[10px] font-semibold leading-none text-[#111113]"
        >
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
};