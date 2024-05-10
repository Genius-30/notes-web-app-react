import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-900",
  textColor = "text-gray-100",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-3 py-1 rounded-lg hover:scale-105 transition-all duration-150 ease-in-out text-sm md:text-base ${bgColor} ${textColor} ${className}`}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
