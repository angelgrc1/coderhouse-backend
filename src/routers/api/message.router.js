import { Router } from "express";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  try {
    res.render("chat", {
      style: "index.css",
      title: "Chat",
    });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});
messageRouter.post("/", async (req, res) => {
  try {
    await require("../socket").addMessages(req.body);
    res.send({ status: "success", payload: "Message Added" });
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

export default messageRouter;
