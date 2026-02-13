// /src/components/transition/TransitionProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type TransitionApi = {
    fadeTo: (to: string) => Promise<void>;
    overlayOpacity: number;
};

const TransitionContext = createContext<TransitionApi | null>(null);

export function useTransition() {
    const ctx = useContext(TransitionContext);
    if (!ctx) throw new Error("useTransition must be used within <TransitionProvider />");
    return ctx;
}

const FADE_MS = 1800;

function wait(ms: number) {
    return new Promise<void>((res) => setTimeout(res, ms));
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const [overlayOpacity, setOverlayOpacity] = useState(1); // inicia en negro
    const navigate = useNavigate();

    // fade-in inicial (negro -> contenido)
    useEffect(() => {
        requestAnimationFrame(() => setOverlayOpacity(0));
    }, []);

    const fadeTo = async (to: string) => {
        // contenido -> negro
        setOverlayOpacity(1);
        await wait(FADE_MS);

        // cambia ruta mientras está negro
        navigate(to);

        // negro -> contenido
        requestAnimationFrame(() => setOverlayOpacity(0));
    };

    const value = useMemo(() => ({ fadeTo, overlayOpacity }), [overlayOpacity]);

    return (
        <TransitionContext.Provider value={value}>
            {children}

            {/* overlay negro para transiciones */}
            <div
                className="pointer-events-none absolute inset-0 bg-black transition-opacity"
                style={{ opacity: overlayOpacity, transitionDuration: `${FADE_MS}ms` }}
            />
        </TransitionContext.Provider>
    );
}
