'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

// -----------------------------
// Schema Zod
// -----------------------------
const subscriptionSchema = z.object({
  type: z.enum(["standard", "silver", "gold", "premium"])
    .refine(val => val !== undefined, { message: "Veuillez choisir un type d'abonnement" }),
  prix: z.string().min(1, "Le prix est requis"),
  dispo: z.boolean(),
  description: z.string().optional(),
  duree: z.enum(["mensuel", "annuel"]),
  avantages: z.array(z.object({
    value: z.string().min(1, "L'avantage ne peut pas être vide")
  })).min(1, "Ajoutez au moins un avantage"),
});

type SubscriptionForm = z.infer<typeof subscriptionSchema>;

// -----------------------------
// Composant
// -----------------------------
export default function CreateSubscriptionPage() {

  const form = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      type: "standard",
      prix: '',
      dispo: true,
      description: '',
      duree: 'mensuel',
      avantages: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "avantages",
  });

  const onSubmit = async (values: SubscriptionForm) => {
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Abonnement créé ✅");
        form.reset();
      } else {
        toast.error("Erreur lors de la création de l'abonnement");
      }
    } catch {
      toast.error("Erreur serveur");
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-1xl bg-white rounded-xl shadow-xl p-8 space-y-8"
        >

          <h2 className="text-3xl font-bold text-primary-200 text-center">
            Création d'un Abonnement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type d'abonnement */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d’abonnement</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-70">
                        <SelectValue placeholder="Choisir un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Durée */}
            <FormField
              control={form.control}
              name="duree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-70">
                        <SelectValue placeholder="Choisir une durée" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mensuel">Mensuel</SelectItem>
                      <SelectItem value="annuel">Annuel</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Disponibilité */}
            <FormField
              control={form.control}
              name="dispo"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel>Disponibilité</FormLabel>
                    <p className="text-sm text-muted-foreground">Activer ou désactiver l'offre</p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Décrivez cet abonnement..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>


          {/* Avantages */}
          <div className="space-y-2">
            <FormLabel>Avantages</FormLabel>
            {fields.map((item, index) => (
              <div key={item.id} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`avantages.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Ex: 2 lavages/semaine" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="destructive" onClick={() => remove(index)}>-</Button>
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={() => append({ value: "" })}>
              + Ajouter un avantage
            </Button>
          </div>

          <Button type="submit" className="w-full bg-primary-200 text-white hover:bg-blue-600 text-white">
            Enregistrer l’abonnement
          </Button>

        </form>
      </Form>
    </div>
  );
}
