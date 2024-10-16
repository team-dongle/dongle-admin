"use client";

import { createGlobalStyle } from "styled-components";
import { resetCSS } from "./reset";

const GlobalStyle = createGlobalStyle`
    ${resetCSS}
    * {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        width: 100%;
        height: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #fff;
    }

    &:link, &:visited {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
    }

    a {
        font-size: inherit;
    }
`;

export default GlobalStyle;
