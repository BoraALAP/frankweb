import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Raleway:400,500,600,700&display=swap');

  body{
    font-family: ${({ theme }) => theme.font.family.main};
    font-weight: 600;
  }
`;

export default GlobalStyle;
