import Router from "express";
import productManager from "../../controllers/product.controller.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  try {
    const products = await productManager.getProducts();
    if (!limit) {
      res.status(200).json({ products });
    }
    if (limit > products.length) {
      res.status(400).send("Limit is greater than the number of products");
    } else {
      res.send(products.slice(0, limit));
    }
  } catch {
    res.status(404).send("Error finding products");
  }
});

productsRouter.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductById(pid);
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).send("Product not found");
    }
  } catch {
    res.status(404).send("Error finding product");
  }
});

productsRouter.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  try {
    await productManager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    res.status(200).send("Added product");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    await productManager.updateProductById(pid, req.body);
    res.status(200).send("Updated product");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    await productManager.deleteProductById(pid);
    res.status(200).send("Deleted product");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default productsRouter;
