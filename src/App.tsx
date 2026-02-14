// /src/App.tsx
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { TransitionProvider } from "./components/transition/TransitionProvider";
import { useFullscreenHotkey } from "./hooks/useFullscreenHotkey";
import { PATHS } from "./routes/paths";

import LoadingPage from "./pages/LoadingPage";
import MenuPage from "./pages/MenuPage";
import ValentinePage from "./pages/valentine/ValentinePage";
import MiniGamePage from "./pages/minigames/be-my-valentine/MiniGamePage";
import ValentineWinPage from "./pages/minigames/be-my-valentine/ValentineWinPage";

import { useBgm } from "./hooks/useBgm";

function AppRoutes() {
  useBgm({
    silentPaths: [PATHS.root, PATHS.loading],
  });

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <TransitionProvider>
        <Routes>
          <Route path={PATHS.root} element={<LoadingPage />} />
          <Route path={PATHS.loading} element={<LoadingPage />} />
          <Route path={PATHS.menu} element={<MenuPage />} />
          <Route path={PATHS.valentine} element={<ValentinePage />} />
          <Route path={PATHS.minigames.beMyValentine} element={<MiniGamePage />} />
          <Route path={PATHS.minigames.beMyValentineWin} element={<ValentineWinPage />} />
          <Route path="*" element={<Navigate to={PATHS.root} replace />} />
        </Routes>
      </TransitionProvider>
    </div>
  );
}

export default function App() {
  useFullscreenHotkey();

  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
