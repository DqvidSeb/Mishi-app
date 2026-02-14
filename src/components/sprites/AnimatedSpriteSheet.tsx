// /src/components/sprites/AnimatedSpriteSheet.tsx
import React from "react";
import { useSpriteAnimator } from "../../hooks/useSpriteAnimator";
import SpriteSheet from "./SpriteSheet";

type Props = {
    src: string;
    frameWidth: number;
    frameHeight: number;
    frames: number;
    fps: number;
    loop?: boolean;
    isPlaying?: boolean;
    onComplete?: () => void;
    scale?: number;
    flipX?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

export default function AnimatedSpriteSheet({
    src,
    frameWidth,
    frameHeight,
    frames,
    fps,
    loop = true,
    isPlaying = true,
    onComplete,
    scale = 1,
    flipX = false,
    className,
    style,
}: Props) {
    const frameIndex = useSpriteAnimator({ frames, fps, loop, isPlaying, onComplete });

    return (
        <SpriteSheet
            src={src}
            frameWidth={frameWidth}
            frameHeight={frameHeight}
            frames={frames}
            frameIndex={frameIndex}
            scale={scale}
            flipX={flipX}
            className={className}
            style={style}
        />
    );
}
