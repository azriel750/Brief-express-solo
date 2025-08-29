import { Controller } from "../libs/controller";
import { jobAds } from "../src/Data/Data";

export class GlobalsController extends Controller {
  public homepage() {
    console.log("[Controller] homepage() exécutée");

    
    const annoncesTriees = [...jobAds].sort(
      (a, b) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime()
    );

    this.response.render("pages/home.ejs", {
      message: "Bonjour !",
      annonces: annoncesTriees,
      total: annoncesTriees.length
    });
  }
}