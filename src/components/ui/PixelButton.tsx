import React, { useMemo, useState } from "react";

import mediumNormal from "../../assets/ui/ui_medium_button_normal.png";
import mediumHover from "../../assets/ui/ui_medium_button_hover.png";
import mediumPressed from "../../assets/ui/ui_medium_button_pressed.png";

import smallNormal from "../../assets/ui/ui_small_button_normal.png";
import smallHover from "../../assets/ui/ui_small_button_hover.png";
import smallPressed from "../../assets/ui/ui_small_button_pressed.png";

type Size = "small" | "medium";

type Props = {
    label: string;
    onClick?: () => void;
    size?: Size;
    className?: string;
};

export default function PixelButton({
    label,
    onClick,
    size = "medium",
    className,
}: Props) {
    const [state, setState] = useState<"normal" | "hover" | "pressed">("normal");

    const src = useMemo(() => {
        if (size === "small") {
            return state === "normal" ? smallNormal : state === "hover" ? smallHover : smallPressed;
        }
        return state === "normal" ? mediumNormal : state === "hover" ? mediumHover : mediumPressed;
    }, [size, state]);

    const sizeClass = size === "small" ? "w-[240px] h-[64px]" : "w-[320px] h-[80px]";
    const textClass = size === "small" ? "text-[18px]" : "text-[20px]";

    return (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={() => setState("hover")}
            onMouseLeave={() => setState("normal")}
            onMouseDown={() => setState("pressed")}
            onMouseUp={() => setState("hover")}
            className={[
                "relative flex items-center justify-center select-none",
                "bg-transparent border-0 p-0",
                "font-dogica-pixel leading-none text-[#111]",
                "focus:outline-none",
                "transition-transform duration-75",
                sizeClass,
                textClass,
                className ?? "",
            ].join(" ")}
            style={{
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                imageRendering: "pixelated",
                transform: state === "pressed" ? "translateY(1px)" : "translateY(0px)",
            }}
        >
            {label}
        </button>
    );
}
