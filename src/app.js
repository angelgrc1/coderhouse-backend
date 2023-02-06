import express from "express";
import router from "./routers/router.js";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from 'url';
import productManager from "./controllers/product.controller.js";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", router);

app.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products, title: "Products", style: "index.css" });
});

export default app;
