import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster richColors expand={true} position="top-right" />
    <GoogleOAuthProvider clientId="200809537381-dfbhcef1se00653hlscr0j358frolcgg.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
