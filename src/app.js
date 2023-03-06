import express from "express";
import router from "./routers/router.js";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.redirect("/products");
});


export default app;
