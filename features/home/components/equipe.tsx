'use client';

interface Socials {
    linkedin?: string;
    twitter?: string;
}

interface TeamMember {
    name: string;
    role: string;
    image: string;
    description: string;
    socials: Socials;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Israel Dev',
        role: 'Fondateur & Développeur',
        image: '/images/israel.png',
        description: 'Passionné par le développement d’applications web et mobiles.',
        socials: {
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
        },
    },
    {
        name: 'Monsieur Cee',
        role: 'Fondateur & Développeur',
        image: '/images/cee.png',
        description: 'Créative et passionnée par l’expérience utilisateur.',
        socials: {
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
        },
    },
    {
        name: 'Monsieur Israel',
        role: 'Responsable Marketing',
        image: '/images/israel.png',
        description: 'Stratégie marketing et communication digitale.',
        socials: {
            linkedin: 'https://linkedin.com',
        },
    },
];

const Equipe: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Titre */}
                <h2 className="text-3xl font-bold text-center mb-4">Notre Équipe</h2>
                <p className="text-center text-gray-600 mb-12">
                    Des professionnels passionnés, prêts à vous accompagner dans tous vos projets.
                </p>

                {/* Cartes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {teamMembers.map((member: TeamMember, index: number) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full object-cover mb-4"
                            />
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-blue-600 mb-2">{member.role}</p>
                            <p className="text-gray-600 mb-4">{member.description}</p>

                            {/* Réseaux sociaux */}
                            <div className="flex space-x-4">
                                {member.socials.linkedin && (
                                    <a
                                        href={member.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-blue-600 transition"
                                    >
                                        {/* Icon LinkedIn */}
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5V24H0V8zm7.5 0h4.78v2.16h.07c.67-1.27 2.3-2.61 4.74-2.61 5.07 0 6 3.33 6 7.66V24h-5V15.5c0-2.04-.04-4.66-2.84-4.66-2.84 0-3.27 2.21-3.27 4.5V24h-5V8z" />
                                        </svg>
                                    </a>
                                )}
                                {member.socials.twitter && (
                                    <a
                                        href={member.socials.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-blue-400 transition"
                                    >
                                        {/* Icon Twitter */}
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.15 9.15 0 01-2.88 1.1A4.52 4.52 0 0016.88 0c-2.63 0-4.76 2.14-4.76 4.77 0 .37.04.72.12 1.06-3.96-.2-7.48-2.09-9.83-4.96A4.71 4.71 0 001.09 3a4.74 4.74 0 002.08 6.32 4.48 4.48 0 01-2.16-.6v.06c0 2.21 1.58 4.06 3.67 4.48a4.48 4.48 0 01-2.14.08c.6 1.87 2.33 3.23 4.38 3.27A9.04 9.04 0 010 19.54 12.77 12.77 0 006.92 21c8.3 0 12.85-6.87 12.85-12.84 0-.2 0-.42-.01-.63A9.22 9.22 0 0023 3z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Equipe;
