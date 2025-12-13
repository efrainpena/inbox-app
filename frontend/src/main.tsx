import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);

/* #Es solo para ver si levanto el servidor#
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div
      style={{
        margin: "3rem",
        fontSize: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      Hola, React está funcionando.
    </div>
  </React.StrictMode>
);*/