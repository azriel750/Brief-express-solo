import { Router } from "express";
import { AnnoncesController } from "../controller/AnnoncesController";

const router = Router();

router.get("/", (req, res) => new AnnoncesController(req, res).browseAnnonces());


router.get("/create", (req, res) => new AnnoncesController(req, res).createAnnonce());
router.post("/create", (req, res) => new AnnoncesController(req, res).addAnnonce());
router.get("/:id", (req, res) => new AnnoncesController(req, res).readAnnonce());


router.get("/:id/edit", (req, res) => new AnnoncesController(req, res).editAnnonce());
router.post("/:id/checkPassword", (req, res) => new AnnoncesController(req, res).checkPassword());
router.get("/:id/editForm", (req, res) => new AnnoncesController(req, res).editFormAnnonce());
router.post("/:id/editForm", (req, res) => new AnnoncesController(req, res).updateAnnonce());



router.post("/:id/delete", (req, res) => new AnnoncesController(req, res).deleteAnnonce());

export default router;
