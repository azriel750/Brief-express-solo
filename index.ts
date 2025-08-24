import Express from "express";

import { fileURLToPath } from "node:url";
import path from "node:path";
import router from "./routes";



const app = Express();


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));


app.use(Express.static(path.join(__dirname, "public")));

app.use(Express.urlencoded({ extended: true }));



app.use("/", router);

app.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

app.listen(PORT, () => {
  console.log(`Le serveur a démarré sur le port ${PORT}`);
});


