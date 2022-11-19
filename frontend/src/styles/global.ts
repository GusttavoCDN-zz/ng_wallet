import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --background: #111111;
    --red: #e52e4d;
    --green-dark: #015f43;
    --green: #00875f;
    --green-light: #00b37e;
    --text-base: #ffffff;
    --text-secondary: #c5c5c5;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body, input, textarea, button {
    font-family: 'IBM Plex Sans', sans-serif, Arial, Helvetica, sans-serif;
    font-weight: 400;
    background-color: var(--background);
  }

   h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }
`;

export { GlobalStyle };
