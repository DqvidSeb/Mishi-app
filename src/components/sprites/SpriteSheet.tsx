// /src/components/sprites/SpriteSheet.tsx
import React from "react";

type Props = {
    src: string;
    frameWidth: number;
    frameHeight: number;
    frames: number;
    frameIndex: number;
    scale?: number; // integer recomendado (2,3,4,8...)
    flipX?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

export default function SpriteSheet({
    src,
    frameWidth,
    frameHeight,
    frames,
    frameIndex,
    scale = 1,
    flipX = false,
    className,
    style,
}: Props) {
    const safeScale = Math.max(1, Math.floor(scale));
    const safeIndex = ((frameIndex % frames) + frames) % frames;

    // 🔥 CLAVE: todo se calcula escalado
    const scaledFrameW = frameWidth * safeScale;
    const scaledFrameH = frameHeight * safeScale;

    const bgW = frameWidth * frames * safeScale;
    const bgH = frameHeight * safeScale;

    const x = safeIndex * frameWidth * safeScale;

    return (
        <div
            className={className}
            style={{
                width: scaledFrameW,
                height: scaledFrameH,
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `-${x}px 0px`,
                backgroundSize: `${bgW}px ${bgH}px`,
                imageRendering: "pixelated",
                transform: flipX ? "scaleX(-1)" : undefined,
                willChange: "background-position",
                ...style,
            }}
        />
    );
}
