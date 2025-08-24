import { Controller } from "../libs/controller";


// Définition d'un contrôleur "HomeController",
// qui hérite de la classe abstraite "Controller"
export class GlobalsController extends Controller {
// Méthode de la classe "HomeController",
  // en charge de l'envoi de la réponse contenant
  // l'affichage HTML de la page d'accueil
  public homepage() {
      console.log("[Controller] Test homepage() exécutée");
    this.response.render("pages/home.ejs", {
message: "Bonjour !,billet svp!",
   });
  }
}
