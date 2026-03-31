import type { CSSProperties } from "react";
import { useState } from "react";

import miniLetterHover from "../../assets/images/mini-letter-hover.png";
import miniLetter from "../../assets/images/mini-letter.png";

type Props = {
    author: string;
    index: number;
    onOpen: () => void;
};

type SparkleConfig = {
    className: string;
    style: CSSProperties;
};

const SPARKLE_VARIANTS: SparkleConfig[][] = [
    [
        { className: "mini-letter-sparkle", style: { top: "8px", left: "8px", animationDelay: "0ms" } },
        { className: "mini-letter-sparkle mini-letter-sparkle-sm", style: { top: "24px", right: "2px", animationDelay: "180ms" } },
        { className: "mini-letter-sparkle mini-letter-sparkle-sm", style: { bottom: "18px", left: "0px", animationDelay: "320ms" } },
        { className: "mini-letter-sparkle", style: { right: "4px", bottom: "10px", animationDelay: "120ms" } },
        { className: "mini-letter-sparkle mini-letter-sparkle-sm", style: { top: "50px", left: "-10px", animationDelay: "480ms" } },
        { className: "mini-letter-sparkle", style: { bottom: "44px", right: "-8px", animationDelay: "620ms" } },
        { className: "mini-letter-sparkle mini-letter-sparkle-xs", style: { top: "-2px", left: "58px", animationDelay: "260ms" } },
    ],
    [
        { className: "mini-letter-sparkle", style: { top: "6px", right: "10px", animationDelay: "0ms" } },
        { className: "mini-letter-sparkle mini-letter-sparkle-sm", style: { top: "34px", left: "4px", animationDelay: "150ms" } },
        { className: "mini-letter-sparkle", style: { bottom: "14px", left: "8px", animationDelay: "300ms" } },
        { className: "mini-letter-sparkle mini-letter-sparkle-sm", style: { right: "-2px", bottom: "26px", animationDelay: "460ms" } },
        { className: "mini-letter-sparkle mini-letter-sparkle-sm", style: { top: "54px", right: "-10px", animationDelay: "620ms" } },
        { className: "mini-letter-sparkle", style: { bottom: "46px", left: "-8px", animationDelay: "220ms" } },
        { className: "mini-letter-sparkle mini-letter-sparkle-xs", style: { top: "-4px", right: "56px", animationDelay: "540ms" } },
    ],
];

export default function MiniLetterCard({ author, index, onOpen }: Props) {
    const [isHover, setIsHover] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const src = isHover ? miniLetterHover : miniLetter;
    const sparkleVariant = index % 2 === 0 ? "rose" : "gold";
    const sparkleClassName = isHover ? `mini-letter-sparkle-active mini-letter-sparkle-active-${sparkleVariant}` : "";
    const sparkleConfigs = SPARKLE_VARIANTS[index % SPARKLE_VARIANTS.length];

    return (
        <div
            className="mini-letter-card-enter"
            style={{
                animationDelay: `${index * 90}ms`,
            }}
        >
            <button
                type="button"
                className="flex cursor-pointer flex-col items-center gap-3 bg-transparent border-0 p-0 select-none focus:outline-none"
                aria-label={`Open letter from ${author}`}
                onPointerEnter={() => setIsHover(true)}
                onPointerLeave={() => {
                    setIsHover(false);
                    setIsPressed(false);
                }}
                onPointerDown={() => setIsPressed(true)}
                onPointerUp={() => setIsPressed(false)}
                onPointerCancel={() => setIsPressed(false)}
                onBlur={() => {
                    setIsHover(false);
                    setIsPressed(false);
                }}
                onClick={onOpen}
                style={{
                    boxShadow: "none",
                    transform: isPressed ? "translateY(2px)" : isHover ? "translateY(-4px)" : "translateY(0px)",
                    transition: "transform 120ms ease",
                }}
            >
                <div className="min-h-[34px] max-w-[180px] text-center font-dogica-pixel text-[13px] leading-snug text-[#111] break-words">
                    {author}
                </div>

                <div className="relative flex items-center justify-center">
                    <div
                        className={[
                            "pointer-events-none absolute left-1/2 top-1/2 h-[154px] w-[154px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-all duration-300",
                            sparkleVariant === "rose"
                                ? "bg-[radial-gradient(circle,_rgba(255,165,196,0.82)_0%,_rgba(255,212,225,0.42)_42%,_rgba(255,246,242,0)_76%)]"
                                : "bg-[radial-gradient(circle,_rgba(255,220,181,0.8)_0%,_rgba(255,235,210,0.42)_42%,_rgba(255,246,242,0)_76%)]",
                            isHover ? "scale-125 opacity-100" : "scale-90 opacity-0",
                        ].join(" ")}
                    />
                    <div
                        className={[
                            "pointer-events-none absolute left-1/2 top-1/2 h-[112px] w-[112px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-lg transition-all duration-300",
                            sparkleVariant === "rose"
                                ? "bg-[radial-gradient(circle,_rgba(255,245,249,0.88)_0%,_rgba(255,190,214,0.18)_55%,_rgba(255,246,242,0)_84%)]"
                                : "bg-[radial-gradient(circle,_rgba(255,252,244,0.9)_0%,_rgba(255,226,189,0.18)_55%,_rgba(255,246,242,0)_84%)]",
                            isHover ? "scale-115 opacity-100" : "scale-90 opacity-0",
                        ].join(" ")}
                    />

                    {sparkleConfigs.map((sparkle, sparkleIndex) => (
                        <span
                            key={`${sparkleVariant}-${sparkleIndex}`}
                            className={`${sparkle.className} mini-letter-sparkle-${sparkleVariant} ${sparkleClassName}`}
                            style={sparkle.style}
                        />
                    ))}

                    <img
                        src={src}
                        alt=""
                        draggable={false}
                        className={[
                            "relative z-10 h-auto w-[148px] max-w-[28vw] transition-all duration-300",
                            isHover
                                ? sparkleVariant === "rose"
                                    ? "scale-[1.045] drop-shadow-[0_0_22px_rgba(176,48,92,0.38)]"
                                    : "scale-[1.045] drop-shadow-[0_0_22px_rgba(255,191,140,0.42)]"
                                : "scale-100",
                        ].join(" ")}
                        style={{ imageRendering: "pixelated" }}
                    />
                </div>
            </button>
        </div>
    );
}
