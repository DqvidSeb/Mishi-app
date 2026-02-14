// /src/hooks/useBgm.ts
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAudio } from "../providers/AudioProvider";

type UseBgmOptions = {
    silentPaths?: string[];
};

export function useBgm(options?: UseBgmOptions) {
    const { pathname } = useLocation();
    const audio = useAudio();

    const silentSet = useMemo(() => {
        return new Set(options?.silentPaths ?? []);
    }, [options?.silentPaths]);

    useEffect(() => {
        const shouldBeSilent = silentSet.has(pathname);

        if (shouldBeSilent) {
            audio.pause();
            return;
        }

        void audio.play();
    }, [pathname, silentSet, audio]);

    // 🔓 desbloqueo por interacción (autoplay policy)
    useEffect(() => {
        const unlock = () => {
            void audio.play();
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
        };

        window.addEventListener("pointerdown", unlock, { once: true });
        window.addEventListener("keydown", unlock, { once: true });

        return () => {
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
        };
    }, [audio]);
}
