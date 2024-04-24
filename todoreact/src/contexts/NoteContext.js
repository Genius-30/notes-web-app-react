import { createContext, useContext } from "react";

export const NoteContext = createContext({
  notes: [
    {
      id: "1",
      title: "New note",
      content: "some content",
      toogleToDelete: false,
    },
  ],
  addNote: (title, content) => {},
  deleteNote: () => {},
  updateNote: () => {},
  selectDeletion: (id) => {},
});

export const useNote = () => {
  return useContext(NoteContext);
};

export const NoteProvider = NoteContext.Provider;
