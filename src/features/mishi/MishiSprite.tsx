import { useCallback, useMemo, useState } from "react";
import AnimatedSpriteSheet from "../../components/sprites/AnimatedSpriteSheet";
import { MISHI_ANIMS, MISHI_SPRITE, type MishiAnimName } from "./mishi.animations";

import mishiIdle from "../../assets/sprites/mishi/mishi_idle.png";
import mishiWalk from "../../assets/sprites/mishi/mishi_walk.png";
import mishiJump from "../../assets/sprites/mishi/mishi_jump.png";

type Props = {
    initialAnim?: MishiAnimName;
    scale?: number;
    className?: string;
};

export default function MishiSprite({ initialAnim = "idle", scale = 6, className }: Props) {
    const [anim, setAnim] = useState<MishiAnimName>(initialAnim);

    const src = useMemo(() => {
        if (anim === "walk") return mishiWalk;
        if (anim === "jump") return mishiJump;
        return mishiIdle;
    }, [anim]);

    const cfg = MISHI_ANIMS[anim];

    const playIdle = useCallback(() => setAnim("idle"), []);
    const playWalk = useCallback(() => setAnim("walk"), []);
    const playJump = useCallback(() => setAnim("jump"), []);

    return (
        <div className={className}>
            <AnimatedSpriteSheet
                src={src}
                frameWidth={MISHI_SPRITE.frameWidth}
                frameHeight={MISHI_SPRITE.frameHeight}
                frames={cfg.frames}
                fps={cfg.fps}
                loop={cfg.loop}
                onComplete={anim === "jump" ? playIdle : undefined} // al terminar jump vuelve a idle
                scale={scale}
            />

            {/* Controles opcionales para probar (quítalos en producción) */}
            <div className="mt-4 flex gap-2">
                <button type="button" onClick={playIdle}>idle</button>
                <button type="button" onClick={playWalk}>walk</button>
                <button type="button" onClick={playJump}>jump</button>
            </div>
        </div>
    );
}
