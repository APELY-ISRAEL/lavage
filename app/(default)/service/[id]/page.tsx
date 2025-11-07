'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Récupération des informations depuis l'URL
  const formule = searchParams.get('formule') || 'Formule inconnue';
  const prix = searchParams.get('prix') || '0';

  const [nom, setNom] = useState('');
  const [carte, setCarte] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!nom || !carte) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    try {
      // Ici tu peux appeler ton API de paiement
      await new Promise((res) => setTimeout(res, 1500));

      toast.success(`Paiement de ${prix} F pour la formule "${formule}" réussi !`);
      router.push('/merci'); // Redirection après paiement
    } catch (error) {
      toast.error('Erreur lors du paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Paiement</h2>

      <p className="mb-6 text-center">
        Formule sélectionnée : <strong>{formule}</strong>
      </p>
      <p className="mb-6 text-center text-lg font-bold">{prix} F</p>

      <div className="space-y-4">
        <Input
          placeholder="Nom du client"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <Input
          placeholder="Numéro de carte"
          value={carte}
          onChange={(e) => setCarte(e.target.value)}
        />
      </div>

      <Button
        className="mt-6 w-full bg-primary-250 hover:bg-primary-200 text-white"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Traitement...' : `Payer ${prix} F`}
      </Button>
    </div>
  );
}
