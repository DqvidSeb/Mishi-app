// /src/components/valentine/ClickableLetter.tsx
import React, { useState } from "react";

import closedSrc from "../../assets/images/letter_closed.png";
import hoverSrc from "../../assets/images/letter_hover.png";

export default function ClickableLetter() {
    const [isHover, setIsHover] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const src = isHover ? hoverSrc : closedSrc;

    return (
        <button
            type="button"
            className="bg-transparent border-0 p-0 select-none"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => {
                setIsHover(false);
                setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onClick={() => {
                // por ahora no navega a nada, solo efecto visual
                setIsPressed(true);
                setTimeout(() => setIsPressed(false), 80);
            }}
            style={{
                transform: isPressed ? "translateY(3px)" : "translateY(0px)",
                transition: "transform 80ms",
            }}
        >
            <img
                src={src}
                draggable={false}
                className="w-[720px] max-w-[80vw] h-auto"
                style={{ imageRendering: "pixelated" }}
                alt="Letter"
            />
        </button>
    );
}
