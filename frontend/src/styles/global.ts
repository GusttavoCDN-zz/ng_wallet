import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body, input, textarea, button {
    font-family: 'IBM Plex Sans', sans-serif, Arial, Helvetica, sans-serif;
    font-weight: 400;
  }

   h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }
`;

export { GlobalStyle };
