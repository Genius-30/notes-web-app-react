import React from "react";

function Logo({ className }) {
  return (
    <div className={`${className} flex items-center gap-1`}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/5063/5063397.png"
        alt="logo"
        className="h-7 md:h-9 w-auto"
      />
      <h1 className="whitespace-nowrap md:text-xl text-slate-800">Notes App</h1>
    </div>
  );
}

export default Logo;
