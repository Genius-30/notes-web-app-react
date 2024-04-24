import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/index";
import { NoteProvider } from "./contexts/NoteContext";

function Layout() {
  const [notes, setNotes] = useState([]);

  const addNote = (title, content) => {
    setNotes((prev) => [
      { id: Date.now().toString(), title, content },
      ...prev,
    ]);
  };

  const deleteNote = () => {
    setNotes((prev) =>
      prev.filter((eachNote) => eachNote.toogleToDelete !== true)
    );
  };

  const updateNote = (id, title, content) => {
    setNotes((prev) =>
      prev.map((eachNote) =>
        eachNote.id === id ? { ...eachNote, title, content } : eachNote
      )
    );
  };

  const selectDeletion = (id) => {
    setNotes((prev) =>
      prev.map((eachNote) =>
        eachNote.id === id
          ? { ...eachNote, toogleToDelete: !eachNote.toogleToDelete }
          : eachNote
      )
    );
  };

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));

    if (notes && notes.length > 0) {
      setNotes(notes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <NoteProvider
      value={{ notes, addNote, deleteNote, updateNote, selectDeletion }}
    >
      <div className="bg-slate-900 h-screen w-full p-4 poppins-bold font-bold">
        <Header />
        <Outlet />
      </div>
    </NoteProvider>
  );
}

export default Layout;
