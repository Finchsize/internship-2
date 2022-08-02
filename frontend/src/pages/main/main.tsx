import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <div>
      <h1>Clean template.</h1>
      <nav>
        <Link to="/signin">Sign in</Link> | <Link to="/register">Register</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Main;
