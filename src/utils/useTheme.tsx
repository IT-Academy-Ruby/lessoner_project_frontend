import React from "react";
import useDarkMode from "use-dark-mode";
export const THEME = { DARK: "Dark-mode", LIGHT: "Light-mode" };

export const useTheme = () => {
  const darkMode = useDarkMode();
  const [theme, setTheme] = React.useState(THEME.DARK);
  React.useEffect(() => {
    setTheme(darkMode?.value ? THEME.DARK : THEME.LIGHT);
  }, [darkMode.value]);

  return theme;
};
