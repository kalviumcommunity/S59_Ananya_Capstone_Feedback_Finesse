import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
  <GoogleOAuthProvider clientId="312593417943-ihfhojh5qqclhvk4e6h41t7i7l25mcl3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
  </BrowserRouter>
  </React.StrictMode>
);
