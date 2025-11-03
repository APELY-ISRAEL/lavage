'use client';

import { useState } from 'react';

const Reservation = () => {
    const [form, setForm] = useState({
        service: '',
        date: '',
        fullName: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Formulaire envoyé :', form);
        alert('Votre réservation a bien été enregistrée ✅');
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Select Service */}
                        <div>
                            <label className="block mb-1 font-medium">Service souhaité</label>
                            <select
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="">Sélectionner un service</option>
                                <option value="retrait">Retrait d'argent</option>
                                <option value="depot">Dépôt d'argent</option>
                                <option value="transfert">Transfert d'argent</option>
                                <option value="western">Western Union</option>
                                <option value="autre">Autre service</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block mb-1 font-medium">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        {/* Infos perso */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Nom complet</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Téléphone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Message (optionnel)</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="Ajouter une note si nécessaire..."
                            ></textarea>
                        </div>

                        {/* Bouton */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
                        >
                            Confirmer ma réservation
                        </button>

                        <p className="text-xs text-center text-gray-500">
                            En confirmant, vous acceptez nos conditions de réservation.
                        </p>
                    </form>
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
