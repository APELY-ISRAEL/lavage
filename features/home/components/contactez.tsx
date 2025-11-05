'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  message: z.string().min(1, "Le message est requis"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contactez = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message envoyé ✅", { description: "Nous vous répondrons bientôt !" });
        form.reset();
      } else {
        toast.error("Erreur", { description: data.message });
      }
    } catch (error) {
      toast.error("Erreur", { description: "Échec de l'envoi du message." });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">

        {/* Cartes contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaMapMarkerAlt className="text-primary-200 text-2xl mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-primary-900 mb-1">Adresse</h4>
              <p className="text-gray-600">Bd de la Kara, Lomé</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaPhoneAlt className="text-primary-200 text-2xl mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-primary-900 mb-1">Téléphone</h4>
              <p className="text-gray-600">(+228) 99 68 78 83</p>
              <p className="text-gray-600">(+228) 93 46 97 83</p>
              <p className="text-gray-600">(+228) 98 38 41 41</p>
            </div>
          </div>
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
            
            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nom complet"
                          {...field}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Votre email"
                          {...field}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Votre message"
                          rows={5}
                          {...field}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-primary-200 hover:bg-primary-300 text-white font-semibold px-6 py-2 rounded-md transition-all w-full"
                >
                  Envoyer
                </Button>
              </form>
            </Form>
          </div>

          {/* Carte / localisation */}
          <div className="rounded-lg overflow-hidden shadow-md w-full h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63466.018279061405!2d1.100358121679675!3d6.180767899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1021591da1554231%3A0xc486ff9ab403f7d!2sLa%20Poste%20Adidogom%C3%A9!5e0!3m2!1sfr!2stg!4v1762162123349!5m2!1sfr!2tg"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactez;
