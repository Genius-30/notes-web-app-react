import { useRef, useState } from "react";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedNoteIds, fetchNotes } from "../store/noteSlice";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import databaseService from "../appwrite/db";

function Notes() {
  const [isCheckVisible, setIsCheckVisible] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const notes = useSelector((state) => state.note.notes);

  const dispatch = useDispatch();
  const selectedNoteIds = useSelector((state) => state.note.selectedNoteIds);
  const userData = useSelector((state) => state.auth.userData);

  const outerDivRef = useRef();
  const handleNoteFormDivClick = (e) => {
    if (outerDivRef.current === e.target) {
      setIsAddFormVisible(false);
    }
  };

  const handleDelBtn = () => {
    isCheckVisible ? confirmDelete() : showCheckBox();
    setIsCheckVisible(!isCheckVisible);
  };

  const showCheckBox = () => {
    setIsCheckVisible(true);
  };

  const confirmDelete = async () => {
    const userId = userData.userData.$id;
    if (selectedNoteIds.length > 0) {
      try {
        for (let id of selectedNoteIds) {
          await databaseService.deleteNote(id);
        }
        dispatch(fetchNotes(userId));
        dispatch(clearSelectedNoteIds());
        toast.success("Notes deleted successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    setIsCheckVisible(false);
  };

  return (
    <>
      <div className="w-full h-full flex justify-center">
        <div className="w-full pb-2 flex items-center mx-2 md:mx-6 gap-4">
          <div
            ref={outerDivRef}
            onClick={handleNoteFormDivClick}
            className={`${
              isAddFormVisible ? "absolute" : "hidden"
            } md:block h-full w-full md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] backdrop-blur-[2px] z-[99] inset-0`}
          >
            <div className="h-4/5 min-[400px]:h-3/5 md:h-full w-11/12 md:w-full relative md:static top-[50%] left-[50%] translate-x-[-50%] md:translate-x-0 translate-y-[-50%] md:translate-y-0">
              <NoteForm onCancel={() => setIsAddFormVisible(false)} />
            </div>
          </div>

          <div className="w-full h-full flex flex-col gap-2 md:pt-2">
            <div className="h-auto w-full md:px-4">
              <div className="h-full w-full flex flex-col md:flex-row items-center gap-2 md:gap-4 whitespace-nowrap">
                {notes.length > 0 ? (
                  <div className="w-full md:w-3/5">
                    <input
                      type="search"
                      placeholder="Search by title..."
                      className="w-full bg-gray-100 text-sm md:text-base rounded-lg py-3 px-2 md:px-4 outline-none hover:scale-[1.03] duration-150 ease-in-out"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex gap-2 items-center justify-center self-end">
                  <Button
                    className="w-24 block md:hidden py-3"
                    children={"Add Note"}
                    onClick={() => setIsAddFormVisible(true)}
                  />
                  {notes.length > 0 ? (
                    <Button
                      bgColor={isCheckVisible ? "bg-amber-500" : "bg-red-600"}
                      className="w-24 py-3 ${}"
                      children={isCheckVisible ? "Confirm" : "Delete"}
                      onClick={handleDelBtn}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            {notes.length > 0 ? (
              <div
                className="w-full h-auto grid gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 overflow-scroll py-2 md:p-4 overflow-x-hidden"
                style={{
                  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
                }}
              >
                {notes.map((note) => (
                  <div key={note.$id}>
                    <NoteItem
                      height={"96"}
                      width={"full"}
                      checkVisible={isCheckVisible}
                      className={"line-clamp-[8] shrink-0"}
                      note={note}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Notes;
