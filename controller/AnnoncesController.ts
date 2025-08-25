

import { Controller } from "../libs/controller";


export class AnnoncesController extends Controller {
  public browseAnnonces() {
    const success = this.request.query.success;
    

    this.response.render("pages/Annonces.ejs", {
      Annonces,
    });
  }

  public readAnnonce() {
    // Je récupère l'ID du livre réclamé (dans l'URL)
    const requestedId = this.request.params.id;

    // J'exploite l'ID réclamé pour récupérer le livre dans "la base de données"
    const Annonce = Annonce.find((book) => {
      return book.id == parseInt(requestedId);
    });

    // Si je n'ai pas trouvé le livre
    if (!Annonce) {
      this.response.send(`Le livre demandé n'existe pas`);
    }

    // Puisque j'ai trouvé le livre, j'utilise son ID pour identifier les commentaires correspondants au livre

  

    // Si j'ai trouvé le livre
    this.response.render("pages/Annonce.ejs", {
      Annonces,
      
    });
  }

  public editAnnonce() {
    this.response.send("Bienvenue sur l'éditon d'un livre");
  }

  // Afficher le formulaire pour créer un livre (ditribue une vue)
  public createAnnonce() {
    this.response.render("pages/bookCreate.ejs");
  }

 BookShema= z.object({
title: z.string().min(1, "Titre requis").max(15, "15 caractères maximum"),
  author: z.string().min(1, "Auteur requis").max(15, "15 caractères maximum"),

});

const result = AnnonceSchema.safeParse(this.request.body);
if (!result.success) {

  const error= z.treeifyError(result)

  
   error.properties.title.errors[0]; 
  error.properties.author.errors[0]; 
return;
}
const data = this.result.data;

// Traitez les données puis redirigez l’utilisateur

  // Affiche rien, on traîte la soumission du formulaire d'ajout d'un livre
  public addAnnonce() {
    const newAnnonce = {
      id: Annonces.length + 1,
      title: this.request.body.title,
    };

    Annonces.push(newAnnonce);

    this.response.redirect("/Annonces?success=true");
  }

  public deleteAnnonce() {
    this.response.send("Bienvenue sur la suppression d'un livre");
  }
}
