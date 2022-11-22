import "./ThemeBtn.scss";
import { THEME, useTheme } from "../utils/useTheme";
import useDarkMode from "use-dark-mode";

const ThemeBtn = () => {
  const darkMode = useDarkMode(true);
  const theme = useTheme();
  return (
    <button className="btn-theme" type="button" onClick={darkMode.toggle}>
      {theme === "dark-mode" ? THEME.DARK : THEME.LIGHT}
    </button>
  );
};
export default ThemeBtn;
