import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Home, Notes } from "./components/index";
import Layout from "./Layout";
import DetailNote from "./components/DetailNote";
import { NoteStore } from "./store/noteStore";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="notes" element={<Notes />} />
      <Route path="note/:noteId" element={<DetailNote />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={NoteStore}>
    <RouterProvider router={router} />
  </Provider>
);
