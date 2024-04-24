import { useState } from "react";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";
import { useNote } from "../contexts/NoteContext";

function Notes() {
  const [showCheckForDelete, setShowCheckForDelete] = useState(false);
  const [isCheckVisible, setIsCheckVisible] = useState("hidden");

  const { notes, deleteNote } = useNote();

  const handleDelBtnToggle = () => {
    showCheckForDelete ? confirmDelete() : showCheckBox();
    setShowCheckForDelete(!showCheckForDelete);
  };

  const showCheckBox = () => {
    setIsCheckVisible("visible");
  };

  const confirmDelete = () => {
    setIsCheckVisible("hidden");
    setShowCheckForDelete(false);
    deleteNote();
  };

  return (
    <>
      <div className="w-full h-full flex justify-center pt-20">
        <div className="w-full pb-2 flex items-center justify-center mx-6 gap-4">
          <NoteForm />
          {notes.length > 0 ? (
            <div className="w-full h-full flex flex-col gap-2">
              <div className="h-14 w-full bg-transparent px-4">
                <div className="h-full w-full bgs flex justify-end items-center px-4 pt-2">
                  <button
                    className="h-full w-auto bg-red-600 hover:bg-red-500 text-gray-100 p-2 rounded-lg"
                    onClick={handleDelBtnToggle}
                  >
                    {showCheckForDelete ? "Confirm Delete" : "Delete Note"}
                  </button>
                </div>
              </div>
              <div className="w-full h-auto grid grid-cols-3 gap-x-8 gap-y-6 overflow-auto p-4">
                {notes.map((eachNote) => (
                  <div key={eachNote.id}>
                    <NoteItem
                      noteItemHeight={"auto"}
                      noteItemWidth={"auto"}
                      noteCheckVisible={isCheckVisible}
                      cssForContent={"text-nowrap overflow-hidden"}
                      note={eachNote}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Notes;
