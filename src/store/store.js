import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./noteSlice";
import authSlice from "./authSlice";

export const NoteStore = configureStore({
  reducer: { note: noteSlice, auth: authSlice },
});
