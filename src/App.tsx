import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { TransitionProvider } from "./components/transition/TransitionProvider";
import LoadingPage from "./pages/LoadingPage";
import MenuPage from "./pages/MenuPage";

export default function App() {
  return (
    <HashRouter>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        <TransitionProvider>
          <Routes>
            <Route path="/" element={<LoadingPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TransitionProvider>
      </div>
    </HashRouter>
  );
}
