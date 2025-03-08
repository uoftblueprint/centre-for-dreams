import React from "react";

interface IconProps {
  children: React.ReactNode;
  hoverColor?: string;
  transitionDuration?: number; // Change to number to match Tailwind duration classes
}

const Icon: React.FC<IconProps> = ({
  children,
  hoverColor = "text-blue-400",
  transitionDuration = 300, // Default to 300ms
}) => {
  return (
    <div
      className={`cursor-pointer transition-colors duration-${transitionDuration} hover:${hoverColor}`}
    >
      {children}
    </div>
  );
};

export default Icon;
