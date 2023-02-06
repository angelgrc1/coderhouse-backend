import Router from "express";
import productsRouter from "./products.router.js";
import cartRouter from "./cart.router.js";

const apiRouter = Router();

apiRouter.use("api/products", productsRouter);
apiRouter.use("api/carts", cartRouter);

export default apiRouter;