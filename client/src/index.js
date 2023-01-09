import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/auth/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <AuthContextProvider>
    <DarkModeContextProvider>
      <App tab="home" />
    </DarkModeContextProvider>
  </AuthContextProvider>);

