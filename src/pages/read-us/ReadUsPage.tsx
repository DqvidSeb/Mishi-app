import PixelButton from "../../components/ui/PixelButton";
import { useTransition } from "../../components/transition/TransitionProvider";
import { PATHS } from "../../routes/paths";

export default function ReadUsPage() {
    const { fadeTo } = useTransition();

    return (
        <div
            className="absolute inset-0 overflow-hidden"
            style={{ backgroundColor: "#fff6f2" }}
        >
            <div className="absolute top-8 left-8 z-20">
                <PixelButton size="small" label="Back" onClick={() => fadeTo(PATHS.menu)} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center px-8 pt-32 pb-16">
                <div className="relative w-full max-w-[980px]">
                    <div className="absolute inset-0 -z-10 rounded-[32px] bg-[#f7d7dd]/55 blur-3xl scale-105" />

                    <div
                        className="min-h-[520px] rounded-[28px] border-4 border-[#111] bg-white/78 px-10 py-16 shadow-2xl"
                        style={{ backdropFilter: "blur(10px)" }}
                    >
                        <div className="flex h-full min-h-[392px] items-center justify-center">
                            <h1 className="font-dogica-pixel text-[28px] text-[#111]">Read us</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
