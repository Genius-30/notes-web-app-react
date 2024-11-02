import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NoteStore } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={NoteStore}>
    <App />
  </Provider>
);
