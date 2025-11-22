// src/components/ui/EyeOffIcon.tsx
import React from "react";

const EyeOffIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.88 9.88a3 3 0 1 1 4.24 4.24"></path>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 22 12"></path>
    <path d="M2 12c1.78 6.76 5.84 10 10 10"></path>
    <line x1="2" y1="2" x2="22" y2="22"></line>
  </svg>
);

export default EyeOffIcon;