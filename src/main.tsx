import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWhatsAppContactTracking } from "./lib/fbq";

initWhatsAppContactTracking();

createRoot(document.getElementById("root")!).render(<App />);
