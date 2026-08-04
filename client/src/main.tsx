import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { HistoryProvider } from "./context/HistoryContext";
import { SearchProvider } from "./context/SearchContext";
import { PlayerProvider } from "./context/PlayerContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ui/ToastContainer";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastProvider>
      <HistoryProvider>
        <SearchProvider>
          <PlayerProvider>
            <PlaylistProvider>
              <App />
              <ToastContainer />
            </PlaylistProvider>
          </PlayerProvider>
        </SearchProvider>
      </HistoryProvider>
    </ToastProvider>
  </BrowserRouter>
);