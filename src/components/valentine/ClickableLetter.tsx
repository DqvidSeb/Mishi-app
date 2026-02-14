import React, { useState } from "react";

import closedSrc from "../../assets/images/letter_closed.png";
import hoverSrc from "../../assets/images/letter_hover.png";

type Props = {
    onOpen?: () => void;
};

export default function ClickableLetter({ onOpen }: Props) {
    const [isHover, setIsHover] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const src = isHover ? hoverSrc : closedSrc;

    return (
        <button
            type="button"
            className="bg-transparent border-0 p-0 select-none"
            onPointerEnter={() => setIsHover(true)}
            onPointerLeave={() => {
                setIsHover(false);
                setIsPressed(false);
            }}
            onPointerDown={() => setIsPressed(true)}
            onPointerUp={() => setIsPressed(false)}
            onPointerCancel={() => setIsPressed(false)}
            onClick={() => {
                setIsPressed(true);
                window.setTimeout(() => setIsPressed(false), 80);
                onOpen?.();
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
