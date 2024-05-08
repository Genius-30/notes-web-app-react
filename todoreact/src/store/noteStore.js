import { configureStore } from "@reduxjs/toolkit";
import NoteSlice from "./noteSlice";

export const NoteStore = configureStore({
  reducer: NoteSlice,
});
