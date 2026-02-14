// /src/pages/ReadMePage.tsx
import PixelButton from "../../components/ui/PixelButton";
import { useTransition } from "../../components/transition/TransitionProvider";
import { PATHS } from "../../routes/paths";

export default function ReadMePage() {
    const { fadeTo } = useTransition();

    const readMeText = `¡Bienvenida a Mishi App! 🎮💙

Esta es una aplicación a modo de minijuego especial, creada con mucho amor.
Cada pixel dibujado, cada botón, cada pequeño detalle, cada línea de código que hizo
posible esta app, está puesto con el corazón y con un sinfín de amor por ti.

Hace dos años me aventuré a hablarte, me aventuré a invitarte a salir, y se hizo realidad.
Era un niño bobo que ni pensaba que una chica tan hermosa, tan dulce, tan inteligente
y tan interesante como tú pudiera aceptarme una invitación a salir.

Cuando te escribí y me respondiste, me llené de felicidad y de emoción, junto con nervios de esos
que te hacen volverte imperativo durante un largo rato; y peor aún, los nervios cuando te invité a salir
y aceptaste, fueron los mejores días de mi vida.

Desde que llegaste a mi vida, todo tomó sentido y color; todo está rodeado de felices recuerdos,
de hermosos momentos, de risas, de aventuras, de complicidad, de amor, de cariño,de apoyo incondicional.
En serio que, tú sabes que yo no creo en nada, pero en serio, en serio, le agradezco a la vida, o no sé a quién,
por habernos puesto en el camino del otro.

Eres la persona más maravillosa que he conocido, y cada día me sorprendes más con tu belleza, tu inteligencia,
tu personalidad, tu forma de ser tan única y especial. Eres mi inspiración, mi motivación, mi alegría y,
sobre todo, el amor de mi vida ❤️

Mi amor, gracias por cada momento hasta ahora, por cada sonrisa que me sacas. Gracias por guardar tus chistes malos
solo para mí.

Este es un pequeño detalle para ti, un pequeño juego que hice con mucho amor. Espero que te guste y que
te diviertas jugando; aunque lo importante no es el juego, sino el mensaje que quiero transmitirte con él.
Te amo con todo mi corazón y siempre estaré aquí para ti, apoyándote, cuidándote y amándote cada día más.

Pdta.: Actualizaré el juego 🎮 cada vez más con cositas que quieras ✨

— Con amor: David 💙`;

    return (
        <div className="absolute inset-0" style={{ backgroundColor: "#ffd1ce" }}>
            {/* Botón Back en la esquina superior izquierda */}
            <div className="absolute top-8 left-8 z-20">
                <PixelButton size="small" label="Back" onClick={() => fadeTo(PATHS.menu)} />
            </div>

            {/* Contenedor central con el textarea */}
            <div className="absolute inset-0 flex items-center justify-center px-8 pt-32 pb-16">
                <div className="relative w-full max-w-[800px] h-full max-h-[600px]">
                    {/* Sombra decorativa */}
                    <div className="absolute inset-0 -z-10 bg-black/20 blur-2xl scale-105" />

                    {/* Textarea scrolleable (no editable) */}
                    <textarea
                        readOnly
                        value={readMeText}
                        className="w-full h-full resize-none bg-white/90 rounded-2xl p-8 
                                   font-dogica-pixel text-[16px] text-[#111] leading-relaxed
                                   shadow-2xl border-4 border-[#111] 
                                   focus:outline-none focus:ring-4 focus:ring-[#b0305c]/50
                                   overflow-y-auto scrollbar-custom"
                        style={{
                            backdropFilter: "blur(10px)",
                        }}
                    />
                </div>
            </div>

            {/* Estilos personalizados para el scrollbar */}
            <style>{`
                .scrollbar-custom::-webkit-scrollbar {
                    width: 12px;
                }

                .scrollbar-custom::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }

                .scrollbar-custom::-webkit-scrollbar-thumb {
                    background: #b0305c;
                    border-radius: 10px;
                    border: 2px solid #f1f1f1;
                }

                .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                    background: #8a2447;
                }
            `}</style>
        </div>
    );
}