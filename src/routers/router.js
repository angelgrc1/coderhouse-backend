import Router from "express";
import apiRouter from "./api/api.routes.js";

const router = Router();

router.use("/api", apiRouter);

export default router;
