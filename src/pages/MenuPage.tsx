import bgMenu from "../assets/images/bg_menu.png";
import uiPanel from "../assets/ui/ui_panel.png";
import PixelButton from "../components/ui/PixelButton";

export default function MenuPage() {
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
                        <div className="mb-8 font-dogica-pixel text-[28px] text-[#ffe6ef] drop-shadow-[0_3px_0_rgba(0,0,0,0.35)]">
                            Menu
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <PixelButton size="medium" label="Be my Valentine" />
                            <PixelButton size="medium" label="Minigame" />
                            <PixelButton size="medium" label="Credits" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
