import { THEME, useTheme } from "../utils/useTheme";
import useDarkMode from "use-dark-mode";

export const ThemeBtn = () => {
  const darkMode = useDarkMode(true);
  const theme = useTheme();
  return (
    <button className="btn-theme" type="button" onClick={darkMode.toggle}>
      {theme === "Dark-mode" ? THEME.LIGHT : THEME.DARK}
    </button>
  );
};