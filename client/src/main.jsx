import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import UserStore from "./store/UserStore.js";
import DeviceStore from "./store/DeviceStore.js";

export const Context = createContext(null);

createRoot(document.getElementById("root")).render(
  <>
    <Context.Provider
      value={{
        user: new UserStore(),
        device: new DeviceStore(),
      }}
    >
      <StrictMode>
        <App />
      </StrictMode>
    </Context.Provider>
  </>,
);
