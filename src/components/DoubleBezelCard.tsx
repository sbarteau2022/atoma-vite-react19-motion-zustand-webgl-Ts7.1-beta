import React from "react";

interface DoubleBezelCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glowOnHover?: boolean;
}

export function DoubleBezelCard({
  children,
  className = "",
  innerClassName = "",
  glowOnHover = true,
}: DoubleBezelCardProps) {
  return (
    <div
      className={`group relative rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-1.5 transition-all duration-500 backdrop-blur-xl ${
        glowOnHover
          ? "hover:border-[#4fe3ea]/40 hover:shadow-[0_0_35px_rgba(79,227,234,0.1)] hover:-translate-y-0.5"
          : ""
      } ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-white/5 bg-[#080b0f]/95 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
