import { Controller } from "../libs/controller";


export class GlobalsController extends Controller {

  public homepage() {
      console.log("[Controller] Test homepage() exécutée");
    this.response.render("pages/home.ejs", {
message: "Bonjour !,billet svp!",
   });
  }
}
