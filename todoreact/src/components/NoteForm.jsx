import React, { useState } from "react";
import { useNote } from "../contexts/NoteContext";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { addNote } = useNote();

  const add = (e) => {
    e.preventDefault();

    if (!title && !content) return;

    addNote(title, content);

    setTitle("");
    setContent("");
  };

  const onContentDivClick = () => {
    const contentInput = document.getElementById("contentinput");
    contentInput.focus();
  };

  return (
    <div className="h-full border-solid border-2 border-gray-100 rounded-xl py-6 px-4">
      <form
        onSubmit={add}
        className="h-full flex flex-col items-center justify-evenly gap-4"
      >
        <input
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg w-96 h-12 bg-transparent px-2 focus:outline-none caret-gray-100 focus:caret-gray-100 text-gray-100 text-2xl"
        />
        <div
          className="h-full basis-full rounded-lg w-96 bg-transparent cursor-text"
          onClick={onContentDivClick}
        >
          <textarea
            id="contentinput"
            type="text"
            placeholder="Enter content here..."
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-full w-full bg-transparent rounded-lg focus:outline-none caret-gray-100 focus:caret-gray-100 text-gray-100 px-2 resize-none"
          />
        </div>
        <button
          type="submit"
          className="text-slate-100 bg-blue-900 w-full h-14 rounded-lg hover:bg-blue-800"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
