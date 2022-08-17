import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Register } from "./pages/register";
import { Signin } from "./pages/signin";
import { Edit } from "./pages/edit";
import Helmet from "react-helmet";
const App = () => {
  return (
    <BrowserRouter>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chat App</title>
        <meta name="description" content="Chat app built using React.js" />
        <meta name="authors" content="Maciej Malinowski, Marcel Alefierowicz" />

        <meta property="og:title" content="Chat App" />
        <meta
          property="og:description"
          content="Chat app built using React.js"
        />

        <meta itemProp="name" content="Chat App" />
        <meta itemProp="description" content="Chat app build using React.js" />

        <meta name="twitter:title" content="Chat App" />
        <meta
          name="twitter:description"
          content="Chat app built using React.js"
        />
      </Helmet>
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
