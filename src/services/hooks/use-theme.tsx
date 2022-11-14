import { useLayoutEffect, useState } from "react";

export const useTheme=()=>{
  const[ theme, setTheme ] = useState(localStorage.getItem("select-theme") || "light");
  useLayoutEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("select-theme", theme);
  },[ theme ]);
  return{ theme, setTheme };

};