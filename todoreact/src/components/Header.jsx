import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { Menu, X } from "lucide-react";

function MenuButtons() {
  return (
    <>
      <Button
        children={"Login"}
        bgColor="bg-slate-800"
        className="h-9 w-24 border-2 border-solid border-slate-800 text-sm py-0"
      />

      <Button
        children={"Signup"}
        bgColor="bg-none"
        textColor="text-slate-800"
        className="h-9 w-24 border-2 border-solid border-slate-800 text-sm"
      />
    </>
  );
}

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => setShowMenu(!showMenu);

  const navLinks = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "All Notes",
      url: "/notes",
    },
  ];

  return (
    <header className="w-[95%] h-14 fixed top-4 left-[50%] translate-x-[-50%] z-99">
      <nav className="bg-slate-50 w-full h-full rounded-xl px-6 flex items-center justify-center">
        <div className="h-full w-full flex items-center justify-between text-slate-800">
          <div className="flex items-center gap-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5063/5063397.png"
              alt="logo"
              className="h-7 w-auto md:h-9"
            />
            <h1 className="whitespace-nowrap md:text-xl">Notes App</h1>
          </div>

          <div onClick={handleMenuClick} className="md:hidden">
            {showMenu ? (
              <X className="text-slate-800 text-lg" />
            ) : (
              <Menu className="text-slate-800 text-lg" />
            )}
          </div>

          <ul
            onClick={handleMenuClick}
            className={`bg-slate-50 md:bg-transparent w-auto rounded-lg md:rounded-none py-5 px-6 md:p-0 absolute md:static top-16 ${
              showMenu ? "right-6" : "right-[-165px]"
            } flex flex-col md:flex-row items-end md:items-center gap-3 md:gap-4 md:text-lg transition-all duration-100 ease-in-out`}
          >
            {navLinks.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `whitespace-nowrap ${
                        isActive
                          ? "border-b-[3px] border-slate-800"
                          : "no-underline"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
            <div className="flex md:hidden flex-col gap-3">
              <MenuButtons />
            </div>
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <MenuButtons />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
