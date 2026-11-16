'use client';

// src/hooks/useWishlist.ts
// Dil wale button ka data browser mein save karta hai (localStorage).
import { useCallback, useEffect, useState } from 'react';

const KEY = 'backum-wishlist-v1';

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Page load hone ke baad saved list padhte hain
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setIds(parsed.filter((x): x is string => typeof x === 'string'));
      }
    } catch {
      // Storage band ho sakta hai (private mode), tab list khali se shuru hoti hai
    }
    setReady(true);
  }, []);

  // Har badlav par save karte hain, par pehli padhai ke baad hi
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      // ignore
    }
  }, [ids, ready]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, has, toggle, count: ids.length };
}