import { Router } from "express";
import { AnnoncesController } from "../controller/AnnoncesController";

const AnnoncesRouter = Router();

// 🔹 Afficher toutes les annonces
AnnoncesRouter.get("/", (req, res) => {
  console.log("📌 Route GET /annonces appelée");
  new AnnoncesController(req, res).browseAnnonces();
});

// 🔹 Formulaire création d'une annonce
AnnoncesRouter.get("/create", (req, res) => {
  console.log("📌 Route GET /annonces/create appelée");
  new AnnoncesController(req, res).createAnnonce();
});

// 🔹 Traiter le formulaire de création
AnnoncesRouter.post("/create", (req, res) => {
  console.log("📌 Route POST /annonces/create appelée");
  console.log("📩 Body reçu :", req.body);
  new AnnoncesController(req, res).addAnnonce();
});

// 🔹 Formulaire édition d'une annonce
AnnoncesRouter.get("/:id/edit", (req, res) => {
  console.log(`📌 Route GET /annonces/${req.params.id}/edit appelée`);
  new AnnoncesController(req, res).editAnnonce();
});

// 🔹 Traiter la mise à jour de l'annonce
AnnoncesRouter.post("/:id/edit", (req, res) => {
  console.log(`📌 Route POST /annonces/${req.params.id}/edit appelée`);
  console.log("📩 Body reçu :", req.body);
  new AnnoncesController(req, res).updateAnnonce();
});

// 🔹 Supprimer une annonce
AnnoncesRouter.post("/:id/delete", (req, res) => {
  console.log(`📌 Route POST /annonces/${req.params.id}/delete appelée`);
  new AnnoncesController(req, res).deleteAnnonce();
});

// 🔹 Afficher une annonce détaillée
AnnoncesRouter.get("/:id", (req, res) => {
  console.log(`📌 Route GET /annonces/${req.params.id} appelée`);
  new AnnoncesController(req, res).readAnnonce();
});

export default AnnoncesRouter;
