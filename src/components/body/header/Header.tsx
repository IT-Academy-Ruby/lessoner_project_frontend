import { Link } from "react-router-dom";
import "./Header.css";
import { useTheme } from "../../../hooks/useTheme/useTheme";

const Header = () => {
  let { theme, setTheme } = useTheme();
  const darkTheme = () => {
    setTheme("dark");
  };
  const lightTheme = () => {
    setTheme("light");
  };
  return (
    <div className="nav-bar">
      <div className="change-themes">
      <button className="change_theme" onClick={darkTheme}>
        Dark
      </button>
      <button className="change_theme" onClick={lightTheme}>
        Light
      </button>
      </div>
      <Link to="/">
        <div>Lessoner</div>
      </Link>
      <Link to="/categories">
        <div>Categories</div>
      </Link>
      <Link to="/lessons">
        <div>Lessons</div>
      </Link>
      <Link to="/about">
        <div>About</div>
      </Link>
      <div>
        <button>English</button>
        <button>Русский</button>
      </div>
      <Link to="/users/sign_in">
        <button>LogIn</button>
      </Link>
      <Link to="/users/sign_up">
        <button>Register</button>
      </Link>
    </div>
  );
};
export default Header;
