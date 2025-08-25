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

// Edit
AnnoncesRouter.put("/:id", (request, response) => {
  const controller = new AnnoncesController(request, response);
  controller.editAnnonce();
});

// Delete
AnnoncesRouter.delete("/:id", (request, response) => {
  const controller = new AnnoncesController(request, response);
  controller.deleteAnnonce();
});

export default AnnoncesRouter;
