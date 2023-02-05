import { Router } from "express";
import cartManager from "../controllers/cartManager.js";

const cartRouter = Router();

cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
    res.status(200).send(cart);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    await cartManager.newCart(req.body);
    res.status(201).send("Cart created sucessfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartManager.addProductToCart(cid, pid, quantity);
    res.status(201).send(`Added product ${pid} to cart ${pid} with quantity ${quantity}`);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default cartRouter;
