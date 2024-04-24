import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNote } from "../contexts/NoteContext";
import NoteItem from "./NoteItem";

function Home() {
  const [recentNotes, setRecentNotes] = useState([]);
  const { notes } = useNote();

  useEffect(() => {
    setRecentNotes(notes.slice(0, 3));
  }, [notes]);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center pt-20">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-between">
            <div className="w-full h-auto p-8 text-gray-100 flex flex-col items-center justify-evenly gap-4">
              {notes.length > 0 ? (
                <p className="text-xl mb-6">&#x2022; Recent Notes</p>
              ) : null}

              {notes.length > 0 ? (
                <div className="flex gap-4">
                  {recentNotes.map((eachNote) => (
                    <div key={eachNote.id}>
                      <NoteItem
                        noteItemHeight={"auto"}
                        noteItemWidth={"52"}
                        noteCheckVisible={"hidden"}
                        cssForContent={"line-clamp-[8]"}
                        note={eachNote}
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
                    {notes.length > 0 ? "show all" : "Create note"}
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
