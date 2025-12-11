// src/components/ui/skeleton/Skeleton.tsx
import React from "react";

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

const Skeleton = ({ className = "", height = "h-6", width = "w-full" }: SkeletonProps) => {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${height} ${width} ${className}`}
    />
  );
};

export default Skeleton;