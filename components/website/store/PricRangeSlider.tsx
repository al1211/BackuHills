'use client';

// src/components/store/PriceRangeSlider.tsx
// Dono taraf se khinchne wala price slider. Keyboard (arrow keys) se bhi chalta hai.
import React, { useEffect, useRef, useState } from 'react';
import { formatPrice } from '../../../app/(website)/lib/store';

interface PriceRangeSliderProps {
  min: number; // slider ki sabse kam limit
  max: number; // slider ki sabse zyada limit
  valueMin: number | null; // abhi laagi hui limit (null = koi nahi)
  valueMax: number | null;
  onCommit: (min: number | null, max: number | null) => void;
  step?: number;
}

// Dono gol thumbs ki styling (Chrome/Safari aur Firefox, dono ke liye)
const thumbClass =
  'pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent outline-none ' +
  '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 ' +
  '[&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full ' +
  '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0e0e10] [&::-webkit-slider-thumb]:bg-[#c5a880] ' +
  '[&::-webkit-slider-thumb]:shadow-md ' +
  '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 ' +
  '[&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 ' +
  '[&::-moz-range-thumb]:border-[#0e0e10] [&::-moz-range-thumb]:bg-[#c5a880] ' +
  'focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-white';

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  valueMin,
  valueMax,
  onCommit,
  step = 50,
}) => {
  const [lo, setLo] = useState(valueMin ?? min);
  const [hi, setHi] = useState(valueMax ?? max);

  // Bahar se (URL se) value badle to slider bhi badle
  useEffect(() => {
    setLo(valueMin ?? min);
    setHi(valueMax ?? max);
  }, [valueMin, valueMax, min, max]);

  // Khinchte waqt har baar page nahi badalte, ruk kar ek baar badalte hain
  const timer = useRef<number | undefined>(undefined);
  const commitRef = useRef(onCommit);
  commitRef.current = onCommit;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const schedule = (nextLo: number, nextHi: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      commitRef.current(nextLo <= min ? null : nextLo, nextHi >= max ? null : nextHi);
    }, 300);
  };

  const range = Math.max(1, max - min);
  const loPct = ((lo - min) / range) * 100;
  const hiPct = ((hi - min) / range) * 100;

  return (
    <div>
      <div className="relative h-6">
        {/* Track */}
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/15" />
        {/* Chuni hui range */}
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#c5a880]"
          style={{ left: `${loPct}%`, width: `${Math.max(0, hiPct - loPct)}%` }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => {
            const next = Math.min(Number(e.target.value), hi - step);
            setLo(next);
            schedule(next, hi);
          }}
          aria-label="Minimum price"
          aria-valuetext={formatPrice(lo)}
          // Jab dono thumb paas hon, to jo bhi upar ho wo hilne layak rahe
          className={`${thumbClass} ${lo > min + range / 2 ? 'z-20' : 'z-10'}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => {
            const next = Math.max(Number(e.target.value), lo + step);
            setHi(next);
            schedule(lo, next);
          }}
          aria-label="Maximum price"
          aria-valuetext={formatPrice(hi)}
          className={`${thumbClass} ${lo > min + range / 2 ? 'z-10' : 'z-20'}`}
        />
      </div>

      <p className="mt-3 text-sm text-[#a1a1aa]" aria-live="polite">
        Price:{' '}
        <span className="tabular-nums text-white">
          {formatPrice(lo)} &ndash; {formatPrice(hi)}
        </span>
      </p>
    </div>
  );
};