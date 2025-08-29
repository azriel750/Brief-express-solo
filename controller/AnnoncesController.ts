import { z } from "zod";
import bcrypt from "bcrypt";
import { Controller } from "../libs/controller";
import {  jobAds } from "../src/Data/Data";

const jobPasswords: Record<number, string> = {};

const AnnonceSchema = z.object({
  titre: z.string().min(1, "Titre requis").max(50, "50 caractères max"),
  description: z.string().min(1, "Description requise").max(500, "500 caractères max"),
  lieu: z.string().min(1, "Lieu requis"),
  typeContrat: z.string().min(1, "Type de contrat requis"),
  salaire: z.string().optional(),
  entrepriseNom: z.string().min(1, "Nom entreprise requis"),
  email: z.string().email("Email invalide").optional(),
  telephone: z.string().optional(),
  adresse: z.string().optional(),
  password: z.string().min(8).regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).+$/,
    "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
  )
});

export class AnnoncesController extends Controller {

  public browseAnnonces() {
    const AnnoncesTriees = [...jobAds].sort(
      (a, b) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime()
    );
    this.response.render("pages/Annonces.ejs", { Annonces: AnnoncesTriees, total: AnnoncesTriees.length });
  }

 
  public readAnnonce() {
    const id = Number(this.request.params.id);
    const annonce = jobAds.find(a => a.id === id);
    if (!annonce) return this.response.status(404).send("Annonce non trouvée");

    this.response.render("pages/Annonce.ejs", { annonce });
  }


  public createAnnonce() {
    this.response.render("pages/AnnonceEdit.ejs", { annonce: null, errors: null });
  }


  public async addAnnonce() {
    const result = AnnonceSchema.safeParse(this.request.body);
    if (!result.success) {
      return this.response.render("pages/AnnonceEdit.ejs", { annonce: null, errors: result.error.format() });
    }

    const data = result.data;
    const newId = jobAds.length ? Math.max(...jobAds.map(a => a.id)) + 1 : 1;
    const passwordHash = await bcrypt.hash(data.password, 10);
    jobPasswords[newId] = passwordHash;

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
      }
    });

    this.response.redirect(`/Annonces/${newId}`);
  }

  public editAnnonce() {
    const id = Number(this.request.params.id);
    const annonce = jobAds.find(a => a.id === id);
    if (!annonce) return this.response.status(404).send("Annonce non trouvée");

    this.response.render("pages/AnnoncePassword.ejs", { id, error: null, action: "edit" });
  }

  public deleteAnnoncePasswordForm() {
    const id = Number(this.request.params.id);
    const annonce = jobAds.find(a => a.id === id);
    if (!annonce) return this.response.status(404).send("Annonce non trouvée");

    this.response.render("pages/AnnoncePassword.ejs", { id, error: null, action: "delete" });
  }


  public async checkPassword() {
    const id = Number(this.request.params.id);
    const { password, action } = this.request.body;

    const annonce = jobAds.find(a => a.id === id);
    if (!annonce) return this.response.status(404).send("Annonce non trouvée");

    const hash = jobPasswords[id];
    if (!hash) return this.response.status(403).send("Pas de mot de passe enregistré");

    const match = await bcrypt.compare(password, hash);
    if (!match) {
      return this.response.render("pages/AnnoncePassword.ejs", { id, error: "Mot de passe incorrect", action });
    }

    if (action === "edit") {
      this.response.redirect(`/Annonces/${id}/editForm`);
    } else if (action === "delete") {
      this.response.redirect(`/Annonces/${id}/deleteConfirmed?password=${encodeURIComponent(password)}`);
    }
  }

 
  public editFormAnnonce() {
    const id = Number(this.request.params.id);
    const annonce = jobAds.find(a => a.id === id);
    if (!annonce) return this.response.status(404).send("Annonce non trouvée");

    this.response.render("pages/AnnonceEdit.ejs", { annonce, errors: null });
  }

  public updateAnnonce() {
    const id = Number(this.request.params.id);
    const annonceIndex = jobAds.findIndex(a => a.id === id);
    if (annonceIndex === -1) return this.response.status(404).send("Annonce non trouvée");

    const result = AnnonceSchema.partial({ password: true }).safeParse(this.request.body);
    if (!result.success) {
      return this.response.render("pages/AnnonceEdit.ejs", {
        annonce: jobAds[annonceIndex],
        errors: result.error.format()
      });
    }

    const data = result.data;
    jobAds[annonceIndex] = {
      ...jobAds[annonceIndex],
      titre: data.titre ?? jobAds[annonceIndex].titre,
      description: data.description ?? jobAds[annonceIndex].description,
      lieu: data.lieu ?? jobAds[annonceIndex].lieu,
      typeContrat: data.typeContrat ?? jobAds[annonceIndex].typeContrat,
      salaire: data.salaire ?? jobAds[annonceIndex].salaire,
      entreprise: {
        ...jobAds[annonceIndex].entreprise,
        nom: data.entrepriseNom ?? jobAds[annonceIndex].entreprise.nom,
        coordonnees: {
          ...jobAds[annonceIndex].entreprise.coordonnees,
          email: data.email ?? jobAds[annonceIndex].entreprise.coordonnees.email,
          telephone: data.telephone ?? jobAds[annonceIndex].entreprise.coordonnees.telephone,
          adresse: data.adresse ?? jobAds[annonceIndex].entreprise.coordonnees.adresse
        }
      }
    };

    this.response.redirect(`/Annonces/${id}`);
  }

  public deleteAnnonce() {
  const id = Number(this.request.params.id);
  const annonceIndex = jobAds.findIndex(a => a.id === id);
  if (annonceIndex === -1) return this.response.status(404).send("Annonce non trouvée");

  jobAds.splice(annonceIndex, 1);
  delete jobPasswords[id];

  console.log("🗑️ Annonce supprimée :", id);
  this.response.redirect("/Annonces");
}
}