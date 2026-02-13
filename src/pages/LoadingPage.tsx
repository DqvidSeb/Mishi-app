// /src/pages/LoadingPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTransition } from "../components/transition/TransitionProvider";
import loadScreen from "../assets/images/load_screen.png";

const DEFAULT_LOADING_MS = 3500;

export default function LoadingPage() {
    const { fadeTo } = useTransition();
    const [params] = useSearchParams();

    const next = params.get("next") || "/menu";
    const ms = Number(params.get("ms") || DEFAULT_LOADING_MS);

    const [dots, setDots] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setDots((d) => (d + 1) % 4), 350);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => {
            fadeTo(next);
        }, ms);
        return () => clearTimeout(t);
    }, [fadeTo, next, ms]);

    const dotsText = useMemo(() => ".".repeat(dots), [dots]);

    return (
        <div className="absolute inset-0">
            <img
                src={loadScreen}
                className="h-full w-full object-cover select-none"
                draggable={false}
            />

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 font-dogica-pixel text-[32px] text-[#111]">
                Cargando
                <span className="inline-block w-[56px] text-left">{dotsText}</span>
            </div>
        </div>
    );
}
