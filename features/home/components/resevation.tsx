'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Schema de validation avec Zod
const reservationSchema = z.object({
  service: z.string().min(1, "Sélectionnez un service"),
  date: z.string().min(1, "Sélectionnez une date"),
  fullName: z.string().min(1, "Le nom complet est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Numéro de téléphone invalide"),
  message: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const Reservation = () => {
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      service: "",
      date: "",
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: ReservationFormValues) => {
    console.log("Formulaire envoyé :", values);
    toast.success("Réservation enregistrée ✅", { description: "Vous recevrez la confirmation par email et SMS." });
    form.reset();
  };

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 mt-15">
      {/* Titre */}
      <h1 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] font-bold mb-2 text-center">
        Réserver un créneau
      </h1>
      <p className="text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] xl:text-[1.3rem] text-center text-gray-600 mb-8">
        Réservez en 2 minutes — confirmation instantanée.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Select Service */}
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service souhaité</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="">Sélectionner un service</option>
                        <option value="retrait">Retrait d'argent</option>
                        <option value="depot">Dépôt d'argent</option>
                        <option value="transfert">Transfert d'argent</option>
                        <option value="western">Western Union</option>
                        <option value="autre">Autre service</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Infos perso */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                    <FormLabel>Message (optionnel)</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        rows={3}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Ajouter une note si nécessaire..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bouton */}
              <Button
                type="submit"
                className="w-full bg-primary-75 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition"
              >
                Confirmer ma réservation
              </Button>

              <p className="text-xs text-center text-gray-500">
                En confirmant, vous acceptez nos conditions de réservation.
              </p>
            </form>
          </Form>
        </div>

        {/* Card d'information */}
        <div className="bg-gray-50 border rounded-xl p-6 flex flex-col justify-center space-y-4">
          <h2 className="text-xl font-semibold mb-2">Comment ça marche ?</h2>
          <p>✅ <strong>Confirmation immédiate :</strong> vous recevrez un SMS et un email après validation.</p>
          <p>🔁 <strong>Annulation gratuite :</strong> jusqu’à 2h avant l’heure de votre rendez-vous.</p>
          <p>⏱️ <strong>Pas d’attente :</strong> votre créneau est réservé, vous êtes prioritaire.</p>
          <p>🔒 <strong>Confidentialité :</strong> vos données sont protégées.</p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
