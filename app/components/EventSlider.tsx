"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  { src: "/images/events/IMG_0541.jpg", alt: "イベント写真 1" },
  { src: "/images/events/IMG_0578.jpg", alt: "イベント写真 2" },
  { src: "/images/events/IMG_0617.jpg", alt: "イベント写真 3" },
  { src: "/images/events/IMG_0639.jpg", alt: "イベント写真 4" },
  { src: "/images/events/IMG_0839.jpg", alt: "イベント写真 5" },
  { src: "/images/events/IMG_0907.jpg", alt: "イベント写真 6" },
  { src: "/images/events/IMG_7807.jpg", alt: "イベント写真 7" },
  { src: "/images/events/IMG_9740.jpg", alt: "イベント写真 8" },
  { src: "/images/events/IMG_9811.jpg", alt: "イベント写真 9" },
];

export default function EventSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-10">
      {/* 画像エリア */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 768px"
        />

        {/* 左矢印 */}
        <button
          onClick={prev}
          aria-label="前の画像"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 右矢印 */}
        <button
          onClick={next}
          aria-label="次の画像"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ドットインジケーター */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`画像 ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* カウンター */}
      <p className="text-center text-sm text-gray-400 mt-2">
        {current + 1} / {images.length}
      </p>
    </div>
  );
}
