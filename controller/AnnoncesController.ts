import z from "zod";
import { Controller } from "../libs/controller";
import { jobAds } from "../src/Data/Data";
import bcrypt from "bcrypt";

export class AnnoncesController extends Controller {

  // Afficher toutes les annonces
  public browseAnnonces() {
    console.log("📌 browseAnnonces appelé");
   
    const AnnoncesTriees = [...jobAds].sort(
      (a, b) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime()
    );
    const total = AnnoncesTriees.length;
    this.response.render("pages/Annonces.ejs", { Annonces: AnnoncesTriees,total });
  }

  // Afficher une annonce détaillée
  public readAnnonce() {
    const id = Number(this.request.params.id);
    console.log("📌 ID reçu :", id);

    const annonce = jobAds.find(a => a.id === id);
    console.log("📌 Annonce trouvée :", annonce);

    if (!annonce) return this.response.status(404).send("Annonce non trouvée");

    this.response.render("pages/annonce", { annonce });
  }

  // Formulaire création
  public createAnnonce() {
    console.log("📌 Controller.createAnnonce() exécuté");
    this.response.render("pages/AnnonceEdit.ejs", { annonce: null });
  }

  // Ajouter une nouvelle annonce
  public addAnnonce() {
    
    const AnnonceSchema = z.object({
      titre: z.string().min(1, "Titre requis").max(50, "50 caractères max"),
      description: z.string().min(1, "Description requise").max(500,"500 caractère max"),
      lieu: z.string().min(1, "Lieu requis"),
      typeContrat: z.string().min(1, "Type de contrat requis"),
      salaire: z.string().optional(),
      entrepriseNom: z.string().min(1, "Nom entreprise requis"),
      email: z.string().email("Email invalide").optional(),
      telephone: z.string().optional(),
      adresse: z.string().optional()
    });

    const result = AnnonceSchema.safeParse(this.request.body);

    if (!result.success) {
      return this.response.render("pages/AnnonceEdit.ejs", { annonce: null, errors: result.error.format() });
    }

    const data = result.data;

    // Générer un nouvel ID unique
    const newId = jobAds.length ? Math.max(...jobAds.map(a => a.id)) + 1 : 1;
const saltRounds = 10;
const passwordHash = await bcrypt.hash(data.password, saltRounds);
  jobAds.push({
  id: newId,
  titre: data.titre,
  description: data.description,
  datePublication: new Date().toISOString(),
  lieu: data.lieu,
  typeContrat: data.typeContrat,
  salaire: data.salaire || "",
  entreprise: {
    nom: data.entrepriseNom,
    coordonnees: {
      email: data.email || "",
      telephone: data.telephone || "",
      adresse: data.adresse || ""
    }
  },
  passwordHash // Stocker le hash, jamais le mot de passe clair
});

    console.log("✅ Nouvelle annonce ajoutée :", newId);
    this.response.redirect(`/Annonces/${newId}`);
  }

  // Formulaire édition
  public editAnnonce() {
    const id = Number(this.request.params.id);
    const annonce = jobAds.find(a => a.id === id);

    if (!annonce) return this.response.status(404).send("Annonce non trouvée");

    this.response.render("pages/AnnonceEdit.ejs", { annonce });
  }

  // Mettre à jour l'annonce
  public updateAnnonce() {
    const id = Number(this.request.params.id);
    const annonceIndex = jobAds.findIndex(a => a.id === id);

    if (annonceIndex === -1) return this.response.status(404).send("Annonce non trouvée");

    const AnnonceSchema = z.object({
      titre: z.string().min(1, "Titre requis").max(50, "50 caractères max"),
      description: z.string().min(1, "Description requise"),
      lieu: z.string().min(1, "Lieu requis"),
      typeContrat: z.string().min(1, "Type de contrat requis"),
      salaire: z.string().optional(),
      entrepriseNom: z.string().min(1, "Nom entreprise requis"),
      email: z.string().email("Email invalide").optional(),
      telephone: z.string().optional(),
      adresse: z.string().optional()
    });

    const result = AnnonceSchema.safeParse(this.request.body);

    if (!result.success) {
      return this.response.render("pages/AnnonceEdit.ejs", { annonce: jobAds[annonceIndex], errors: result.error.format() });
    }

    const data = result.data;

    jobAds[annonceIndex] = {
      ...jobAds[annonceIndex],
      titre: data.titre,
      description: data.description,
      lieu: data.lieu,
      typeContrat: data.typeContrat,
      salaire: data.salaire || "",
      entreprise: {
        nom: data.entrepriseNom,
        coordonnees: {
          email: data.email || "",
          telephone: data.telephone || "",
          adresse: data.adresse || ""
        }
      }
    };

    console.log("✅ Annonce mise à jour :", id);
    this.response.redirect(`/Annonces/${id}`);
  }

  // Supprimer l'annonce
  public deleteAnnonce() {
    const id = Number(this.request.params.id);
    const annonceIndex = jobAds.findIndex(a => a.id === id);
    console.log("📌 Requête de suppression reçue pour l'ID :", id);

    if (annonceIndex === -1) return this.response.status(404).send("Annonce non trouvée");

    jobAds.splice(annonceIndex, 1);
    console.log("✅ Annonce supprimée :", id);
    this.response.redirect("/Annonces");
  }

}
