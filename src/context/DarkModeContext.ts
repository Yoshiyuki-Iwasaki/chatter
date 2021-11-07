import React, { createContext } from "react";

interface DarkModeContextValue {
  theme: any;
  toggleDarkMode: any;
}

export const DarkModeContext = createContext<DarkModeContextValue>({
  theme: '',
  toggleDarkMode: "",
});
