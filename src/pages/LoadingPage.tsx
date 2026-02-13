// /src/pages/LoadingPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useTransition } from "../components/transition/TransitionProvider";
import loadScreen from "../assets/images/load_screen.png";

const LOADING_MS = 4200;

export default function LoadingPage() {
    const { fadeTo } = useTransition();
    const [dots, setDots] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setDots((d) => (d + 1) % 4), 350);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => {
            fadeTo("/menu");
        }, LOADING_MS);
        return () => clearTimeout(t);
    }, [fadeTo]);

    const dotsText = useMemo(() => ".".repeat(dots), [dots]);

    return (
        <div className="absolute inset-0">
            <img
                src={loadScreen}
                className="h-full w-full object-cover select-none"
                draggable={false}
            />

            {/* texto cargando abajo centrado */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 font-dogica-pixel text-[32px] text-[#111]">
                Cargando
                <span className="inline-block w-[56px] text-left">{dotsText}</span>
            </div>
        </div>
    );
}
