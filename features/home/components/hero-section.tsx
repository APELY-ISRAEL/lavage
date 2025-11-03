"use client";
import BaseButton from "@/components/BaseButton";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
    const { t } = useTranslation();
    return (
        <section className="h-[55rem] md:h-[45vh] lg:h-[90vh] flex rounded-b-[2rem] bg-muted w-full overflow-hidden">
            <div className="container mx-auto flex flex-col md:flex-row md:items-center gap-6 mt-6 md:flex mt-25 sm:flex mt-25 ">

                {/* Contenu texte à gauche */}
                <div className="md:w-1/2 w-full px-4 md:px-8 flex flex-col gap-3">

                    {/* Badge */}
                    <div className="mb-6 bg-primary-150 rounded-lg p-2 font-anektelugu-regular max-w-[15rem] text-center">
                        <span className="font-anektelugu-medium capitalize text-primary-75 text-lg md:text-xl lg:text-lg">
                            {t("hero.title")}
                        </span>
                    </div>

                    {/* Titre ligne 1 */}
                    <span className="font-anektelugu-medium capitalize text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-black">
                        {t("hero.subtitle")} {t("hero.subtitle2")}
                    </span>

                    {/* Titre ligne 2 */}
                    <span className="font-anektelugu-medium capitalize text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-primary-75">
                        {t("hero.subtitle3")}
                    </span>

                    {/* Image mobile uniquement */}
                      <div className="w-1/2 h-full relative lg:pt-6 pt-8 md:flex hidden items-center justify-center">
                    <Image
                        src="/images/home/hero.svg"
                        alt="Formation en immobilier à l'international"
                        width={100}
                        height={100}
                        className="w-fit h-fit block md:hidden my-4"
                    />
                    </div>

                    {/* Description */}
                    <p className="font-anektelugu-regular text-base sm:text-lg md:text-xl text-black/70">
                        {t("hero.description")}
                        <br className="lg:block hidden" />
                        {t("hero.description2")}
                    </p>

                    {/* Boutons */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 lg:mt-6 mt-4 max-w-[720px]">
                        <BaseButton className="border border-white bg-primary-75 text-white px-8 py-4 rounded-md font-kantumruy-medium hover:bg-primary-50 transition-all duration-300 whitespace-nowrap w-full md:w-auto">
                            {t("hero.signup")}
                        </BaseButton>

                        <BaseButton className="border bg-white text-dark px-8 py-4 rounded-md border-black font-kantumruy-medium hover:bg-primary-75 hover:text-white transition-all duration-300 whitespace-nowrap w-full md:w-auto">
                            {t("hero.service")}
                        </BaseButton>
                    </div>


                </div>


                {/* Image à droite */}
                <div className="relative w-1/2 h-full lg:pt-6 pt-8 md:flex hidden mt-10">
                    <Image
                        src="/images/cars5.png"
                        alt="Voiture"
                        width={400}
                        height={400}
                        className="h-auto w-auto object-contain mask-left-gradient"
                        priority
                    />

                    {/* Dégradé blanc à gauche */}
                    <div className="absolute top-0 left-0 h-full w-1/3  from-white to-transparent"></div>
                </div>

            </div>
        </section >
    );
};

export default HeroSection;