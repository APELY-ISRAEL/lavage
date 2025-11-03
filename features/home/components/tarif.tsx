"use client";
import { useTranslation } from "react-i18next";
import { FaRocket, FaUsers, FaLightbulb, FaGlobe } from "react-icons/fa";

const Tarif = () => {
  const { t } = useTranslation();
  return (
    <section className=" mt-30 md:px-0 px-4">
      <div className="text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anektelugu-semibold text-primary-200 mb-3">
          Nos Formules
        </h2>

        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-anektelugu-semibold text-primary-200">
          Une expérience de lavage automobile incomparable
        </h3>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mx-auto lg:max-w-7xl">

        {/* Card 1 */}
        <div className="flex flex-col bg-white rounded-xl shadow-lg border border-muted p-10 md:p-12 lg:p-16">
          <h2 className="font-anektelugu-bold text-xl sm:text-2xl mb-4">
            Basic
          </h2>
          <p className="font-anektelugu-regular text-sm sm:text-base mb-6">
            Idéal pour un lavage rapide et économique
          </p>
          <div className="text-2xl font-anektelugu-bold mb-6">
            $25
            <span className="text-sm font-anektelugu-regular"> / voiture</span>
          </div>
          <ul className="flex flex-col gap-2 mb-6">
            <li>✔ Lavage extérieur complet</li>
            <li>✔ Nettoyage des vitres</li>
            <li>✔ Séchage rapide</li>
          </ul>
          <button className="mt-auto bg-primary-150 border-primary-75 text-white rounded-lg py-2 px-4 hover:bg-primary-250 transition">
            Choisir
          </button>
        </div>

        {/* Card 2 - Populaire */}
        <div className="flex flex-col bg-white rounded-xl shadow-2xl border-2 border-primary-250 p-10 md:p-12 lg:p-16 relative">
          {/* Badge “Populaire” */}
          <div className="absolute top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2 bg-primary-250 text-white text-xs sm:text-sm font-anektelugu-bold px-3 py-1 rounded-full shadow-lg">
            Populaire
          </div>

          <h2 className="font-anektelugu-bold text-xl sm:text-2xl mb-4">
            Standard
          </h2>
          <p className="font-anektelugu-regular text-sm sm:text-base mb-6">
            Pour un lavage complet avec intérieur et extérieur
          </p>
          <div className="text-2xl font-anektelugu-bold mb-6">
            $45
            <span className="text-sm font-anektelugu-regular"> / voiture</span>
          </div>
          <ul className="flex flex-col gap-2 mb-6">
            <li>✔ Lavage extérieur complet</li>
            <li>✔ Nettoyage intérieur</li>
            <li>✔ Aspirateur complet</li>
            <li>✔ Séchage à la main</li>
          </ul>
          <button className="mt-auto bg-primary-250 text-white rounded-lg py-2 px-4 hover:bg-primary-150 transition">
            Choisir
          </button>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col bg-white rounded-xl shadow-lg border border-muted p-10 md:p-12 lg:p-16">
          <h2 className="font-anektelugu-bold text-xl sm:text-2xl mb-4">
            Premium
          </h2>
          <p className="font-anektelugu-regular text-sm sm:text-base mb-6">
            Pour les voitures exigeantes, traitement complet premium
          </p>
          <div className="text-2xl font-anektelugu-bold mb-6">
            $70
            <span className="text-sm font-anektelugu-regular"> / voiture</span>
          </div>
          <ul className="flex flex-col gap-2 mb-6">
            <li>✔ Lavage extérieur complet</li>
            <li>✔ Nettoyage intérieur en profondeur</li>
            <li>✔ Cire protectrice</li>
            <li>✔ Séchage à la main et polissage</li>
          </ul>
          <button className="mt-auto bg-primary-150 border-primary-75 text-white rounded-lg py-2 px-4 hover:bg-primary-250 transition">
            Choisir
          </button>
        </div>



      </div>

    </section>
  );

};


export default Tarif;