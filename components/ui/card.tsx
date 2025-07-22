// components/ui/card.tsx
'use client'
import { ReactNode } from "react";
import { motion } from "framer-motion"; // ✅ correct path for v6

const MotionDiv = motion("div"); // ✅ wrap native HTML tag

interface CardProps {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({
  title,
  children,
  className = "",
  hoverEffect = true,
}: CardProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={
        hoverEffect
          ? {
              y: -2,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }
          : {}
      }
      className={`bg-neutral-900 border border-neutral-800 p-6 rounded-xl shadow-sm transition-all duration-200 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-neutral-100">
          {title}
        </h2>
      )}
      <div className="text-neutral-300">{children}</div>
    </MotionDiv>
  );
}
