import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="nav-bar">
      <Link to="/">
        <div>Lessoner</div>
      </Link>
      <Link to="/categories">
        <div >Categories</div>
      </Link>
      <Link to="/lessons">
        <div >Lessons</div>
      </Link>
      <Link to="/about">
        <div >About</div>
      </Link>
      <div>
        <button>English</button>
        <button>Русский</button>
      </div>
      <Link to="/users/sign_in">
        <button>LogIn</button>
      </Link>
    </div>
  );
};
export default Header;
