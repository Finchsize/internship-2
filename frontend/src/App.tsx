import React from "react";
import { Link, Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <h1>Clean template.</h1>
      <nav>
        <Link to="/signin">Sign in</Link> | <Link to="/register">Register</Link> | <Link to="/main">Main chat</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
