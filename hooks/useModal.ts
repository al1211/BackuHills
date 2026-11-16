'use client';

// src/hooks/useModal.ts
// Drawer aur modal ka common kaam:
//  - peeche ka page scroll rokta hai
//  - Esc dabane par band karta hai
//  - Tab dabane par keyboard focus andar hi ghoomta hai
//  - band hone par focus wapas usi button par aata hai jisne kholi thi
import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useModal(
  open: boolean,
  onClose: () => void,
  containerRef: React.RefObject<HTMLElement | null>
) {
  // onClose har render par badal sakta hai, isliye ref mein rakhte hain
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Sirf wahi elements jo sach mein dikh rahe hain
    const getFocusable = () =>
      Array.from(containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => el.getClientRects().length > 0
      );

    // Khulte hi pehle button par focus
    const timer = window.setTimeout(() => {
      (getFocusable()[0] ?? containerRef.current)?.focus();
    }, 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab') return;

      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, containerRef]);
}