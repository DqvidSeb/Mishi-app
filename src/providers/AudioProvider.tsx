// /src/providers/AudioProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type AudioCtx = {
    play: () => Promise<void>;
    pause: () => void;
    stop: () => void;
    setMuted: (muted: boolean) => void;
    isReady: () => boolean;
    isPlaying: () => boolean;
};

const AudioContext = createContext<AudioCtx | null>(null);

function pickSource(): string {
    const a = document.createElement("audio");
    const canOgg = a.canPlayType('audio/ogg; codecs="vorbis"');
    const source = canOgg ? "/audio/Taylor-Swift-Lover.ogg" : "/audio/Taylor-Swift-Lover.mp3";

    console.log("🎵 [Audio] Formato seleccionado:", canOgg ? "OGG" : "MP3");
    console.log("🎵 [Audio] Ruta del archivo:", source);

    return source;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mutedRef = useRef(false);
    const [isReady, setIsReady] = useState(false);
    const isPlayingRef = useRef(false);

    // Crear el elemento de audio
    useEffect(() => {
        console.log("🎵 [Audio] Inicializando AudioProvider...");

        const audio = new Audio();
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = 0.20;

        // Eventos de depuración
        audio.addEventListener("loadeddata", () => {
            console.log("✅ [Audio] Archivo cargado correctamente");
            setIsReady(true);
        });

        audio.addEventListener("error", (e) => {
            console.error("❌ [Audio] Error al cargar:", e);
            console.error("❌ [Audio] Error code:", audio.error?.code);
            console.error("❌ [Audio] Error message:", audio.error?.message);
        });

        audio.addEventListener("canplaythrough", () => {
            console.log("✅ [Audio] Listo para reproducir sin interrupciones");
        });

        audio.addEventListener("play", () => {
            console.log("▶️ [Audio] Reproduciendo...");
            isPlayingRef.current = true;
        });

        audio.addEventListener("pause", () => {
            console.log("⏸️ [Audio] Pausado");
            isPlayingRef.current = false;
        });

        // Establecer la fuente DESPUÉS de agregar los listeners
        const source = pickSource();
        audio.src = source;

        audioRef.current = audio;

        // Limpieza
        return () => {
            console.log("🧹 [Audio] Limpiando AudioProvider...");
            audio.pause();
            audio.src = "";
            audioRef.current = null;
        };
    }, []);

    const api = useMemo<AudioCtx>(() => {
        return {
            play: async () => {
                const audio = audioRef.current;
                if (!audio) {
                    console.warn("⚠️ [Audio] No hay elemento de audio disponible");
                    return;
                }

                if (mutedRef.current) {
                    console.log("🔇 [Audio] Muteado, no reproduciendo");
                    return;
                }

                if (isPlayingRef.current) {
                    console.log("ℹ️ [Audio] Ya está reproduciéndose");
                    return;
                }

                try {
                    console.log("🎵 [Audio] Intentando reproducir...");
                    await audio.play();
                    console.log("✅ [Audio] Reproducción iniciada con éxito");
                } catch (err) {
                    // Autoplay bloqueado - es normal en navegadores modernos
                    console.warn("⚠️ [Audio] Autoplay bloqueado (esperando interacción del usuario):", err);
                }
            },

            pause: () => {
                const audio = audioRef.current;
                if (audio && isPlayingRef.current) {
                    console.log("⏸️ [Audio] Pausando...");
                    audio.pause();
                }
            },

            stop: () => {
                const audio = audioRef.current;
                if (!audio) return;

                console.log("⏹️ [Audio] Deteniendo...");
                audio.pause();
                audio.currentTime = 0;
                isPlayingRef.current = false;
            },

            setMuted: (muted: boolean) => {
                console.log(`🔇 [Audio] setMuted(${muted})`);
                mutedRef.current = muted;
                const audio = audioRef.current;

                if (!audio) return;

                if (muted && isPlayingRef.current) {
                    audio.pause();
                }
            },

            isReady: () => isReady,

            isPlaying: () => isPlayingRef.current,
        };
    }, [isReady]);

    return <AudioContext.Provider value={api}>{children}</AudioContext.Provider>;
}

export function useAudio() {
    const ctx = useContext(AudioContext);
    if (!ctx) {
        throw new Error("useAudio must be used within <AudioProvider />");
    }
    return ctx;
}
