import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { TransitionProvider } from "./components/transition/TransitionProvider";
import { useFullscreenHotkey } from "./hooks/useFullscreenHotkey";
import LoadingPage from "./pages/LoadingPage";
import MenuPage from "./pages/MenuPage";
import ValentinePage from "./pages/valentine/ValentinePage";

export default function App() {

  useFullscreenHotkey();

  return (
    <HashRouter>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        <TransitionProvider>
          <Routes>
            <Route path="/" element={<LoadingPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/valentine" element={<ValentinePage />} />
            <Route path="/loading" element={<LoadingPage />} />
          </Routes>
        </TransitionProvider>
      </div>
    </HashRouter>
  );
}
