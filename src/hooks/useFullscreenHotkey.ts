// /src/hooks/useFullscreenHotkey.ts
import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

export function useFullscreenHotkey() {
    useEffect(() => {
        const onKeyDown = async (e: KeyboardEvent) => {
            const isF11 = e.key === "F11" || e.code === "F11";
            if (!isF11) return;

            e.preventDefault();
            e.stopPropagation();

            try {
                const win = getCurrentWindow();
                const isFs = await win.isFullscreen();
                await win.setFullscreen(!isFs);
            } catch (err) {
                console.error("F11 fullscreen failed:", err);
            }
        };

        document.addEventListener("keydown", onKeyDown, true); // capture=true
        return () => document.removeEventListener("keydown", onKeyDown, true);
    }, []);
}
