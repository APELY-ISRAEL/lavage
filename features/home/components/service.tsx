"use client";
import { useTranslation } from "react-i18next";
import { FaRocket, FaUsers, FaLightbulb, FaGlobe } from "react-icons/fa";

const Services = () => {
    const { t } = useTranslation();
    return (
        <section className="container mx-auto px-4 sm:px-6 md:px-8 mt-12 md:mt-16 lg:mt-20">
            <div>
                <h2 className="text-center text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] font-anektelugu-semibold text-black mt-20">
                    Nos Services & Tarifs
                </h2>

                <h3 className="text-[0.95rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] xl:text-[1.3rem] text-center font-anektelugu-semibold text-black/80 leading-relaxed">
                    Des formules adaptées à tous vos besoins, avec des produits premium et un service professionnel
                </h3>
            </div>
        </section>

    );

};


export default Services;