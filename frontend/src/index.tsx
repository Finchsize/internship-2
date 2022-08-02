import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Main from "./routes/main";
import Register from "./routes/register";
import Signin from "./routes/signin";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signin" element={<Signin />} />
        <Route path="register" element={<Register />} />
        <Route path="main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
