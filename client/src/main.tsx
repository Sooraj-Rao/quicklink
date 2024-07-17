import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="   sm:bg-[linear-gradient(to_top,_#dfe9f3_0%,_white_100%)] dark:bg-background sm:dark:bg-gradient-to-r from-slate-900 to-gray-800">
      <App />
    </div>
  </React.StrictMode>
);
