import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./index";
import { useSelector } from "react-redux";
import AuthButtons from "./AuthButtons";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  const handleMenuClick = () => setShowMenu(!showMenu);

  const navLinks = [
    {
      title: "Home",
      url: "/",
      enable: true,
    },
    {
      title: "All Notes",
      url: "/notes",
      enable: authStatus,
    },
  ];

  return (
    <header className="w-[95%] h-14 fixed top-4 left-[50%] translate-x-[-50%] z-[99]">
      <nav className="bg-gray-100 w-full h-full rounded-xl px-4 md:px-6 flex items-center justify-center">
        <div className="h-full w-full flex items-center justify-between text-slate-800">
          <Link to={"/"}>
            <Logo className={"cursor-pointer"} />
          </Link>

          <div onClick={handleMenuClick} className="md:hidden">
            {showMenu ? (
              <X className="text-slate-800 text-lg" />
            ) : (
              <Menu className="text-slate-800 text-lg" />
            )}
          </div>

          <ul
            onClick={handleMenuClick}
            className={`bg-gray-100 md:bg-transparent w-auto rounded-lg md:rounded-none py-5 px-6 md:p-0 absolute md:static top-16 right-4 ${
              showMenu
                ? "opacity-100 translate-y-0"
                : "opacity-0 md:opacity-100 -translate-y-[140%] md:translate-y-0"
            } flex flex-col md:flex-row items-end md:items-center gap-3 md:gap-4 md:text-lg transition-all duration-150 ease-in-out`}
          >
            {navLinks.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`${item.enable ? "visible" : "hidden"}`}
                >
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
              <AuthButtons />
            </div>
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <AuthButtons />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
