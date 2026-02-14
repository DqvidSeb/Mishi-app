// /src/pages/CreditsPage.tsx
import PixelButton from "../../components/ui/PixelButton";
import { useTransition } from "../../components/transition/TransitionProvider";
import { PATHS } from "../../routes/paths";

export default function CreditsPage() {
    const { fadeTo } = useTransition();

    return (
        <div className="absolute inset-0" style={{ backgroundColor: "#ffd1ce" }}>
            {/* Botón Back en la esquina superior izquierda */}
            <div className="absolute top-8 left-8 z-20">
                <PixelButton size="small" label="Back" onClick={() => fadeTo(PATHS.menu)} />
            </div>

            {/* Mensaje centrado */}
            <div className="absolute inset-0 flex items-center justify-center px-8">
                <div className="text-center max-w-[800px]">
                    {/* Sombra decorativa */}
                    <div className="absolute inset-0 -z-10 bg-black/20 blur-3xl" />

                    {/* Texto de créditos */}
                    <div className="font-dogica-pixel text-[24px] leading-relaxed text-[#111]">
                        No hay créditos para mi en esto, todo esto es para el amor de mi vida Mafe Guzmán 💗
                    </div>
                </div>
            </div>
        </div>
    );
}