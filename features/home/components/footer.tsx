"use client";

import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";


const Footer = () => {
  const { t } = useTranslation();
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000); // message disparaît après 3s
  };

  return (
    <footer className="bg-primary-75 text-white">
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row justify-between gap-14">
        {/* Bloc Logo + description */}
        <div className="flex flex-col md:w-1/3 gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo/logo.png"
              alt="Logo AutoLuxe"
              width={60}
              height={60}
              className="object-contain"
            />
            <h1 className="text-3xl font-anektelugu-semibold text-white">
              AutoLuxe
            </h1>
          </Link>
          <p className="font-kantumruy-medium text-[1.1rem] text-gray-300 leading-relaxed">
            Votre partenaire de confiance pour un lavage automobile
            <br />
            professionnel, rapide et respectueux de l’environnement.
          </p>
        </div>

        {/* Bloc Liens & Newsletter */}
        <div className="flex flex-wrap md:flex-nowrap justify-between w-full md:w-2/3 gap-10 font-kantumruy">
          {/* Navigation */}
          <div className="w-1/3 min-w-[160px]">
            <h3 className="text-2xl font-anektelugu-semibold text-white mb-8 mt-4">
              Navigation
            </h3>
            <ul className="space-y-4 text-[0.95rem] text-gray-300">
              <li><Link href="/terms" className="hover:text-primary-200 transition">Accueil</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-200 transition">Service</Link></li>
              <li><Link href="#" className="hover:text-primary-200 transition">Reservation</Link></li>
              <li><Link href="#" className="hover:text-primary-200 transition">Contact</Link></li>
            </ul>
          </div>

          <div className="w-1/3 min-w-[160px]">
            <h3 className="text-2xl font-anektelugu-semibold text-white mb-8 mt-4">
              Contactez-nous
            </h3>
            <div className="space-y-4 text-[0.95rem] text-gray-300">
              {/* Adresse */}
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-white" />
                Adidogome, Lomé
              </p>

              {/* Téléphones */}
              <p className="flex flex-col gap-1">
                <span className="flex items-center gap-2">
                  <FaPhoneAlt className="text-white" /> (+228) 99 00 00 00
                </span>
                <span className="flex items-center gap-2">
                  <FaPhoneAlt className="text-white" /> (+228) 93 00 00 00
                </span>
              </p>

              {/* Email */}
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-white" />
                <a href="mailto:info@lavage.com" className="hover:text-primary-300 transition">
                  info@lavage.com
                </a>
              </p>
            </div>

            <div className="mt-6 flex gap-5">
              <Link href="#" aria-label="Facebook"><FaFacebook className="h-5 w-5 text-white hover:text-primary-150 transition" /></Link>
              <Link href="#" aria-label="Instagram"><FaInstagram className="h-5 w-5 text-white hover:text-primary-150 transition" /></Link>
              <Link href="#" aria-label="X / Twitter"><FaXTwitter className="h-5 w-5 text-white hover:text-primary-150 transition" /></Link>
              <Link href="#" aria-label="LinkedIn"><FaLinkedin className="h-5 w-5 text-white hover:text-primary-150 transition" /></Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-1/3 min-w-[200px]">
            <h3 className="text-2xl font-anektelugu-semibold text-white mb-8 mt-4">
              Newsletter
            </h3>
            <p className="text-[0.95rem] text-gray-300 mb-4 leading-relaxed">
              Recevez nos offres exclusives et conseils d'entretien automobile directement dans votre boîte mail.
            </p>

            {/* Formulaire Newsletter */}

            {/* Formulaire Newsletter */}
           {/* Formulaire Newsletter */}
 <div className="relative">
    <input
      type="email"
      placeholder="Votre email"
      className="w-full py-3 pl-4 pr-32 text-white/80 placeholder-white/80 bg-transparent border-2 border-white rounded-lg focus:outline-none"
      required
    />
    <button
      type="submit"
      className="absolute top-1/2 right-1 -translate-y-1/2 bg-white text-primary-200 font-semibold px-4 py-2 rounded-md hover:bg-primary-300 hover:text-white transition-all"
    >
      S'inscrire
    </button>
  </div>



            {/* Message de confirmation */}
            {subscribed && (
              <p className="text-green-400 text-sm mt-3 transition-opacity">
                ✅ Merci pour votre inscription !
              </p>
            )}


          </div>
        </div>
      </div>

      {/* Ligne du bas */}
      <div className="bg-primary-900 py-5">
        <p className="text-center text-[0.9rem] text-gray-200 font-poppins">
          © {new Date().getFullYear()} <span className="text-primary-100">AutoLuxe</span> — Propulsé par{"israel_dev"}
          <Link href="https://blkempire.fr/" className="hover:underline text-primary-200 font-semibold">
            BLK Empire
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
