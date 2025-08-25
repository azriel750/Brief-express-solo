import z from "zod";
import { Controller } from "../libs/controller";
import { jobAds } from "../src/data/Data";

export class AnnoncesController extends Controller {
  public browseAnnonces() {
    this.response.render("pages/Annonces.ejs", {
      annonces: jobAds,
    });
  }

  public readAnnonce() {
    const requestedId = parseInt(this.request.params.id);
    const annonce = jobAds[requestedId];

    if (!annonce) {
      this.response.send("L'annonce demandée n'existe pas");
      return;
    }

    this.response.render("pages/Annonces.ejs", {
      annonce,
    });
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
    this.response.send("Bienvenue sur l'édition d'une annonce");
  }

  public deleteAnnonce() {
    this.response.send("Bienvenue sur la suppression d'une annonce");
  }
}
