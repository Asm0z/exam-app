import React from "react";
import { cn } from "@/lib/utils/tailwind-merge";

interface AnimatedCircularProgressBarProps {
  max?: number;
  min?: number;
  value: number;
  primaryColorHex?: string;  
  secondaryColorHex?: string;
  className?: string;
  renderLabel?: () => React.ReactNode; 
}

export const AnimatedCircularProgressBar: React.FC<AnimatedCircularProgressBarProps> = ({
  max = 100,
  min = 0,
  value = 0,
  primaryColorHex = "#2563eb",   
  secondaryColorHex = "#dbeafe",
  className,
  renderLabel,
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(value, min), max);
  const percent = ((clampedValue - min) / (max - min)) * 100;
  const dashOffset = circumference - (circumference * percent) / 100 + 2;

  return (
    <div className={cn("relative", className)}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
       
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={secondaryColorHex}
          strokeWidth={11}
          fill="none"
        />
       
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={primaryColorHex}
          strokeWidth={11}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="butt"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      
      <div className="absolute inset-0 flex items-center justify-center ">
        {renderLabel ? renderLabel() : `${Math.round(percent)}%`}
      </div>
    </div>
  );
};