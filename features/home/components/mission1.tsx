"use client";
import { useTranslation } from "react-i18next";
import { FaRocket, FaUsers, FaLightbulb, FaGlobe } from "react-icons/fa";

const Mission1 = () => {
    const { t } = useTranslation();
    return (
        <section className="md:px-0 px-4 mt-10">
            <div>
                <h2 className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.5rem] xl:text-[4rem] text-center font-anektelugu-semibold text-primary-200 mb-6">
                    Services Complémentaires
                </h2>

                <h3 className="text-[1.3rem] text-center h-[10%] font-anektelugu-semibold text-primary-200 mb-6">
                    Personnalisez votre expérience avec nos options supplémentaires</h3>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mx-auto lg:max-w-7xl">

                {/* Card 1 */}
                <div className="items-start gap-4 bg-white rounded-xl p-10 md:p-16 lg:p-17 shadow-lg border-t border-white/5">
                    <div className="flex flex-col justify-start mt-5">
                        <h2 className="font-anektelugu-bold text-sm sm:text-[1.5rem]">
                            Rénovation phares
                        </h2>
                        <h2 className="text-primary-200 font-anektelugu-semibold text-[1.5rem]">25€</h2>
                        <h3 className="font-anektelugu-regular text-balck/80  text-sm sm:text-[1rem]">
                            Redonnez de l'éclat à vos phares ternis
                        </h3>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="items-start gap-4 bg-white rounded-xl p-10 md:p-16 lg:p-17 shadow-lg border-t border-white/5">
                    <div className="flex flex-col justify-start mt-5">
                        <h2 className="font-anektelugu-bold text-sm sm:text-[1.5rem]">
                            Nettoyage moteur
                        </h2>
                        <h2 className="text-primary-200 font-anektelugu-semibold text-[1.5rem]">35€</h2>
                        <h3 className="font-anektelugu-regular text-sm sm:text-[1rem]">
                            Nettoyage à la vapeur pour un moteur impeccable
                        </h3>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="items-start gap-4 bg-white rounded-xl p-10 md:p-16 lg:p-17 shadow-lg border-t border-white/5">
                    <div className="flex flex-col justify-start mt-5">
                        <h2 className="font-anektelugu-bold text-sm sm:text-[1.5rem]">
                            Traitement céramique
                        </h2>
                        <h2 className="text-primary-200 font-anektelugu-semibold text-[1.5rem]">150€</h2>
                        <h3 className="font-anektelugu-regular text-sm sm:text-[1rem]">
                            Protection longue durée (6 mois) pour votre carrosserie
                        </h3>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="items-start gap-4 bg-white rounded-xl p-10 md:p-16 lg:p-17 shadow-lg border-t border-white/5">
                    <div className="flex flex-col justify-start mt-5">
                        <h2 className="font-anektelugu-bold text-sm sm:text-[1.5rem]">
                            Désinfection complète
                        </h2>
                        <h2 className="text-primary-200 font-anektelugu-semibold text-[1.5rem]">40€</h2>
                        <h3 className="font-anektelugu-regular text-sm sm:text-[1rem]">
                            Traitement antibactérien de tout l'habitacle
                        </h3>
                    </div>
                </div>

            </div>

        </section>
    );

};


export default Mission1;