// /src/pages/MenuPage.tsx
import bgMenu from "../assets/images/bg_menu.png";
import uiPanel from "../assets/ui/ui_panel.png";
import PixelButton from "../components/ui/PixelButton";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useTransition } from "../components/transition/TransitionProvider";
import { PATHS } from "../routes/paths";

export default function MenuPage() {
    const onExit = async () => {
        try {
            await getCurrentWindow().close();
        } catch (err) {
            console.error("Exit failed:", err);
        }
    };

    const { fadeTo } = useTransition();

    const goValentine = () => {
        fadeTo("/loading?next=/valentine&ms=3800");
    };

    const goReadMe = () => {
        fadeTo(PATHS.readMe);
    };

    const goCredits = () => {
        fadeTo(PATHS.credits);
    };

    return (
        <div className="absolute inset-0">
            <img src={bgMenu} className="h-full w-full object-cover select-none" draggable={false} />

            <div className="absolute left-28 top-1/2 -translate-y-1/2">
                <div className="relative">
                    <div className="absolute inset-0 -z-10 bg-black/40 blur-3xl scale-105" />

                    <img
                        src={uiPanel}
                        className="w-[480px] h-[640px] select-none"
                        style={{ imageRendering: "pixelated" }}
                        draggable={false}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center px-10">
                        <div className="mb-6 font-dogica-pixel text-[26px] text-[#ffe6ef] drop-shadow-[0_3px_0_rgba(0,0,0,0.35)]">
                            Menu
                        </div>

                        <div className="flex flex-col items-center gap-5">
                            <PixelButton size="small" label="Be my Valentine" onClick={goValentine} />
                            <PixelButton size="small" label="Read me" onClick={goReadMe} />
                            <PixelButton size="small" label="Credits" onClick={goCredits} />
                            <PixelButton size="small" label="Exit" onClick={onExit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}