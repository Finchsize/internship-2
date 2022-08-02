import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import { Register } from "./pages/register";
import { Signin } from "./pages/signin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="signin" element={<Signin />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
