import styles from "./Common.module.css";
import { Link } from "react-router-dom";
import { useToken } from "../context/TokenContext";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { token, handleToken } = useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const signout = () => {
    localStorage.removeItem("token");
    handleToken("");
    navigate("/");
  };
  return (
    <nav className={styles.nav}>
      <h1>Heet Code</h1>
      <ul>
        {token ? (
          <li>
            <button onClick={signout}>Sign Out</button>
          </li>
        ) : location.pathname == "/signup" ? (
          <li>
            <Link to="/">
              <button>Sign In</button>
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
