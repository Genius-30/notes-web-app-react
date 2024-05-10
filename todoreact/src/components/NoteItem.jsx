import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectDeletion } from "../store/noteSlice";

function NoteItem({ height, width, checkVisible, className, note }) {
  const dispatch = useDispatch();

  if (!note || typeof note !== "object") {
    return null;
  }

  return (
    <div
      className={`h-${height} w-${width} max-h-80 flex flex-col items-end md:items-center justify-between gap-2`}
    >
      <NavLink
        to={`/notes/${note.id}`}
        className="h-full w-full cursor-pointer"
      >
        <div className="h-full w-full bg-transparent rounded-lg p-4 border border-solid border-gray-100 hover:shadow-lg hover:shadow-slate-800 hover:scale-105 transition-all duration-150 ease-in-out">
          <div className="flex flex-col justify-between gap-2 text-gray-100">
            <h3 className="md:text-xl truncate">{note.title}</h3>
            <p className={`text-sm md:text-base ${className}`}>
              {note.content}
            </p>
          </div>
        </div>
      </NavLink>
      <input
        type="checkbox"
        checked={note.wantToDelete}
        onChange={() => dispatch(selectDeletion({ id: note.id }))}
        className={`h-5 w-5 ${
          checkVisible ? "visible" : "hidden"
        } mr-4 md:mr-0`}
      />
    </div>
  );
}

export default NoteItem;
