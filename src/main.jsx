import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Home,
  Notes,
  DetailNote,
  AuthLayout,
  Login,
  Signup,
} from "./components/index";
import Layout from "./Layout";
import { NoteStore } from "./store/store";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route
        path="login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route
        path="notes"
        element={
          <AuthLayout authentication>
            <Notes />
          </AuthLayout>
        }
      />
      <Route
        path="notes/:noteId"
        element={
          <AuthLayout authentication>
            <DetailNote />
          </AuthLayout>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={NoteStore}>
    <RouterProvider router={router} />
  </Provider>
);
