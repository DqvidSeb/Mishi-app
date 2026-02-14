// /src/hooks/useBgm.ts (VERSIÓN MEJORADA)
import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAudio } from "../providers/AudioProvider";

type UseBgmOptions = {
    silentPaths?: string[];
};

export function useBgm(options?: UseBgmOptions) {
    const { pathname } = useLocation();
    const audio = useAudio();
    const unlockAttemptedRef = useRef(false);

    const silentSet = useMemo(() => {
        return new Set(options?.silentPaths ?? []);
    }, [options?.silentPaths]);

    // 🎵 Control de reproducción por ruta
    useEffect(() => {
        const shouldBeSilent = silentSet.has(pathname);

        console.log(`🗺️ [BGM] Ruta: ${pathname} | Silencioso: ${shouldBeSilent}`);

        if (shouldBeSilent) {
            audio.pause();
            return;
        }

        // Intenta reproducir (puede fallar si autoplay está bloqueado)
        if (audio.isReady()) {
            console.log("🎵 [BGM] Intentando reproducir música de fondo...");
            void audio.play();
        } else {
            console.warn("⚠️ [BGM] Audio no está listo todavía");
        }
    }, [pathname, silentSet, audio]);

    // 🔓 Desbloqueo de autoplay por interacción del usuario
    useEffect(() => {
        const unlock = async () => {
            if (unlockAttemptedRef.current) {
                console.log("ℹ️ [BGM] Ya se intentó desbloquear anteriormente");
                return;
            }

            unlockAttemptedRef.current = true;

            const shouldBeSilent = silentSet.has(pathname);

            if (!shouldBeSilent && audio.isReady()) {
                console.log("🔓 [BGM] Desbloqueando audio por interacción del usuario...");

                try {
                    await audio.play();
                    console.log("✅ [BGM] Audio desbloqueado y reproduciendo");
                } catch (err) {
                    console.error("❌ [BGM] Error al desbloquear audio:", err);
                }
            }
        };

        // Escuchar CUALQUIER interacción del usuario
        const events = ["pointerdown", "keydown", "click", "touchstart"];

        events.forEach(event => {
            window.addEventListener(event, unlock, { once: true, capture: true });
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, unlock);
            });
        };
    }, [audio, pathname, silentSet]);

    // 🎯 Intento adicional cuando el audio esté listo
    useEffect(() => {
        if (!audio.isReady()) return;

        const shouldBeSilent = silentSet.has(pathname);

        if (!shouldBeSilent && !audio.isPlaying()) {
            console.log("🔄 [BGM] Audio listo, intentando reproducir...");
            void audio.play();
        }
    }, [audio, pathname, silentSet]);
}
