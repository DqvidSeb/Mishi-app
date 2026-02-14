// /src/pages/minigames/be-my-valentine/MiniGamePage.tsx
import { useEffect, useMemo, useRef, useState } from "react";

import mishiIdle from "../../../assets/sprites/mishi/mishi_idle.png";
import mishiWalk from "../../../assets/sprites/mishi/mishi_walk.png";
import mishiJump from "../../../assets/sprites/mishi/mishi_jump.png";

import yesNormal from "../../../assets/sprites/valentine-minigame/buttons/btn_yes_normal.png";
import yesPressed from "../../../assets/sprites/valentine-minigame/buttons/btn_yes_pressed.png";
import noNormal from "../../../assets/sprites/valentine-minigame/buttons/btn_no_normal.png";

import { useTransition } from "../../../components/transition/TransitionProvider";
import AnimatedSpriteSheet from "../../../components/sprites/AnimatedSpriteSheet";

import { PATHS } from "../../../routes/paths";
import { toLoading } from "../../../routes/loading";

type Rect = { x: number; y: number; w: number; h: number };
type AnimName = "idle" | "walk" | "jump";

function intersects(a: Rect, b: Rect) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}

export default function MiniGamePage() {
    const { fadeTo } = useTransition();
    const winPath = PATHS.minigames.beMyValentineWin;

    const rootRef = useRef<HTMLDivElement | null>(null);

    // Viewport
    const [size, setSize] = useState({ w: 1280, h: 720 });

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const ro = new ResizeObserver(() => {
            const r = el.getBoundingClientRect();
            setSize({ w: Math.floor(r.width), h: Math.floor(r.height) });
        });

        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Tutorial visible 10s
    const [showTutorial, setShowTutorial] = useState(true);
    useEffect(() => {
        const t = window.setTimeout(() => setShowTutorial(false), 10_000);
        return () => window.clearTimeout(t);
    }, []);

    // Controls (refs)
    const keysRef = useRef({ left: false, right: false, jump: false });

    useEffect(() => {
        const clearKeys = () => {
            keysRef.current.left = false;
            keysRef.current.right = false;
            keysRef.current.jump = false;
        };

        const onDown = (e: KeyboardEvent) => {
            if (e.code === "KeyA" || e.code === "ArrowLeft") {
                keysRef.current.left = true;
                e.preventDefault();
            }
            if (e.code === "KeyD" || e.code === "ArrowRight") {
                keysRef.current.right = true;
                e.preventDefault();
            }
            if (e.code === "Space") {
                keysRef.current.jump = true;
                e.preventDefault();
            }
        };

        const onUp = (e: KeyboardEvent) => {
            if (e.code === "KeyA" || e.code === "ArrowLeft") keysRef.current.left = false;
            if (e.code === "KeyD" || e.code === "ArrowRight") keysRef.current.right = false;
            if (e.code === "Space") keysRef.current.jump = false;
        };

        window.addEventListener("keydown", onDown, { passive: false });
        window.addEventListener("keyup", onUp);
        window.addEventListener("blur", clearKeys);

        return () => {
            window.removeEventListener("keydown", onDown);
            window.removeEventListener("keyup", onUp);
            window.removeEventListener("blur", clearKeys);
        };
    }, []);

    // Colors / layout
    const bg = "#ffd1ce";
    const floorColor = "#1f1b2e";

    // Piso responsivo
    const floorH = clamp(Math.round(size.h * 0.22), 160, 260);
    const floorTop = size.h - floorH;

    // Sprites sizes
    const frameW = 24;
    const frameH = 24;

    // Personaje
    const mishiScale = 5;

    // Botones
    const btnScale = 0.75;

    const mishiW = frameW * mishiScale;
    const mishiH = frameH * mishiScale;

    const btnW = Math.round(126 * btnScale);
    const btnH = Math.round(32 * btnScale);

    // Ground
    const groundY = floorTop - mishiH;

    // Player refs + state
    const posRef = useRef({ x: 140, y: groundY });
    const [pos, setPos] = useState(posRef.current);

    const velRef = useRef({ x: 0, y: 0 });
    const onGroundRef = useRef(true);
    const facingRef = useRef<"left" | "right">("right");

    // ✅ Animación como estado real (corrige walk->idle)
    const [animState, setAnimState] = useState<AnimName>("idle");
    const animRef = useRef<AnimName>("idle");

    const setAnimSafe = (next: AnimName) => {
        if (animRef.current !== next) {
            animRef.current = next;
            setAnimState(next);
        }
    };

    // Buttons rects
    const yesRectRef = useRef<Rect>({ x: 0, y: 0, w: btnW, h: btnH });
    const noRectRef = useRef<Rect>({ x: 0, y: 0, w: btnW, h: btnH });

    const [yesPressedState, setYesPressedState] = useState(false);
    const yesPressedRef = useRef(false);

    const [locked, setLocked] = useState(false);
    const lockedRef = useRef(false);

    useEffect(() => {
        yesPressedRef.current = yesPressedState;
    }, [yesPressedState]);

    useEffect(() => {
        lockedRef.current = locked;
    }, [locked]);

    // Init positions when size changes
    useEffect(() => {
        const padding = 40;

        // ✅ BOTONES ENCIMA DEL SUELO (no enterrados)
        const btnY = floorTop - btnH + 2;

        const yesX = clamp(
            Math.floor(size.w * 0.25) - Math.floor(btnW / 2),
            padding,
            size.w - btnW - padding
        );

        const noX = clamp(
            Math.floor(size.w * 0.75) - Math.floor(btnW / 2),
            padding,
            size.w - btnW - padding
        );

        yesRectRef.current = { x: yesX, y: btnY, w: btnW, h: btnH };
        noRectRef.current = { x: noX, y: btnY, w: btnW, h: btnH };

        // ✅ Spawn inteligente: centrado y asegurando que NO nazca encima de botones
        const spawnPadding = 40;

        let spawnX = clamp(
            Math.round(size.w * 0.5 - mishiW / 2),
            spawnPadding,
            size.w - mishiW - spawnPadding
        );

        const spawnRect1: Rect = { x: spawnX, y: groundY, w: mishiW, h: mishiH };

        // Si por alguna razón cae sobre YES, lo movemos a la derecha
        if (intersects(spawnRect1, yesRectRef.current)) {
            spawnX = clamp(
                Math.round(yesRectRef.current.x + yesRectRef.current.w + 140),
                spawnPadding,
                size.w - mishiW - spawnPadding
            );
        }

        const spawnRect2: Rect = { x: spawnX, y: groundY, w: mishiW, h: mishiH };

        // Si cae sobre NO, lo movemos a la izquierda
        if (intersects(spawnRect2, noRectRef.current)) {
            spawnX = clamp(
                Math.round(noRectRef.current.x - mishiW - 140),
                spawnPadding,
                size.w - mishiW - spawnPadding
            );
        }

        posRef.current = { x: spawnX, y: groundY };

        velRef.current = { x: 0, y: 0 };
        onGroundRef.current = true;
        setAnimSafe("idle");

        setPos(posRef.current);
    }, [size.w, size.h, floorTop, btnW, btnH, mishiW, groundY]);


    // NO button teleport logic
    const noCooldownRef = useRef(0);

    const teleportNo = (reason: "near" | "overlap") => {
        const now = performance.now();
        if (now < noCooldownRef.current) return;
        noCooldownRef.current = now + (reason === "overlap" ? 0 : 140);

        const padding = 40;
        const minX = padding;
        const maxX = size.w - btnW - padding;

        const player = { x: posRef.current.x, y: posRef.current.y, w: mishiW, h: mishiH };
        const yes = yesRectRef.current;

        for (let i = 0; i < 12; i += 1) {
            const x = Math.floor(minX + Math.random() * (maxX - minX));
            const candidate: Rect = { x, y: noRectRef.current.y, w: btnW, h: btnH };

            const farFromPlayer =
                Math.abs(candidate.x + candidate.w / 2 - (player.x + player.w / 2)) > 240;
            const farFromYes =
                Math.abs(candidate.x + candidate.w / 2 - (yes.x + yes.w / 2)) > 260;

            if (farFromPlayer && farFromYes) {
                noRectRef.current = candidate;
                return;
            }
        }

        noRectRef.current = { x: maxX, y: noRectRef.current.y, w: btnW, h: btnH };
    };

    // MAIN LOOP
    useEffect(() => {
        let raf = 0;
        let last = 0;

        const gravity = 2800;
        const speed = 520;
        const jumpV = 1050;

        const tick = (t: number) => {
            if (!last) last = t;
            const dt = Math.min(0.033, (t - last) / 1000);
            last = t;

            if (!lockedRef.current) {
                const k = keysRef.current;
                const dir = (k.right ? 1 : 0) - (k.left ? 1 : 0);

                velRef.current.x = dir * speed;
                if (dir !== 0) facingRef.current = dir < 0 ? "left" : "right";

                if (k.jump && onGroundRef.current) {
                    velRef.current.y = -jumpV;
                    onGroundRef.current = false;
                }

                velRef.current.y += gravity * dt;

                const nx = clamp(posRef.current.x + velRef.current.x * dt, 0, size.w - mishiW);
                let ny = posRef.current.y + velRef.current.y * dt;

                if (ny >= groundY) {
                    ny = groundY;
                    velRef.current.y = 0;
                    onGroundRef.current = true;
                }

                posRef.current = { x: nx, y: ny };
                setPos(posRef.current);

                // ✅ ANIM STATE ESTABLE
                if (!onGroundRef.current) setAnimSafe("jump");
                else if (dir !== 0) setAnimSafe("walk");
                else setAnimSafe("idle");
            } else {
                // si está locked, asegúrate de no quedar “walk”
                setAnimSafe("idle");
                velRef.current.x = 0;
            }

            // Collisions
            const playerRect: Rect = { x: posRef.current.x, y: posRef.current.y, w: mishiW, h: mishiH };
            const yes = yesRectRef.current;
            const no = noRectRef.current;

            const playerCenter = playerRect.x + playerRect.w / 2;
            const noCenter = no.x + no.w / 2;

            if (Math.abs(playerCenter - noCenter) < 280) teleportNo("near");
            if (intersects(playerRect, no)) teleportNo("overlap");

            const isStandingOnFloor = Math.abs(posRef.current.y - groundY) <= 2;

            if (!yesPressedRef.current && isStandingOnFloor && intersects(playerRect, yes)) {
                yesPressedRef.current = true;
                setYesPressedState(true);
                lockedRef.current = true;
                setLocked(true);

                window.setTimeout(() => {
                    fadeTo(
                        toLoading({
                            next: winPath,
                            ms: 2200,
                        })
                    );
                }, 350);
            }

            raf = window.requestAnimationFrame(tick);
        };

        raf = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(raf);
    }, [fadeTo, groundY, mishiW, mishiH, size.w, btnW, btnH, winPath]);

    // ✅ FPS más lento (aquí se controla lo que preguntaste)
    const animCfg = useMemo(() => {
        if (animState === "walk") return { src: mishiWalk, frames: 4, fps: 6, loop: true };
        if (animState === "jump") return { src: mishiJump, frames: 6, fps: 8, loop: false };
        return { src: mishiIdle, frames: 4, fps: 3, loop: true };
    }, [animState]);

    return (
        <div ref={rootRef} className="absolute inset-0" style={{ backgroundColor: bg }}>
            {/* HEADER */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 text-center w-[92%] max-w-[1200px] z-50">
                <div className="font-dogica-pixel text-[42px] text-[#111]">Will you be my Valentine?</div>

                <div className="mt-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full" style={{ backgroundColor: "#b0305c" }} />
                        <div className="font-dogica-pixel text-[18px] text-[#111]">Yes</div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full" style={{ backgroundColor: "#5b6ee1" }} />
                        <div className="font-dogica-pixel text-[18px] text-[#111]">No</div>
                    </div>
                </div>
            </div>

            {/* FLOOR */}
            <div className="absolute left-0 right-0 bottom-0 z-10" style={{ height: floorH, backgroundColor: floorColor }} />

            {/* BUTTONS */}
            <img
                src={yesPressedState ? yesPressed : yesNormal}
                draggable={false}
                alt="Yes"
                className="absolute select-none z-20"
                style={{
                    left: yesRectRef.current.x,
                    top: yesRectRef.current.y,
                    width: btnW,
                    height: btnH,
                    imageRendering: "pixelated",
                    transform: yesPressedState ? "translateY(2px)" : "translateY(0px)",
                    transition: "transform 120ms",
                }}
            />

            <img
                src={noNormal}
                draggable={false}
                alt="No"
                className="absolute select-none z-20"
                style={{
                    left: noRectRef.current.x,
                    top: noRectRef.current.y,
                    width: btnW,
                    height: btnH,
                    imageRendering: "pixelated",
                }}
            />

            {/* TUTORIAL */}
            {showTutorial && (
                <div className="absolute left-1/2 -translate-x-1/2 z-40" style={{ top: floorTop - 110 }}>
                    <div className="rounded-[14px] bg-black/30 px-5 py-3 backdrop-blur-sm">
                        <div className="flex items-center gap-3 font-dogica-pixel text-[14px] text-white">
                            <span className="rounded bg-white/15 px-3 py-1">A</span>
                            <span>left</span>
                            <span className="mx-2 opacity-60">•</span>
                            <span className="rounded bg-white/15 px-3 py-1">D</span>
                            <span>right</span>
                            <span className="mx-2 opacity-60">•</span>
                            <span className="rounded bg-white/15 px-3 py-1">Space</span>
                            <span>jump</span>
                        </div>
                    </div>
                </div>
            )}

            {/* MISHI */}
            <div className="absolute z-30" style={{ left: pos.x, top: pos.y }}>
                <AnimatedSpriteSheet
                    src={animCfg.src}
                    frameWidth={24}
                    frameHeight={24}
                    frames={animCfg.frames}
                    fps={animCfg.fps}
                    loop={animCfg.loop}
                    scale={mishiScale}
                    flipX={facingRef.current === "left"}
                />
            </div>
        </div>
    );
}
