import React, { useState, useEffect } from "react";
import "../../styles/globals.css";
import { GlobalStyle } from "../../styles/Global";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../styles/Themes";
import { DarkModeContext } from "../context/DarkModeContext";

const MyApp = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState('dark');

  const setMode = mode => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  }

  const toggleDarkMode = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme ? setTheme(localTheme) : setMode("light");
  }, [])

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <DarkModeContext.Provider value={{ theme, toggleDarkMode }}>
        <GlobalStyle />
        <Component {...pageProps} />
      </DarkModeContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
