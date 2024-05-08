import { useState } from "react";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteNote } from "../store/noteSlice";

function Notes() {
  const [isCheckVisible, setIsCheckVisible] = useState(false);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  const handleDelBtn = () => {
    isCheckVisible ? confirmDelete() : showCheckBox();
    setIsCheckVisible(!isCheckVisible);
  };

  const showCheckBox = () => {
    setIsCheckVisible(true);
  };

  const confirmDelete = () => {
    dispatch(deleteNote());
    setIsCheckVisible(false);
  };

  return (
    <>
      <div className="w-full h-full flex justify-center pt-20">
        <div className="w-full pb-2 flex items-center justify-center mx-2 md:mx-6 gap-4">
          <div className="h-full w-[55%] lg:w-auto">
            <NoteForm />
          </div>
          {notes.length > 0 ? (
            <div className="w-full h-full flex flex-col gap-2">
              <div className="h-14 w-full bg-transparent px-4">
                <div className="h-full w-full bgs flex justify-end items-center px-4 pt-2">
                  <button
                    className="h-full w-auto bg-red-600 hover:bg-red-500 text-gray-100 p-2 rounded-lg"
                    onClick={handleDelBtn}
                  >
                    {isCheckVisible ? "Confirm Delete" : "Delete Note"}
                  </button>
                </div>
              </div>
              <div
                className="w-full h-auto grid gap-x-8 gap-y-6 overflow-scroll p-4"
                style={{
                  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
                }}
              >
                {notes.map((note) => (
                  <div key={note.id}>
                    <NoteItem
                      height={"96"}
                      width={"full"}
                      checkVisible={isCheckVisible ? "visible" : "hidden"}
                      className={"line-clamp-[8] shrink-0"}
                      note={note}
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
