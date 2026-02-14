import React, { createContext, useContext, useEffect, useMemo, useRef } from "react";

type AudioCtx = {
    play: () => Promise<void>;
    pause: () => void;
    stop: () => void;
    setMuted: (muted: boolean) => void;
    isReady: () => boolean;
};

const AudioContext = createContext<AudioCtx | null>(null);

function pickSource(): string {
    // Intenta ogg primero, si el navegador no lo soporta, usa mp3
    const a = document.createElement("audio");
    const canOgg = a.canPlayType('audio/ogg; codecs="vorbis"');
    return canOgg ? "/audio/Taylor-Swift-Lover.ogg" : "/audio/Taylor-Swift-Lover.mp3";
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mutedRef = useRef(false);

    if (!audioRef.current) {
        const audio = new Audio(pickSource());
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = 0.50; // ajusta
        audioRef.current = audio;
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Limpieza al cerrar app / hot reload
        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    const api = useMemo<AudioCtx>(() => {
        return {
            play: async () => {
                const audio = audioRef.current;
                if (!audio || mutedRef.current) return;

                // Reglas: algunos entornos bloquean autoplay hasta interacción del usuario.
                try {
                    await audio.play();
                } catch {
                    // Ignora: se desbloquea cuando el usuario haga click/tecla
                }
            },
            pause: () => {
                audioRef.current?.pause();
            },
            stop: () => {
                const audio = audioRef.current;
                if (!audio) return;
                audio.pause();
                audio.currentTime = 0;
            },
            setMuted: (muted: boolean) => {
                mutedRef.current = muted;
                const audio = audioRef.current;
                if (!audio) return;

                if (muted) {
                    audio.pause();
                }
            },
            isReady: () => Boolean(audioRef.current),
        };
    }, []);

    return <AudioContext.Provider value={api}>{children}</AudioContext.Provider>;
}

export function useAudio() {
    const ctx = useContext(AudioContext);
    if (!ctx) {
        throw new Error("useAudio must be used within <AudioProvider />");
    }
    return ctx;
}
