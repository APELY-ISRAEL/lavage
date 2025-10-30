"use client";
import BaseButton from "@/components/BaseButton";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
    const { t } = useTranslation();
    return (
        <section className="h-[55rem] md:h-[45vh] lg:h-[90vh] flex rounded-b-[2rem] bg-white w-full overflow-hidden">
            <div className="container mx-auto flex items-center justify-between">
                {/* Contenu texte à gauche */}
                <div className="md:w-1/2 w-full px-4 md:px-8  flex flex-col gap-2">

                    <div className="mb-8 bg-primary-150 rounded-lg p-2 font-anektelugu-regular max-w-md w-[15rem] text-center">
                        <span className="font-anektelugu-medium capitalize text-primary-75 text-[1.4rem] md:text-[1.4rem] lg:text-[1.2rem]">
                            {t("hero.title")}
                        </span>
                    </div>


                    <span className="mb-3 font-anektelugu-medium capitalize text-[1.5rem] md:text-[2rem] lg:text-[3rem] md:leading-8 text-black lg:leading-12">
                        {t("hero.subtitle")} {t("hero.subtitle2")}

                    </span>

                    <span className="mb-6 font-anektelugu-medium capitalize text-[1.5rem] md:text-[2rem] lg:text-[3rem] md:leading-8 text-primary-75 lg:leading-12">
                        {t("hero.subtitle3")}
                    </span>

                    <Image src="/images/home/hero.svg" alt="Formation en immobilier à l'international" width={100} height={100} className="w-fit h-fit md:hidden block " />

                    <p className="font-anektelugu-regular text-[1.2rem] md:text-[1.2rem] lg:text-[1.2rem] text-black/70">
                        {t("hero.description")} <br className="lg:block hidden" /> {t("hero.description2")}
                    </p>

                    <div className="flex flex-col md:flex-row items-start gap-6 lg:mt-6 mt-3 max-w-[720px]">
                        <BaseButton className="border border-white bg-primary-75 text-white px-10 py-6 rounded-md w-[w-2/5] font-kantumruy-medium hover:bg-primary-50 transition-all duration-300 whitespace-nowrap">
                            {t("hero.signup")}
                        </BaseButton>

                          <BaseButton className="border border-white bg-white text-dark px-10 py-6 rounded-md w-[w-2/5] border-black font-kantumruy-medium hover:bg-primary-75 hover:text-white transition-all duration-300 whitespace-nowrap">
                            {t("hero.service")}
                        </BaseButton>

                    </div>
                </div>

                {/* Image à droite */}
                <div className="w-1/2 h-full relative lg:pt-6 pt-8 md:flex hidden items-center justify-center">
                    <Image
                        src="/images/home/hero.svg"
                        alt="Formation en immobilier à l'international"
                        width={800}
                        height={700}
                        className="h-full w-fit lg:object-cover object-contain "
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;