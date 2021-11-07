import React, { useState } from "react";
import "../../styles/globals.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import { GlobalStyle } from "../../styles/Global";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../styles/Themes";
import { DarkModeContext } from "../context/DarkModeContext";



const MyApp = ({ Component, pageProps }) => {
    const [theme, setTheme] = useState('dark');

  const toggleDarkMode = () => {
      console.log(theme);
      theme === "light" ? setTheme("dark") : setTheme("light");
      const switchedMode = localStorage.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", switchedMode);
    };

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
