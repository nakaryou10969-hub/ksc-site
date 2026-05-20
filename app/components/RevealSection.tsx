"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

export default function RevealSection({ children, className = "", delay = "" }: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`}>
      {children}
    </div>
  );
}
