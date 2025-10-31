import { FaEnvelope } from "react-icons/fa6";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contactez = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-anektelugu-semibold text-primary-900 mb-12 text-center">
          Contactez-nous
        </h2>

        {/* Cartes contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Adresse */}
          <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaMapMarkerAlt className="text-primary-200 text-2xl mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-primary-900 mb-1">Adresse</h4>
              <p className="text-gray-600">Bd de la Kara, Lomé</p>
            </div>
          </div>

          {/* Téléphones */}
          <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaPhoneAlt className="text-primary-200 text-2xl mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-primary-900 mb-1">Téléphone</h4>
              <p className="text-gray-600">(+228) 99 68 78 83</p>
              <p className="text-gray-600">(+228) 93 46 97 83</p>
              <p className="text-gray-600">(+228) 98 38 41 41</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaEnvelope className="text-primary-200 text-2xl mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-primary-900 mb-1">Email</h4>
              <p className="text-gray-600">
                <a href="mailto:info@amivipalaza.com" className="hover:text-primary-200 transition">
                  info@amivipalaza.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire + Carte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Formulaire */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-primary-900 mb-6">Envoyez-nous un message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nom complet"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200"
                required
              />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200"
                required
              />
              <textarea
                placeholder="Votre message"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200"
                rows={5}
                required
              />
              <button
                type="submit"
                className="bg-primary-200 hover:bg-primary-300 text-white font-semibold px-6 py-2 rounded-md transition-all"
              >
                Envoyer
              </button>
            </form>
          </div>

          {/* Carte / localisation */}
          <div className="rounded-lg overflow-hidden shadow-md">
            {/* Ici tu peux mettre une image statique de la localisation ou intégrer Google Maps */}
            <Image
              src="/images/map-placeholder.png" // Remplace par ta carte ou Google Maps embed
              alt="Localisation"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactez;
