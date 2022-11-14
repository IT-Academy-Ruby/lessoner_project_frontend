import { useLayoutEffect, useState } from "react";

export const useTheme=()=>{
  const [theme, setTheme]=useState(localStorage.getItem("selectTheme") || "dark");
  useLayoutEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("selectTheme", theme);
  }, [ theme ]);

  return {theme,setTheme};
};