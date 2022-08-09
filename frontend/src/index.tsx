import { ChakraProvider } from "@chakra-ui/react";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Suspense>
        <App />
      </Suspense>
    </ChakraProvider>
  </React.StrictMode>
);
