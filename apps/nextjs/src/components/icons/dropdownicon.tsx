import React from "react";

export default function DropdownIcon(isSelected: boolean) {
  return (
    <svg
      className="ml-auto h-4 w-4"
      width="16"
      height="9"
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 0.999999L8 8L1 1"
        stroke={isSelected ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
