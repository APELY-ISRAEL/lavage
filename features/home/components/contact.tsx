"use client";
import { useTranslation } from "react-i18next";
import { FaRocket, FaUsers, FaLightbulb, FaGlobe } from "react-icons/fa";

const Contacter = () => {
    const { t } = useTranslation();
    return (
        <section className="conatiner md:px-0 px-4 mt-20">
            <div> <h2 className="text-[3.5rem] text-center h-[10%] font-anektelugu-semibold text-black mb-6">
                Contactez-nous
            </h2>
                <h3 className="text-[1.3rem] text-center font-anektelugu-semibold text-black/80 mb-6">
                Une question ? Besoin d'informations ? Notre équipe est à votre écoute
                   </h3>
            </div>

        </section>
    );

};


export default Contacter;