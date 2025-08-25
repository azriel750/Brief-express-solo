// types/JobAd.ts
export interface JobAd {
  titre: string;
  description: string;
  datePublication: string; // ISO format (ex: "2025-08-25")
  lieu: string;
  typeContrat: string;
  salaire?: string;
  competencesRequises: string[];
  entreprise: {
    nom: string;
    secteur: string;
    coordonnees: {
      email: string;
      telephone: string;
      adresse: string;
    };
  };
  commentPostuler: string;
}

export const jobAds: JobAd[] = [
  {
    titre: "Développeur Web Front-End (H/F)",
    description:
      "Nous recherchons un développeur web front-end passionné par les technologies modernes pour rejoindre notre équipe.",
    datePublication: "2025-08-25",
    lieu: "Paris, France",
    typeContrat: "CDI",
    salaire: "38 000 € - 45 000 € par an",
    competencesRequises: [
      "HTML5, CSS3, JavaScript/TypeScript",
      "Frameworks modernes (React, Angular ou Vue)",
      "Responsive design",
      "Git et gestion de versions"
    ],
    entreprise: {
      nom: "TechVision Solutions",
      secteur: "Développement logiciel",
      coordonnees: {
        email: "recrutement@techvision.com",
        telephone: "+33 1 45 67 89 00",
        adresse: "15 Rue de l’Innovation, 75010 Paris, France"
      }
    },
    commentPostuler:
      "Envoyez votre CV et lettre de motivation à recrutement@techvision.com en indiquant la référence FRONT2025."
  },
  {
    titre: "UI/UX Designer (H/F)",
    description:
      "Nous cherchons un(e) designer créatif(ve) pour concevoir des interfaces intuitives et esthétiques sur nos projets web et mobiles.",
    datePublication: "2025-08-20",
    lieu: "Lyon, France",
    typeContrat: "CDD - 12 mois",
    salaire: "30 000 € - 35 000 € par an",
    competencesRequises: [
      "Figma, Adobe XD ou Sketch",
      "Principes d’ergonomie",
      "Collaboration avec les équipes dev",
      "Créativité et sens du détail"
    ],
    entreprise: {
      nom: "Creative Studio",
      secteur: "Design numérique",
      coordonnees: {
        email: "jobs@creativestudio.fr",
        telephone: "+33 4 72 11 22 33",
        adresse: "25 Avenue des Arts, 69003 Lyon, France"
      }
    },
    commentPostuler:
      "Envoyez votre portfolio et CV à jobs@creativestudio.fr avec la référence DESIGN2025."
  },
  {
    titre: "Chef de projet IT (H/F)",
    description:
      "Nous recrutons un chef de projet expérimenté pour piloter des projets digitaux complexes et coordonner nos équipes.",
    datePublication: "2025-08-10",
    lieu: "Marseille, France",
    typeContrat: "CDI",
    salaire: "50 000 € - 60 000 € par an",
    competencesRequises: [
      "Gestion de projet Agile/Scrum",
      "Communication et leadership",
      "Connaissances techniques IT",
      "Gestion budgétaire"
    ],
    entreprise: {
      nom: "NextGen IT",
      secteur: "Services numériques",
      coordonnees: {
        email: "hr@nextgenit.com",
        telephone: "+33 4 91 77 88 99",
        adresse: "10 Boulevard du Port, 13002 Marseille, France"
      }
    },
    commentPostuler:
      "Postulez directement via notre site web ou envoyez un mail à hr@nextgenit.com avec la référence PROJECT2025."
  }
];




