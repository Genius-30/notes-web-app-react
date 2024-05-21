import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import databaseService from "../appwrite/db";

export const fetchNotes = createAsyncThunk(
  "note/fetchNotes",
  async (userId) => {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const notesData = await databaseService.getNotesByUserId(userId);
    if (notesData) {
      return notesData.documents;
    }
    return [];
  }
);

const noteSlice = createSlice({
  name: "note",

  initialState: {
    notes: [],
    selectedNoteIds: [],
  },

  reducers: {
    toggleSelectNote: (state, action) => {
      const noteId = action.payload;
      if (state.selectedNoteIds.includes(noteId)) {
        state.selectedNoteIds = state.selectedNoteIds.filter(
          (id) => id !== noteId
        );
      } else {
        state.selectedNoteIds.push(noteId);
      }
    },

    clearSelectedNoteIds: (state) => {
      state.selectedNoteIds = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
  },
});

export const { setNotes, toggleSelectNote, clearSelectedNoteIds } =
  noteSlice.actions;
export default noteSlice.reducer;
