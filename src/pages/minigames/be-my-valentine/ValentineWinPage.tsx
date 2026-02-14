// /src/pages/minigames/be-my-valentine/ValentineWinPage.tsx
import { useTransition } from "../../../components/transition/TransitionProvider";
import PixelButton from "../../../components/ui/PixelButton";

export default function ValentineWinPage() {
    const { fadeTo } = useTransition();

    return (
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#ffd1ce" }}>
            <div className="text-center">
                <div className="font-dogica-pixel text-[42px] text-[#111]">I knew it.</div>

                <div className="mt-10 flex justify-center">
                    <PixelButton size="small" label="Back to menu" onClick={() => fadeTo("/loading?next=/menu&ms=2000")} />
                </div>
            </div>
        </div>
    );
}
