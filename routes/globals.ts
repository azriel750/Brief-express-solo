import { Router } from "express";
import { GlobalsController } from "../controller/globalControllers";
import { AnnoncesController } from "../controller/AnnoncesController";



const globalRouter = Router();



globalRouter.get("/", (request, response) => {
  const controller = new GlobalsController(request, response);
  controller.homepage();
});

globalRouter.get("/Annonces", (req, res) => {
  new AnnoncesController(req, res).browseAnnonces();
});






export default globalRouter;




