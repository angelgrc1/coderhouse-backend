import Router from "express";
import apiRouter from "./api/api.routes.js";
import { realTimeProductsRouter } from "./realTimeProducts.router.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/realtimeproducts", realTimeProductsRouter);

export default router;
