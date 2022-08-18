import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Register } from "./pages/register";
import { Signin } from "./pages/signin";
import { Edit } from "./pages/edit";
import { MetaTags } from "./components/MetaTags/MetaTags";
const App = () => {
  return (
    <BrowserRouter>
      <MetaTags
        title="Chat App"
        description="Chat app built using react.js"
        authors="Maciej Malinowski, Marcel Alefierowicz"
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:id" element={<Dashboard />} />
        <Route path="signin" element={<Signin />} />
        <Route path="register" element={<Register />} />
        <Route path="edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
