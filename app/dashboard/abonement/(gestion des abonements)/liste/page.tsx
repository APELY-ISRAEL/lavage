'use client';

import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableCaption,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

// Exemple de données abonnements
const initialAbonnements = [
  { id: 1, type: 'Standard', prix: 10000, dispo: true, duree: 'Mensuel', description: 'Accès illimité aux lavages mensuels', avantages: ['2 lavages/semaine'] },
  { id: 2, type: 'Silver', prix: 20000, dispo: true, duree: 'Mensuel', description: 'Lavages prioritaires et illimités', avantages: ['3 lavages/semaine', '1 lavage express'] },
  { id: 3, type: 'Gold', prix: 30000, dispo: false, duree: 'Annuel', description: 'Lavages VIP annuels', avantages: ['4 lavages/semaine', 'Lavage express', 'Nettoyage intérieur'] },
  { id: 4, type: 'Gold', prix: 30000, dispo: false, duree: 'Annuel', description: 'Lavages VIP annuels', avantages: ['4 lavages/semaine', 'Lavage express', 'Nettoyage intérieur'] },
  { id: 5, type: 'Gold', prix: 30000, dispo: false, duree: 'Annuel', description: 'Lavages VIP annuels', avantages: ['4 lavages/semaine', 'Lavage express', 'Nettoyage intérieur'] },
  { id: 6, type: 'Gold', prix: 30000, dispo: false, duree: 'Annuel', description: 'Lavages VIP annuels', avantages: ['4 lavages/semaine', 'Lavage express', 'Nettoyage intérieur'] },
  { id: 7, type: 'Gold', prix: 30000, dispo: false, duree: 'Annuel', description: 'Lavages VIP annuels', avantages: ['4 lavages/semaine', 'Lavage express', 'Nettoyage intérieur'] },
  { id: 8, type: 'Gold', prix: 30000, dispo: false, duree: 'Annuel', description: 'Lavages VIP annuels', avantages: ['4 lavages/semaine', 'Lavage express', 'Nettoyage intérieur'] },
  { id: 9, type: 'Gold', prix: 30000, dispo: false, duree: 'Annuel', description: 'Lavages VIP annuels', avantages: ['4 lavages/semaine', 'Lavage express', 'Nettoyage intérieur'] },
  { id: 10, type: 'Gold', prix: 30000, dispo: false, duree: 'Annuel', description: 'Lavages VIP annuels', avantages: ['4 lavages/semaine', 'Lavage express', 'Nettoyage intérieur'] },
  { id: 11, type: 'Gold', prix: 30000, dispo: false, duree: 'Annuel', description: 'Lavages VIP annuels', avantages: ['4 lavages/semaine', 'Lavage express', 'Nettoyage intérieur'] },
];

export default function AbonnementTable() {
  const [abonnements, setAbonnements] = useState(initialAbonnements);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const pageSize = 10;
  const pageCount = Math.ceil(abonnements.length / pageSize);

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, abonnements.length);

  const currentData = abonnements.slice(start - 1, end);

  // Toggle disponibilité
  const handleToggleDispo = (id: number) => {
    setAbonnements(prev =>
      prev.map(a => (a.id === id ? { ...a, dispo: !a.dispo } : a))
    );
  };

  // Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Liste des abonnements', 14, 20);

    autoTable(doc, {
      head: [['ID', 'Type', 'Prix', 'Dispo', 'Durée', 'Description', 'Avantages']],
      body: abonnements.map(a => [
        a.id,
        a.type,
        a.prix,
        a.dispo ? 'Oui' : 'Non',
        a.duree,
        a.description,
        a.avantages.join('\n'),
      ]),
      startY: 30,
    });

    doc.save('abonnements.pdf');
  };

  // Export Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      abonnements.map(a => ({
        ID: a.id,
        Type: a.type,
        Prix: a.prix,
        Dispo: a.dispo ? 'Oui' : 'Non',
        Durée: a.duree,
        Description: a.description,
        Avantages: a.avantages.join('\n'),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Abonnements');
    XLSX.writeFile(wb, 'abonnements.xlsx');
  };

  const handleEdit = (id: number) => alert(`Modifier abonnement ID: ${id}`);
  const handleDelete = (id: number) => alert(`Supprimer abonnement ID: ${id}`);
  const handleAdd = () => alert('Ajouter un nouvel abonnement');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-anektelugu-semibold text-[2.25rem]">Liste des abonnements</h1>
        <div className="flex gap-4">
          <Button onClick={handleAdd} className="bg-primary-200 hover:bg-primary-300 text-white flex items-center gap-2">
            <Plus size={16} /> Ajouter
          </Button>
          <Button onClick={handleExportPDF} className="bg-green-500 hover:bg-green-600 text-white">
            Exporter PDF
          </Button>
          <Button onClick={handleExportExcel} className="bg-blue-500 hover:bg-blue-600 text-white">
            Exporter Excel
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <Table className="min-w-[900px]">
          <TableCaption>Liste des abonnements disponibles</TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-100 text-[1rem]">
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Dispo</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Avantages</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentData.map(a => (
              <TableRow key={a.id} className="hover:bg-gray-50 text-[1rem]">
                <TableCell>{a.id}</TableCell>
                <TableCell>{a.type}</TableCell>
                <TableCell>{a.prix.toLocaleString()} F</TableCell>
                <TableCell>
                  <Switch checked={a.dispo} onCheckedChange={() => handleToggleDispo(a.id)} />
                </TableCell>
                <TableCell>{a.duree}</TableCell>
                <TableCell>{a.description}</TableCell>
                <TableCell className="whitespace-pre-line">{a.avantages.join('\n')}</TableCell>
                <TableCell className="flex gap-2">
                  <Button onClick={() => handleEdit(a.id)} className="bg-primary-250 hover:bg-blue-600 text-white text-sm px-2 py-1">
                    Modifier
                  </Button>
                  <Button onClick={() => handleDelete(a.id)} className="bg-primary-100 hover:bg-red-600 text-white text-sm px-2 py-1">
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <tr>
              <td colSpan={8} className="p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Affichage de {start} à {end} sur {abonnements.length} abonnements
                  </p>

                  <Pagination>
                    <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))} />
                    <PaginationContent>
                      {Array.from({ length: pageCount }, (_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink isActive={i + 1 === page} onClick={() => setPage(i + 1)}>
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </PaginationContent>
                    <PaginationNext onClick={() => setPage(Math.min(pageCount, page + 1))} />
                  </Pagination>
                </div>
              </td>
            </tr>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
