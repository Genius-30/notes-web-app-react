import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import databaseService from "../appwrite/db";
import { fetchNotes } from "../store/noteSlice";
import { useDispatch, useSelector } from "react-redux";

function DetailNote() {
  const [note, setNote] = useState(null);
  const { noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isContentEditable, setIsContentEditable] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = async () => {
    if (note.title !== title || note.content !== content) {
      if (title === "" || content === "") {
        toast.error("Title and content can't be empty!");
      } else {
        const userId = userData.userData.$id;
        try {
          await databaseService.updateNote(noteId, { title, content });
          toast.success("Note saved successfully!");
          dispatch(fetchNotes(userId));
        } catch (error) {
          toast.error("Failed to save note!");
        } finally {
          setIsSaving(false);
        }
      }
    }
  };

  useEffect(() => {
    if (!noteId) {
      toast.error("Invalid Note ID");
      navigate("/");
      return;
    }

    const fetchNote = async () => {
      try {
        const note = await databaseService.getNote(noteId);
        if (!note) {
          toast.error("Error fetching note");
          navigate("/");
          return;
        }
        setNote(note);
        setTitle(note.title);
        setContent(note.content);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Error fetching note");
        navigate("/");
      }
    };

    fetchNote();
  }, [noteId, navigate]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="h-full w-full text-gray-100 flex items-center justify-center">
        {note ? (
          <div className="h-5/6 w-[85%] sm:w-4/5 md:w-9/12 lg:w-3/5 mx-auto flex flex-col gap-2 md:gap-6 py-4 absolute top-50%">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={() => setIsTitleEditable(!isTitleEditable)}
              readOnly={isTitleEditable}
              className="w-full text-2xl md:text-4xl leading-[50px] bg-transparent outline-none"
            />
            <textarea
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onClick={() => setIsContentEditable(!isContentEditable)}
              readOnly={isContentEditable}
              className="basis-full w-full text-lg md:text-2xl leading-8 overflow-y-auto scroll-smooth bg-transparent outline-none resize-none"
            />
            <Button
              children={isSaving ? "Saving..." : "Save"}
              className="w-24 absolute bottom-4 right-4 shadow-md shadow-slate-900 text-center py-3"
              onClick={handleUpdate}
            />
          </div>
        ) : (
          <p className="text-xl">Loading Note...</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default DetailNote;
