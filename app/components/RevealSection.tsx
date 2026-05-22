"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

export default function RevealSection({ children, className = "", delay = "", style }: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  style?: React.CSSProperties;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`} style={style}>
      {children}
    </div>
  );
}
