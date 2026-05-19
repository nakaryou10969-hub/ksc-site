"use client";

import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface Props {
  href: string;
  img: string;
  title: string;
  date: string;
  delay?: string;
}

export default function ArticleCard({ href, img, title, date, delay = "" }: Props) {
  const ref = useScrollReveal<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal ${delay} group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow block`}
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-5">
        <p className="text-xs text-gray-400 mb-2">{date}</p>
        <p className="font-medium text-gray-800 leading-snug line-clamp-2">{title}</p>
      </div>
    </a>
  );
}
