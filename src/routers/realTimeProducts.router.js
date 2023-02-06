import Router from "express";

const realTimeProductsRouter = Router();

realTimeProductsRouter.get("/", (req, res) => {
  res.render("realtimeproducts", { style: "index.css" });
});

realTimeProductsRouter.post("/", async (req, res) => {
  require("./../socket").emitProducts(req.body);
  res.end();
});

realTimeProductsRouter.delete("/:id", (req, res) => {
  require("./../socket").deleteProduct(req.params.id);
  res.end();
});

export { realTimeProductsRouter };
