import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap');

  * {
    box-sizing: border-box;
  }
  html, body, #root {
    width: 100%;
    height: 100%;

    font-family: 'Raleway', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    color: #111111;

    margin: 0;
    padding: 0;

    overflow: hidden;
  } 
`;

export default GlobalStyle;
