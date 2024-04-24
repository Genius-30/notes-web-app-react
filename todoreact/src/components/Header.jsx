import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="w-full h-14 px-10 absolute top-4 right-0 z-10">
      <nav className="bg-slate-50 w-full h-full rounded-xl px-6 flex items-center justify-center">
        <div className="w-full flex items-center justify-between text-slate-800">
          <div className="flex items-center gap-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5063/5063397.png"
              alt="logo"
              className="h-9 w-auto"
            />{" "}
            <h1 className="text-xl">Notes App</h1>
          </div>
          <ul className="flex items-center gap-4 text-lg">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `${isActive ? "underline" : "no-underline"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/notes"}
                className={({ isActive }) =>
                  `${isActive ? "underline" : "no-underline"}`
                }
              >
                Notes
              </NavLink>
            </li>
          </ul>
          <div className="flex gap-2">
            <button className="h-full w-auto bg-slate-800 text-gray-100 border-2 border-solid border-slate-800 px-3 py-1 rounded-lg">
              Login
            </button>
            <button className="h-full w-ato bg-none border-2 border-solid border-slate-800 px-3 py-1 rounded-lg">
              Signup
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
