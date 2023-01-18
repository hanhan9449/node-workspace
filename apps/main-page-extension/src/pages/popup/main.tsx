import ReactDOM from "react-dom/client";
import React from "react";
import {App} from "./App";
import {FluentProvider, teamsLightTheme} from "@fluentui/react-components";
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
            <App/>
    </React.StrictMode>
)