import React from "react";
import ReactDOM from "react-dom";
import "./Styles/styles.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

// Clear local storage only on the first load
if (!localStorage.getItem("appStarted")) {
  localStorage.clear();
  localStorage.setItem("appStarted", "true");
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);