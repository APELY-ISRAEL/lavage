"use client";
import { useTranslation } from "react-i18next";
import { FaRocket, FaUsers, FaLightbulb, FaGlobe } from "react-icons/fa";

const Missions = () => {
    const { t } = useTranslation();
    return (
        <section className="md:px-0 px-4 mt-10">
            <div className="text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anektelugu-semibold text-primary-200 mb-3">
                    Pourquoi nous choisir
                </h2>

                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-anektelugu-semibold text-primary-200">
                    Une expérience de lavage automobile incomparable
                </h3>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mx-auto lg:max-w-7xl">

                {/* Card 1 */}
                <div className="items-start gap-4 bg-white rounded-xl p-10 md:p-16 lg:p-17 shadow-lg border-t border-white/5">
                    <div className="flex bg-primary-150 border-2 border-primary-150 rounded-xl p-3 w-[4rem]">
                        <FaRocket className="text-primary-250 text-3xl" />
                    </div>
                    <div className="flex flex-col justify-start mt-5">
                        <h2 className="font-anektelugu-medium text-sm sm:text-[1.5rem]">
                            Qualité Prenuim
                        </h2>
                        <h3 className="font-anektelugu-regular text-sm sm:text-[1rem]">
                            Produits professionnels de haute qualité
                        </h3>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="items-start gap-4 bg-white rounded-xl p-10 md:p-16 lg:p-17 shadow-lg border-t border-white/5">
                    <div className="flex bg-primary-150 border-2 border-primary-150 rounded-xl p-3 w-[4rem]">
                        <FaUsers className="text-primary-250 text-3xl" />
                    </div>
                    <div className="flex flex-col justify-start mt-5">
                        <h2 className="font-anektelugu-medium text-sm sm:text-[1.5rem]">
                            Ecologique
                        </h2>
                        <h3 className="font-anektelugu-regular text-sm sm:text-[1rem]">
                            Respect de l'environement garanti
                        </h3>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="items-start gap-4 bg-white rounded-xl p-10 md:p-16 lg:p-17 shadow-lg border-t border-white/5">
                    <div className="flex bg-primary-150 border-2 border-primary-150 rounded-xl p-3 w-[4rem]">
                        <FaLightbulb className="text-primary-250 text-3xl" />
                    </div>
                    <div className="flex flex-col justify-start mt-5">
                        <h2 className="font-anektelugu-medium text-sm sm:text-[1.5rem]">
                            Protection
                        </h2>
                        <h3 className="font-anektelugu-regular text-sm sm:text-[1rem]">
                            Traitement protecteur inclus
                        </h3>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="items-start gap-4 bg-white rounded-xl p-10 md:p-16 lg:p-17 shadow-lg border-t border-white/5">
                    <div className="flex bg-primary-150 border-2 border-primary-150 rounded-xl p-3 w-[4rem]">
                        <FaGlobe className="text-primary-250 text-3xl" />
                    </div>
                    <div className="flex flex-col justify-start mt-5">
                        <h2 className="font-anektelugu-medium text-sm sm:text-[1.5rem]">
                            Service Rapide
                        </h2>
                        <h3 className="font-anektelugu-regular text-sm sm:text-[1rem]">
                            Effcetué sans compromis
                        </h3>
                    </div>
                </div>

            </div>

        </section>
    );

};


export default Missions;