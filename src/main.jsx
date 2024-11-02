import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={NoteStore}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
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
      </Routes>
    </Router>
  </Provider>
);
