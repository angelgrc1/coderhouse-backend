const express = require("express");
const { productManager } = require("./ProductManager");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  if (req.query.limit) {
    const limit = req.query.limit;
    productManager.getProducts().then((products) => {
      return res.json(JSON.stringify(products.slice(0, limit)));
    });
  } else {
    productManager.getProducts().then((products) => {
      return res.json(JSON.stringify(products));
    });
  }
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  productManager.getProducts().then((products) => {
    products.map((product) => {
      if (product.id == id) {
        res.json(JSON.stringify(product));
      } else {
        res.json(JSON.stringify({ error: "Producto no encontrado" }));
      }
    });
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (error) => console.log(`Error: ${error}`));
