import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";
import Button from "./Button";

function Home() {
  const notes = useSelector((state) => state.note.notes);
  const [recentNotes, setRecentNotes] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (notes && notes.length > 0) {
      setRecentNotes(notes.slice(0, 4));
    }
  }, [notes]);

  return (
    <>
      <div className="max-w-full h-full flex items-center justify-center">
        <div className="sm:max-w-[85%] md:max-w-full md:w-full flex items-center justify-center p-6 md:p-8">
          <div className="h-full w-full text-gray-100 flex flex-col items-center justify-evenly gap-4">
            {authStatus ? (
              <>
                {notes && (
                  <p className="md:text-xl md:mb-4">&#x2022; Recent Notes</p>
                )}
                {notes?.length > 0 ? (
                  <div className="max-h-96 md:max-h-full w-full p-2 flex flex-col md:flex-row md:items-center lg:justify-center gap-4 overflow-scroll">
                    {recentNotes.map((note) => (
                      <div key={note.$id}>
                        <NoteItem
                          height={"auto"}
                          width={"52"}
                          checkVisible={false}
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
                    <Button
                      children={notes?.length > 0 ? "Show all" : "Create note"}
                      className="h-10 w-auto"
                    />
                  </NavLink>
                </div>{" "}
              </>
            ) : (
              <p className="md:text-xl">
                <Link to={"/login"} className="text-blue-600">
                  Login
                </Link>{" "}
                to create notes
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
