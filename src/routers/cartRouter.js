import Router from "express";
import {
  getCart,
  createCart,
  addProductToCart,
  deleteProductInCart,
} from "../../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  const { cartid } = req.query;
  try {
    const cart = await getCart(cartid);
    res.render("cart", {
      style: "index.css",
      products: cart.products,
      title: "Carrito",
    });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const result = await createCart();
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

cartRouter.post("/addProduct", async (req, res) => {
  const { cartId, productId } = req.body;
  try {
    const result = await addProductToCart(cartId, productId);
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

cartRouter.delete("/deleteProduct", async (req, res) => {
  const { cartId, productId } = req.body;
  try {
    const result = await deleteProductInCart(cartId, productId);
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

export default cartRouter;
