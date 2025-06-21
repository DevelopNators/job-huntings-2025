import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { store } from './store';
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.js";
import { HelmetProvider } from "react-helmet-async";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>
  // </StrictMode>
);
