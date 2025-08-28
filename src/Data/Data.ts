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
    description:
      "Nous recherchons un développeur web front-end passionné par les technologies modernes pour rejoindre notre équipe.",
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
    description:
      "Nous cherchons un(e) designer créatif(ve) pour concevoir des interfaces intuitives et esthétiques sur nos projets web et mobiles.",
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
    description:
      "Nous recrutons un chef de projet expérimenté pour piloter des projets digitaux complexes et coordonner nos équipes.",
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

  }
];




