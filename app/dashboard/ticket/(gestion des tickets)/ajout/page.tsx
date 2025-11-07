'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const ticketSchema = z.object({
  type: z.enum(['moto', 'tricyle', 'velo', 'voiture', 'camion', 'bus'])
    .refine(val => val !== undefined, { message: "Veuillez choisir un type d'engin" }),
  prix: z.string().min(1, "Le prix est requis"),
  statut: z.boolean(),
  description: z.string().optional(),
  date: z.string().min(1, "La date est requise"),
});

type TicketForm = z.infer<typeof ticketSchema>;

export default function CreateTicketPage() {
  const form = useForm<TicketForm>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      type: "voiture",
      prix: '',
      statut: true,
      description: '',
      date: '',
    },
  });

  const onSubmit = async (values: TicketForm) => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Ticket créé ✅");
        form.reset();
      } else {
        toast.error("Erreur lors de la création du ticket");
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
          className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 space-y-8"
        >

          <h2 className="text-3xl font-bold text-primary-200 text-center">
            Création d'un Ticket de Lavage
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type d'engin */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d’engin</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Choisir un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moto">Moto</SelectItem>
                        <SelectItem value="tricyle">Tricyle</SelectItem>
                        <SelectItem value="velo">Vélo</SelectItem>
                        <SelectItem value="voiture">Voiture</SelectItem>
                        <SelectItem value="camion">Camion</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Prix */}
            <FormField
              control={form.control}
              name="prix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix (F)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 1500" {...field} />
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

            {/* Statut */}
            <FormField
              control={form.control}
              name="statut"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel>Statut</FormLabel>
                    <p className="text-sm text-muted-foreground">Activer ou désactiver le ticket</p>
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
                    <Textarea placeholder="Ex: lavage complet intérieur/extérieur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <Button type="submit" className="w-full bg-primary-200 text-white hover:bg-blue-600">
            Créer le ticket
          </Button>

        </form>
      </Form>
    </div>
  );
}
