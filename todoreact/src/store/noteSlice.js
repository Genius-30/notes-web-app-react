import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  toogleToDelete: false,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      const note = {
        id: nanoid(),
        title: action.payload.title,
        content: action.payload.content,
        wantToDelete: false,
      };
      state.notes.unshift(note);
    },
    deleteNote: (state) => {
      state.notes = state.notes.filter((note) => !note.wantToDelete);
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id
          ? {
              ...note,
              title: action.payload.title,
              content: action.payload.content,
            }
          : note
      );
    },
    selectDeletion: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id
          ? { ...note, wantToDelete: !note.wantToDelete }
          : note
      );
    },
  },
});

export const { addNote, deleteNote, updateNote, selectDeletion, setNotes } =
  noteSlice.actions;
export default noteSlice.reducer;
