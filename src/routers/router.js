import Router from "express";
import cartRouter from "./cartRouter.js";
import productsRouter from "./productsRouter.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartRouter);


export default router;
