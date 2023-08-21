import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import PaisProvider from "./context/Contexto";
import LoginProvider from "./context/SessionLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginProvider>
  <PaisProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </PaisProvider>
  </LoginProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
