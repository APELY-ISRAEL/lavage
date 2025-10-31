"use client";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { FaRocket } from "react-icons/fa";

const Transforme = () => {
  const { t } = useTranslation();

  return (
    <section className="md:px-0 px-4 mt-20 mb-15">
      {/* Titre principal de la section */}
      <div className="text-center mb-14">
        <h2 className="text-[3.5rem] font-anektelugu-semibold text-primary-200 mb-4">
          Transformez votre véhicule
        </h2>
        <h3 className="text-[1.3rem] text-black/60 font-anektelugu-semibold">
          Réservez dès maintenant et découvrez l'excellence du lavage automobile
        </h3>
      </div>

      {/* Contenu principal : image à gauche, texte à droite */}
      <div className="lg:max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src="/images/cars2.jpeg"
            alt="Lavage automobile professionnel"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Texte */}
        <div className="w-full md:w-1/2">
          <h4 className="text-[2rem] font-anektelugu-semibold text-primary-200 mb-4">
            Offrez à votre voiture une seconde jeunesse
          </h4>
          <p className="text-black/80 text-[1.1rem] leading-relaxed mb-6">
            Grâce à nos techniques de lavage avancées et à une équipe de passionnés,
            nous redonnons à chaque véhicule son éclat d'origine.
            Profitez d'un service rapide, soigné et respectueux de l'environnement.
          </p>

          <button className="bg-primary-200 hover:bg-primary-300 text-white font-semibold px-8 py-3 rounded-md transition-all flex items-center gap-2">
            <FaRocket /> Réservez maintenant
          </button>
        </div>
      </div>
    </section>
  );
};

export default Transforme;
