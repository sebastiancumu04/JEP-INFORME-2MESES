import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import JEPReport from "./JEPReport";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <JEPReport />
  </StrictMode>
);
