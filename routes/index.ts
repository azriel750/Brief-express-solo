import { Router } from "express";
import globalRouter from "./globals";


const router = Router();

router.use(globalRouter);



export default router;