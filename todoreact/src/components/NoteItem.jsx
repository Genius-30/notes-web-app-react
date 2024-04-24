import { NavLink } from "react-router-dom";
import { useNote } from "../contexts/NoteContext";

function NoteItem({
  noteItemHeight,
  noteItemWidth,
  noteCheckVisible,
  cssForContent,
  note,
}) {
  const { selectDeletion } = useNote();

  const onCheck = () => {
    selectDeletion(note.id);
  };

  if (!note || typeof note !== "object") {
    return null;
  }

  return (
    <div
      className={`h-${noteItemHeight} w-${noteItemWidth} max-h-80 flex flex-col items-center justify-between gap-2`}
    >
      <NavLink to={`/note/${note.id}`} className="h-full w-full cursor-pointer">
        <div className="h-full w-full bg-transparent rounded-lg p-4 border border-solid border-gray-100 hover:shadow-lg hover:shadow-slate-800 hover:scale-105">
          <div className="flex flex-col justify-between gap-2 text-gray-100">
            <h3 className="text-xl truncate">{note.title}</h3>
            <p className={`text-base ${cssForContent}`}>{note.content}</p>
          </div>
        </div>
      </NavLink>
      <input
        type="checkbox"
        checked={note.toogleToDelete}
        onChange={onCheck}
        className={`h-5 w-5 ${noteCheckVisible}`}
      />
    </div>
  );
}

export default NoteItem;
