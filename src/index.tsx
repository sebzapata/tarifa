import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const textColor = "#e6f5cd";
// const backgroundColor = "#237e98";
export const mainColour = "#8cc4b4";
const buttonHoverColor = "#78baa7";
const checkboxColor = "#e6f5cd";
const selectedColor = "#8cc4b4";

const theme = createTheme({
  palette: {
    primary: {
      main: mainColour,
      dark: buttonHoverColor,
    },
  },
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: checkboxColor,
          "&.Mui-checked": {
            color: selectedColor,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: checkboxColor,
          "&.Mui-checked": {
            color: selectedColor,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: textColor,
          "&.MuiInputBase-root-MuiInput-root:before": {
            "border-bottom": "4px solid green",
          },
          // "&::before": {
          //   "border-bottom": "4px solid green", // use your color
          // },
        },
      },
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       color: "red",
    //     },
    //   },
    // },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
