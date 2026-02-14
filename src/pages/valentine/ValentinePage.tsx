// /src/pages/valentine/ValentinePage.tsx
import PixelButton from "../../components/ui/PixelButton";
import ClickableLetter from "../../components/valentine/ClickableLetter";
import { useTransition } from "../../components/transition/TransitionProvider";
import { PATHS } from "../../routes/paths";
import { toLoading } from "../../routes/loading";

export default function ValentinePage() {
    const { fadeTo } = useTransition();

    const goMiniGame = () => {
        fadeTo(
            toLoading({
                next: PATHS.minigames.beMyValentine,
                ms: 2200,
            })
        );
    };

    return (
        <div className="absolute inset-0" style={{ backgroundColor: "#ffd1ce" }}>
            <div className="absolute top-8 left-8 z-20">
                <PixelButton size="small" label="Back" onClick={() => fadeTo(PATHS.menu)} />
            </div>

            <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
                <div className="font-dogica-pixel text-[26px] text-black">Click to open...</div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pt-24 z-0 pointer-events-none">
                <div className="pointer-events-auto">
                    <ClickableLetter onOpen={goMiniGame} />
                </div>
            </div>
        </div>
    );
}
