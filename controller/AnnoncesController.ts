import z from "zod";
import { Controller } from "../libs/controller";
import { jobAds } from "../src/Data/Data";

export class AnnoncesController extends Controller {
   public browseAnnonces() {
   
    const AnnoncesTriees = [...jobAds].sort((a, b) => {
      return new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime();
    });

    this.response.render("pages/Annonces.ejs", {
      Annonces: AnnoncesTriees,
    });
  }


readAnnonce() {
  const id = Number(this.request.params.id); 
  console.log("📌 ID reçu :", id);

  const annonce = jobAds.find(a => a.id === id);
  console.log("📌 Annonce trouvée :", annonce);

  if (!annonce) {
    return this.response.status(404).send("Annonce non trouvée");
  }

  this.response.render("pages/annonce", { annonce });
}


  public createAnnonce() {
    this.response.render("pages/AnnonceCreate.ejs");
  }

  public addAnnonce() {
    const AnnonceSchema = z.object({
      titre: z.string().min(1, "Titre requis").max(50, "50 caractères max"),
      description: z.string().min(1, "Description requise"),
      lieu: z.string().min(1, "Lieu requis"),
      typeContrat: z.string().min(1, "Type de contrat requis"),
    });

    const result = AnnonceSchema.safeParse(this.request.body);

    if (!result.success) {
      return this.response.render("pages/AnnonceCreate.ejs", {
        errors: result.error.format(),
      });
    }

    const data = result.data;

    jobAds.push({
      id:Date.now(),
      ...data,
      datePublication: new Date().toISOString(),
      entreprise: {
        nom: "Nouvelle entreprise",
        coordonnees: { email: "", telephone: "", adresse: "" },
      }
    });

    this.response.redirect("/annonces?success=true");
  }

public editAnnonce() {
  const id = Number(this.request.params.id);
  const annonce = jobAds.find(a => a.id === id);

  if (!annonce) {
    return this.response.status(404).send("Annonce non trouvée");
  }

  this.response.render("pages/AnnonceEdit.ejs", { annonce });
}


public updateAnnonce() {
  const id = Number(this.request.params.id);
  const annonceIndex = jobAds.findIndex(a => a.id === id);

  if (annonceIndex === -1) {
    return this.response.status(404).send("Annonce non trouvée");
  }

  const AnnonceSchema = z.object({
    titre: z.string().min(1, "Titre requis").max(50, "50 caractères max"),
    description: z.string().min(1, "Description requise"),
    lieu: z.string().min(1, "Lieu requis"),
    typeContrat: z.string().min(1, "Type de contrat requis"),
  });

  const result = AnnonceSchema.safeParse(this.request.body);

  if (!result.success) {
    return this.response.render("pages/AnnonceEdit.ejs", {
      annonce: jobAds[annonceIndex],
      errors: result.error.format(),
    });
  }

  jobAds[annonceIndex] = {
    ...jobAds[annonceIndex],
    ...result.data,
  };

  this.response.redirect(`/Annonces/${id}`);
}

// Supprimer l'annonce
public deleteAnnonce() {
  const id = Number(this.request.params.id);
  const annonceIndex = jobAds.findIndex(a => a.id === id);
console.log("📌 Requête de suppression reçue pour l'ID :", id);
  if (annonceIndex === -1) {
    return this.response.status(404).send("Annonce non trouvée");
  }

  jobAds.splice(annonceIndex, 1);
   console.log("✅ Annonce supprimée :", id);
  this.response.redirect("/Annonces?success=true");
}

}
