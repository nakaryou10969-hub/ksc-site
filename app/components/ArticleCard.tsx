"use client";

import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface Props {
  href: string;
  img: string;
  title: string;
  date: string;
  delay?: string;
  external?: boolean;
}

export default function ArticleCard({ href, img, title, date, delay = "", external = false }: Props) {
  const ref = useScrollReveal<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`reveal ${delay} group rounded-2xl overflow-hidden hover:shadow-md transition-shadow block`}
      style={{ border: "1px solid #3B3C3E" }}
    >
      <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: "#D6D3CD" }}>
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-5" style={{ backgroundColor: "white" }}>
        <p className="text-xs mb-2" style={{ color: "#767676" }}>{date}</p>
        <p className="font-medium leading-snug line-clamp-2" style={{ color: "#3B3C3E" }}>{title}</p>
      </div>
    </a>
  );
}
