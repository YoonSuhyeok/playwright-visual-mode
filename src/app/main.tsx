import React from "react";
import ReactDOM from "react-dom/client";
import App from "../page/App";
import 'primereact/resources/themes/lara-light-blue/theme.css';  // 테마 CSS
import 'primereact/resources/primereact.min.css';               // PrimeReact 기본 CSS

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
