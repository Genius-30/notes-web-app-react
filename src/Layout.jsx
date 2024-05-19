import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CustomLoader, Header } from "./components/index";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "./store/noteSlice";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [authenticationComplete, setAuthenticationComplete] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const notes = useSelector((state) => state.note.notes);

  useEffect(() => {
    setLoader(true);
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log("Error fetching user: ", error))
      .finally(() => {
        setLoader(false);
        setAuthenticationComplete(true);
      });
  }, []);

  useEffect(() => {
    if (authStatus) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, authStatus]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");

    if (storedNotes) {
      try {
        const parsedNotes = JSON.parse(storedNotes);

        dispatch(setNotes(parsedNotes));
      } catch (error) {
        console.error("Error parsing notes:", error);
      }
    }
  }, []);

  const showHeader = !["/login", "/signup"].includes(location.pathname);

  if (!authenticationComplete && loader) {
    return <CustomLoader />;
  }

  return (
    <>
      <div className="bg-slate-900 h-screen w-full p-2 md:p-4 poppins-bold font-bold flex flex-col overflow-hidden">
        {showHeader && <Header />}
        <main
          className={`h-full w-full ${showHeader && "mt-20"} oveflow-y-scroll`}
        >
          <div>Before outlet</div>
          <Outlet />
          <div>After outlet</div>
        </main>
      </div>
    </>
  );
}

export default Layout;
