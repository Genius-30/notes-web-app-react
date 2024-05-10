import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/index";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "./store/noteSlice";

function Layout() {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));

    if (storedNotes && storedNotes.length > 0) {
      dispatch(setNotes(storedNotes));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <div className="bg-slate-900 h-screen w-full p-2 md:p-4 poppins-bold font-bold overflow-hidden">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
