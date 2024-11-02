import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NoteStore } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={NoteStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
