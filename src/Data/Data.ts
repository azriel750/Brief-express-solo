import { string } from "zod";

export interface JobAd {
  id:number;
  titre: string;
  description: string;
  datePublication: string; 
  lieu: string;
  typeContrat: string;
  salaire?: string;
  entreprise: {
    nom: string;
    coordonnees: {
      email: string;
      telephone: string;
      adresse: string;
    };
  };
  
}

export const jobAds: JobAd[] = [
  {
    id:1,
    titre: "Développeur Web Front-End (H/F)",
    description: "Nous recherchons un développeur web front-end passionné par les technologies modernes pour rejoindre notre équipe.",
    datePublication: "2025-08-25",
    lieu: "Paris, France",
    typeContrat: "CDI",
    salaire: "38 000 € - 45 000 € par an",
    entreprise: {
      nom: "TechVision Solutions",
      coordonnees: {
        email: "recrutement@techvision.com",
        telephone: "+33 1 45 67 89 00",
        adresse:"rue de la paix"
      }
    },
  },
  {
    id:2,
    titre: "UI/UX Designer (H/F)",
    description: "Nous cherchons un(e) designer créatif(ve) pour concevoir des interfaces intuitives et esthétiques sur nos projets web et mobiles.",
    datePublication: "2025-08-20",
    lieu: "Lyon, France",
    typeContrat: "CDD - 12 mois",
    salaire: "30 000 € - 35 000 € par an",
    entreprise: {
      nom: "Creative Studio",
      coordonnees: {
        email: "jobs@creativestudio.fr",
        telephone: "+33 4 72 11 22 33",
        adresse: "25 Avenue des Arts, 69003 Lyon, France"
      }
    },
  },
  {
    id:3,
    titre: "Chef de projet IT (H/F)",
    description: "Nous recrutons un chef de projet expérimenté pour piloter des projets digitaux complexes et coordonner nos équipes.",
    datePublication: "2025-08-10",
    lieu: "Marseille, France",
    typeContrat: "CDI",
    salaire: "50 000 € - 60 000 € par an",
    entreprise: {
      nom: "NextGen IT",
      coordonnees: {
        email: "hr@nextgenit.com",
        telephone: "+33 4 91 77 88 99",
        adresse: "10 Boulevard du Port, 13002 Marseille, France"
      }
    },
  },
  // --- Trois nouvelles annonces ---
  {
    id:4,
    titre: "Data Scientist (H/F)",
    description: "Analyse et traitement de grandes quantités de données pour extraire des insights stratégiques.",
    datePublication: "2025-08-28",
    lieu: "Toulouse, France",
    typeContrat: "CDI",
    salaire: "45 000 € - 55 000 € par an",
    entreprise: {
      nom: "DataSolutions",
      coordonnees: {
        email: "contact@datasolutions.fr",
        telephone: "+33 5 62 00 11 22",
        adresse: "12 Rue des Sciences, 31000 Toulouse, France"
      }
    },
  },
  {
    id:5,
    titre: "Marketing Manager (H/F)",
    description: "Responsable de la stratégie marketing et de la gestion des campagnes pour nos produits numériques.",
    datePublication: "2025-08-27",
    lieu: "Bordeaux, France",
    typeContrat: "CDI",
    salaire: "50 000 € - 60 000 € par an",
    entreprise: {
      nom: "MarketPro",
      coordonnees: {
        email: "hr@marketpro.fr",
        telephone: "+33 5 56 12 34 56",
        adresse: "5 Avenue de la République, 33000 Bordeaux, France"
      }
    },
  },
  {
    id:6,
    titre: "Développeur Mobile (H/F)",
    description: "Conception et développement d’applications mobiles iOS et Android en utilisant les dernières technologies.",
    datePublication: "2025-08-26",
    lieu: "Nice, France",
    typeContrat: "CDD - 6 mois",
    salaire: "35 000 € - 42 000 € par an",
    entreprise: {
      nom: "MobileWorks",
      coordonnees: {
        email: "jobs@mobileworks.fr",
        telephone: "+33 4 93 11 22 33",
        adresse: "20 Boulevard Promenade, 06000 Nice, France"
      }
    },
  }
];
