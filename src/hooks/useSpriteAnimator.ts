// /src/hooks/useSpriteAnimator.ts
import { useEffect, useRef, useState } from "react";

type Options = {
    frames: number;
    fps: number;
    loop?: boolean;
    isPlaying?: boolean;
    onComplete?: () => void;
};

export function useSpriteAnimator({
    frames,
    fps,
    loop = true,
    isPlaying = true,
    onComplete,
}: Options) {
    const [frame, setFrame] = useState(0);

    const rafRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const accRef = useRef<number>(0);
    const doneRef = useRef<boolean>(false);

    useEffect(() => {
        setFrame(0);
        doneRef.current = false;
        lastTimeRef.current = 0;
        accRef.current = 0;
    }, [frames, fps, loop]);

    useEffect(() => {
        if (!isPlaying) return;

        const frameMs = 1000 / Math.max(1, fps);

        const tick = (t: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = t;
            const dt = t - lastTimeRef.current;
            lastTimeRef.current = t;

            accRef.current += dt;

            if (accRef.current >= frameMs) {
                const steps = Math.floor(accRef.current / frameMs);
                accRef.current -= steps * frameMs;

                setFrame((prev) => {
                    if (doneRef.current) return prev;

                    const next = prev + steps;

                    if (loop) return next % frames;

                    if (next >= frames - 1) {
                        doneRef.current = true;
                        onComplete?.();
                        return frames - 1;
                    }

                    return next;
                });
            }

            rafRef.current = window.requestAnimationFrame(tick);
        };

        rafRef.current = window.requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
    }, [frames, fps, loop, isPlaying, onComplete]);

    return frame;
}
