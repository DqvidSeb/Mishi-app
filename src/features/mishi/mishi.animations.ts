export type MishiAnimName = "idle" | "walk" | "jump";

export const MISHI_SPRITE = {
    frameWidth: 24,
    frameHeight: 24,
} as const;

export const MISHI_ANIMS: Record<MishiAnimName, { frames: number; fps: number; loop: boolean }> = {
    idle: { frames: 4, fps: 6, loop: true },
    walk: { frames: 4, fps: 12, loop: true },
    jump: { frames: 6, fps: 12, loop: false }, // tu jump es acción (one-shot)
} as const;
