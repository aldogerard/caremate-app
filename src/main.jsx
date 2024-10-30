import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/global.css";
import App from "@/App";
import store from "@/redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
