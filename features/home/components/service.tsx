"use client";
import { useTranslation } from "react-i18next";
import { FaRocket, FaUsers, FaLightbulb, FaGlobe } from "react-icons/fa";

const Services = () => {
    const { t } = useTranslation();
    return (
        <section className="conatiner md:px-0 px-4 mt-20">
            <div> <h2 className="text-[3.5rem] text-center h-[10%] font-anektelugu-semibold text-black mb-6">
                Nos Services & Tarifs
            </h2>
                <h3 className="text-[1.3rem] text-center font-anektelugu-semibold text-black/80 mb-6">
                   Des formules adaptées à tous vos besoins, avec des produits premium et un service professionnel
                   </h3>
            </div>

        </section>
    );

};


export default Services;