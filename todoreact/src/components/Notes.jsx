import { useRef, useState } from "react";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteNote } from "../store/noteSlice";
import Button from "./Button";

function Notes() {
  const [isCheckVisible, setIsCheckVisible] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

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

  const confirmDelete = () => {
    dispatch(deleteNote());
    setIsCheckVisible(false);
  };

  return (
    <>
      <div className="w-full h-full flex justify-center pt-20">
        <div className="w-full pb-2 flex items-center justify-center mx-2 md:mx-6 gap-4">
          <div
            ref={outerDivRef}
            onClick={handleNoteFormDivClick}
            className={`${
              isAddFormVisible ? "absolute" : "hidden"
            } md:static md:block h-full w-full md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] backdrop-blur-[2px] z-[99] inset-0`}
          >
            <div className="h-4/5 min-[400px]:h-3/5 md:h-full w-11/12 md:w-full relative md:static top-[50%] left-[50%] translate-x-[-50%] md:translate-x-0 translate-y-[-50%] md:translate-y-0">
              <NoteForm onCancel={() => setIsAddFormVisible(false)} />
            </div>
          </div>

          {notes.length > 0 ? (
            <div className="w-full h-full flex flex-col gap-2 md:pt-2">
              <div className="h-auto w-full md:px-4">
                <div className="h-full w-full flex flex-col md:flex-row items-center gap-2 md:gap-4 whitespace-nowrap">
                  <div className="w-full md:w-3/5">
                    <input
                      type="search"
                      placeholder="Search by title..."
                      className="w-full bg-slate-50 text-sm md:text-base rounded-lg py-3 px-2 md:px-4 outline-none hover:scale-[1.03] duration-150 ease-in-out"
                    />
                  </div>
                  <div className="flex gap-2 items-center justify-center self-end">
                    <Button
                      bgColor="bg-green-600"
                      className="block md:hidden py-3 w-auto"
                      children={"Add Note"}
                      onClick={() => setIsAddFormVisible(true)}
                    />
                    <Button
                      bgColor="bg-red-600"
                      className="py-3 w-auto"
                      children={
                        isCheckVisible ? "Confirm Delete" : "Delete Note"
                      }
                      onClick={handleDelBtn}
                    />
                  </div>
                </div>
              </div>
              <div
                className="w-full h-auto grid gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 overflow-scroll py-2 md:p-4 overflow-x-hidden"
                style={{
                  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
                }}
              >
                {notes.map((note) => (
                  <div key={note.id}>
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
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Notes;
