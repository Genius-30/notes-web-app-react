import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../store/noteSlice";
import Button from "./Button";

function DetailNote() {
  const { noteId } = useParams();
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const note = notes.find((note) => note.id === noteId.toString());

  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isContentEditable, setIsContentEditable] = useState(false);
  const [inputTitle, setInputTitle] = useState(note?.title);
  const [inputContent, setInputContent] = useState(note?.content);

  const handleUpdate = () => {
    dispatch(
      updateNote({ id: note.id, title: inputTitle, content: inputContent })
    );
  };

  return (
    <div className="h-full w-full flex items-center justify-center pt-20">
      <div className="h-full w-full text-gray-100 flex items-center justify-center">
        {note ? (
          <div className="h-5/6 w-[85%] sm:w-4/5 md:w-9/12 lg:w-3/5 mx-auto flex flex-col gap-2 md:gap-6 py-4 absolute top-50%">
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              onClick={() => setIsTitleEditable(!isTitleEditable)}
              readOnly={isTitleEditable}
              className="w-full text-2xl md:text-4xl leading-[50px] bg-transparent outline-none"
            />
            <textarea
              type="text"
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              onClick={() => setIsContentEditable(!isContentEditable)}
              readOnly={isContentEditable}
              className="basis-full w-full text-lg md:text-2xl leading-8 overflow-y-auto scroll-smooth bg-transparent outline-none resize-none"
            />
            <Button
              children={"Save"}
              className="h-10 w-20 absolute bottom-4 right-4 shadow-md shadow-slate-900"
              onClick={handleUpdate}
            />
          </div>
        ) : (
          <p className="text-center text-xl">Loading note...</p>
        )}
      </div>
    </div>
  );
}

export default DetailNote;
