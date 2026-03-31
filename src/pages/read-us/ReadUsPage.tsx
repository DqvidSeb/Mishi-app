import { useMemo, useState } from "react";

import PixelButton from "../../components/ui/PixelButton";
import { useTransition } from "../../components/transition/TransitionProvider";
import { PATHS } from "../../routes/paths";
import MiniLetterCard from "./MiniLetterCard";
import { readUsLetters } from "./readUsLetters";

export default function ReadUsPage() {
    const { fadeTo } = useTransition();
    const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);

    const selectedLetter = useMemo(
        () => readUsLetters.find((letter) => letter.id === selectedLetterId) ?? null,
        [selectedLetterId]
    );

    const onBack = () => {
        if (selectedLetter) {
            setSelectedLetterId(null);
            return;
        }

        fadeTo(PATHS.menu);
    };

    return (
        <div
            className="absolute inset-0 overflow-hidden"
            style={{ backgroundColor: "#fff6f2" }}
        >
            <div className="absolute top-8 left-8 z-20">
                <PixelButton size="small" label="Back" onClick={onBack} />
            </div>

            <div className="absolute inset-0 px-8 pt-32 pb-16">
                {selectedLetter ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="relative w-full max-w-[860px] h-full max-h-[620px]">
                            <div className="absolute inset-0 -z-10 bg-black/20 blur-2xl scale-105" />

                            <div className="flex h-full min-h-0 flex-col rounded-2xl">
                                <div className="mb-5 text-center">
                                    <div className="font-dogica-pixel text-[20px] text-[#111]">
                                        {`A letter from ${selectedLetter.author}`}
                                    </div>
                                </div>

                                <textarea
                                    readOnly
                                    value={selectedLetter.content}
                                    className="min-h-0 flex-1 w-full resize-none rounded-2xl border-4 border-[#111] bg-white/90 p-8 font-dogica-pixel text-[15px] leading-relaxed text-[#111] shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#b0305c]/50 overflow-y-auto scrollbar-custom"
                                    style={{
                                        backdropFilter: "blur(10px)",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <div className="h-full w-full max-w-[1080px] max-h-[620px] overflow-y-auto px-2 py-6 scrollbar-custom">
                            {readUsLetters.length > 0 ? (
                                <div
                                    className="grid justify-center gap-x-8 gap-y-10"
                                    style={{
                                        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 170px))",
                                    }}
                                >
                                    {readUsLetters.map((letter, index) => (
                                        <MiniLetterCard
                                            key={letter.id}
                                            author={letter.author}
                                            index={index}
                                            onOpen={() => setSelectedLetterId(letter.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex min-h-[320px] items-center justify-center">
                                    <div className="max-w-[720px] text-center font-dogica-pixel text-[15px] leading-relaxed text-[#111]">
                                        Add `.letter.txt` files in `src/content/read-us` to populate the cards.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .scrollbar-custom::-webkit-scrollbar {
                    width: 12px;
                    height: 12px;
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
