// /src/pages/valentine/ValentinePage.tsx
import PixelButton from "../../components/ui/PixelButton";
import ClickableLetter from "../../components/valentine/ClickableLetter";
import { useTransition } from "../../components/transition/TransitionProvider";

export default function ValentinePage() {
    const { fadeTo } = useTransition();

    return (
        <div className="absolute inset-0" style={{ backgroundColor: "#ffd1ce" }}>
            {/* Back button */}
            <div className="absolute top-8 left-8">
                <PixelButton size="small" label="Back" onClick={() => fadeTo("/menu")} />
            </div>

            {/* Title */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center">
                <div className="font-dogica-pixel text-[26px] text-black">
                    Click to open...
                </div>
            </div>

            {/* Letter */}
            <div className="absolute inset-0 flex items-center justify-center pt-24">
                <ClickableLetter />
            </div>
        </div>
    );
}
