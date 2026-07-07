"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

type Article = {
  href: string;
  img: string;
  title: string;
  date: string;
  external?: boolean;
};

type SliderStyle = CSSProperties & {
  "--event-report-index": number;
};

interface Props {
  articles: Article[];
}

export default function EventArticleCarousel({ articles }: Props) {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const maxIndex = Math.max(0, articles.length - visibleCount);
  const activeIndex = Math.min(current, maxIndex);
  const canSlide = maxIndex > 0;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 530px)");
    const updateVisibleCount = () => setVisibleCount(mediaQuery.matches ? 2 : 1);

    updateVisibleCount();
    mediaQuery.addEventListener("change", updateVisibleCount);

    return () => mediaQuery.removeEventListener("change", updateVisibleCount);
  }, []);

  if (articles.length === 0) {
    return null;
  }

  const prev = () => {
    setCurrent((value) => {
      const normalized = Math.min(value, maxIndex);
      return normalized === 0 ? maxIndex : normalized - 1;
    });
  };

  const next = () => {
    setCurrent((value) => {
      const normalized = Math.min(value, maxIndex);
      return normalized === maxIndex ? 0 : normalized + 1;
    });
  };

  return (
    <div className="relative mb-12">
      <div className="overflow-hidden">
        <div
          className="event-report-track flex -mx-4"
          style={{ "--event-report-index": activeIndex } as SliderStyle}
        >
          {articles.map((article, i) => (
            <div key={`${article.href}-${i}`} className="event-report-slide px-4">
              <ArticleCard
                href={article.href}
                img={article.img}
                title={article.title}
                date={article.date}
                delay={i % 2 === 1 ? "reveal-delay-2" : ""}
                external={article.external}
              />
            </div>
          ))}
        </div>
      </div>

      {canSlide && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="前の記事を表示"
            className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-white/90 shadow-sm transition hover:bg-white"
            style={{ borderColor: "#3B3C3E", color: "#3B3C3E" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="次の記事を表示"
            className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-white/90 shadow-sm transition hover:bg-white"
            style={{ borderColor: "#3B3C3E", color: "#3B3C3E" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
