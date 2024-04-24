import { useParams } from "react-router-dom";
import { useNote } from "../contexts/NoteContext";
import { useState } from "react";

function DetailNote() {
  const { noteId } = useParams();
  const { notes, updateNote } = useNote();
  const note = notes.find((note) => note.id === noteId.toString());

  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isContentEditable, setIsContentEditable] = useState(false);
  const [inputTitle, setInputTitle] = useState(note.title);
  const [inputContent, setInputContent] = useState(note.content);

  const editNote = () => {
    updateNote(note.id, inputTitle, inputContent);
  };

  return (
    <div className="h-full w-full flex items-center justify-center pt-20">
      <div className="h-full w-full text-gray-100 flex gap-2">
        {note ? (
          <div className="h-5/6 w-3/5 mx-auto flex flex-col gap-6 py-4 absolute top-50% translate-x-1/3">
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              onClick={() => setIsTitleEditable(!isTitleEditable)}
              readOnly={isTitleEditable}
              className="w-full text-4xl leading-[50px] bg-transparent outline-none"
            />
            <textarea
              type="text"
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              onClick={() => setIsContentEditable(!isContentEditable)}
              readOnly={isContentEditable}
              className="basis-full w-full text-2xl leading-8 overflow-y-auto scroll-smooth bg-transparent outline-none resize-none"
            />
            <button
              className="h-10 w-20 bg-blue-900 p-2 hover:scale-105 rounded-lg shadow-md shadow-slate-800 absolute bottom-2 right-4"
              onClick={editNote}
            >
              Save
            </button>
          </div>
        ) : (
          <p>Loading note...</p>
        )}
      </div>
    </div>
  );
}

export default DetailNote;
