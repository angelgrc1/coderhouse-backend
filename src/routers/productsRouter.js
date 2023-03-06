import Router from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createManyProducts,
} from "../../controllers/product.controller.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.render("home", {
      title: "Home",
      style: "index.css",
      products,
    });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const result = await createProduct(req.body);

    res.send({ status: "success", payload: result });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});
productsRouter.post("/createMany", async (req, res) => {
  try {
    const result = await createManyProducts();
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

productsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateProduct(id, req.body);
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteProduct(id);
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

export default productsRouter;
