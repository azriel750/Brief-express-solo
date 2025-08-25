import { Router } from "express";
import globalRouter from "./globals";
import AnnoncesRouter from "./Annonces";


const router = Router();

router.use(globalRouter);
router.use(AnnoncesRouter);


export default router;