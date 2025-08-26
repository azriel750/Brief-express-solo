import { Router } from "express";
import { AnnoncesController } from "../controller/AnnoncesController";

// Initialiastion du bookRouter Express
const AnnoncesRouter = Router();

// Browse
AnnoncesRouter.get("/", (request, response) => {
  const controller = new AnnoncesController(request, response);
  controller.browseAnnonces();
});

// Add GET - afficher le formulaire
AnnoncesRouter.get("/add", (request, response) => {
  const controller = new AnnoncesController(request, response);
  controller.createAnnonce();
});

// Add POST - traiter le formulaire
AnnoncesRouter.post("/", (request, response) => {
  const controller = new AnnoncesController(request, response);
  controller.addAnnonce();
});

// Read
AnnoncesRouter.get("/:id", (request, response) => {
  const controller = new AnnoncesController(request, response);
  controller.readAnnonce();
});

// Routes dans AnnoncesRouter
AnnoncesRouter.get("/:id/Edit", (req, res) => {
  new AnnoncesController(req, res).editAnnonce();
});

AnnoncesRouter.put("/:id", (req, res) => {
  new AnnoncesController(req, res).updateAnnonce();
});

AnnoncesRouter.delete("/:id", (req, res) => {
  new AnnoncesController(req, res).deleteAnnonce();
});
export default AnnoncesRouter;
