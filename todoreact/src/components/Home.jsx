import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";

function Home() {
  const notes = useSelector((state) => state.notes);
  const [recentNotes, setRecentNotes] = useState([]);

  useEffect(() => {
    if (notes.length > 3) {
      setRecentNotes(notes.slice(0, 4));
    }
  }, [notes]);

  return (
    <>
      <div className="max-w-full h-full flex items-center justify-center pt-20">
        <div className="sm:max-w-[85%] md:max-w-full md:w-full flex flex-col items-center justify-center p-6 md:p-8">
          <div className="h-full w-full text-gray-100 flex flex-col items-center justify-evenly gap-4">
            {notes.length > 0 ? (
              <p className="md:text-xl md:mb-4">&#x2022; Recent Notes</p>
            ) : null}

            {notes.length > 0 ? (
              <div className="max-h-96 md:max-h-full w-full p-2 flex flex-col sm:flex-row md:items-center lg:justify-center gap-4 overflow-scroll md:overflow-scroll">
                {recentNotes.map((note) => (
                  <div key={note.id}>
                    <NoteItem
                      height={"auto"}
                      width={"52"}
                      checkVisible={"hidden"}
                      className={"line-clamp-[10] md:line-clamp-[8]"}
                      note={note}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-52 w-52 flex items-center justify-center">
                <p>No recent notes...</p>
              </div>
            )}

            <div>
              <NavLink to={"/notes"}>
                <div className="bg-blue-900 text-gray-100 rounded-lg p-2 hover:scale-105 hover:shadow-sm hover:shadow-slate-900">
                  {notes.length > 0 ? "Show all" : "Create note"}
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
