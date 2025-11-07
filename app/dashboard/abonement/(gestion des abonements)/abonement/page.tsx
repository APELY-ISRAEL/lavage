'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const subscriptionSchema = z.object({
    type: z.enum(['standard', 'silver', 'gold', 'premium']),
    prix: z.string().min(1, 'Le prix est requis'),
});

type SubscriptionForm = z.infer<typeof subscriptionSchema>;
type Abonnement = { type: string; prix: number };

export default function AbonnementTableWithModal() {
    const [abonnements, setAbonnements] = useState<Abonnement[]>([
        { type: 'standard', prix: 10000 },
        { type: 'silver', prix: 20000 },
        { type: 'gold', prix: 30000 },
        { type: 'premium', prix: 50000 },
        { type: 'silver', prix: 22000 },
        { type: 'gold', prix: 33000 },
    ]);

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 3;

    const form = useForm<SubscriptionForm>({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: { type: 'standard', prix: '' },
    });

    const onSubmit = (values: SubscriptionForm) => {
        const newAbonnement = { type: values.type, prix: Number(values.prix) };
        setAbonnements(prev => [...prev, newAbonnement]);
        toast.success('Abonnement ajouté !');
        form.reset({ type: 'standard', prix: '' });
        setOpen(false);
    };

    // Pagination logic
    const pageCount = Math.ceil(abonnements.length / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const currentData = abonnements.slice(start, end);

    const handlePrevious = () => setPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setPage(prev => Math.min(prev + 1, pageCount));

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Liste des abonnements</h1>

                {/* Modal Ajouter */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary-200 hover:bg-primary-300 text-white">Ajouter</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className='text-center text-[1.3rem]'>Créer un abonnement</DialogTitle>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='mb-3 text-[1rem]'>Type d'abonnement</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-70">
                                                        <SelectValue placeholder="Choisir un type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="standard">Standard</SelectItem>
                                                        <SelectItem value="silver">Silver</SelectItem>
                                                        <SelectItem value="gold">Gold</SelectItem>
                                                        <SelectItem value="premium">Premium</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="prix"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[1rem]'>Prix</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Ex: 15000" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button type="submit" className="bg-primary-200 text-white hover:bg-primary-300 w-full">
                                        Ajouter
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto border rounded-lg">
                <Table className="min-w-[400px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Prix (F)</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {currentData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center">Aucun abonnement</TableCell>
                            </TableRow>
                        )}
                        {currentData.map((a, index) => (
                            <TableRow key={index}>
                                <TableCell>{a.type}</TableCell>
                                <TableCell>{a.prix.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <div className="flex justify-between items-center">
                                    {/* Nombre d'abonnements sur la page */}
                                    <span>Abonnements sur cette page : {currentData.length}</span>

                                    {/* Pagination */}
                                    <div className="flex gap-2">
                                        <Button onClick={handlePrevious} disabled={page === 1}>Previous</Button>
                                        <span>Page {page} / {pageCount}</span>
                                        <Button onClick={handleNext} disabled={page === pageCount}>Next</Button>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>

                </Table>
            </div>


        </div>
    );
}
