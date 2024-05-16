import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/noteSlice";

function NoteForm({ onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const disptach = useDispatch();

  const handleAddNoteClick = (e) => {
    e.preventDefault();

    if (!title && !content) return;
    disptach(addNote({ title, content }));

    handleCancelClick();
  };

  const handleCancelClick = () => {
    return onCancel(), setTitle(""), setContent("");
  };

  const handleContentDivClick = () => {
    const contentInput = document.getElementById("contentinput");
    contentInput.focus();
  };

  return (
    <div className="h-full w-full bg-slate-900 border-solid border-2 border-gray-100 rounded-xl py-4 px-2 lg:py-6 lg:px-4">
      <form
        onSubmit={handleAddNoteClick}
        className="h-full w-full flex flex-col items-center justify-evenly gap-4"
      >
        <input
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg w-full h-12 bg-transparent px-2 focus:outline-none caret-gray-100 focus:caret-gray-100 text-gray-100 text-xl lg:text-2xl"
        />
        <div
          className="h-full w-full basis-full rounded-lg bg-transparent cursor-text"
          onClick={handleContentDivClick}
        >
          <textarea
            id="contentinput"
            type="text"
            placeholder="Enter content here..."
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-full w-full bg-transparent rounded-lg focus:outline-none caret-gray-100 focus:caret-gray-100 text-gray-100 text-lg lg:text-xl px-2 resize-none"
          />
        </div>
        <div className="h-auto w-full flex items-center gap-2 text-slate-100">
          <button
            type="button"
            onClick={handleCancelClick}
            className="visible md:hidden w-full h-12 bg-red-600 rounded-lg focus:bg-red-500 p-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full h-12 bg-blue-900 rounded-lg focus:bg-blue-800 md:hover:bg-blue-800 p-2"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
