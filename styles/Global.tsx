import { createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from "../styles/Themes";

export const GlobalStyle = createGlobalStyle`
  header {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.txt};
  }

  h1,h2,h3,h4,h5,p,button,span,a {
    color: ${({ theme }) => theme.txt};
  }

  aside,main {
    background: ${({ theme }) => theme.bg};
  }
`;